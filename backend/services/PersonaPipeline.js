import {
  Transactions,
  Segments,
  CustomerSegments,
  Personas,
  Recommendations,
  Products,
  RecommendationHistory,
  RecommendationFeedback,
} from "../models/index.js";
import PersonaRevisionLog from "../models/PersonaRevisionLog.js";

import { generatePersonaSummary } from "./PersonaAnalyzer.js";
import { inferSegments } from "./SegmentInference.js";
import { generateRecommendations } from "./GenerateRecommendations.js";

export async function runPersonaPipeline(cif) {
  const previousPersona = await Personas.findOne({ where: { cif } });

  const transactions = await Transactions.findAll({ where: { cif } });
  const products = await Products.findAll({ where: { cif, status: "active" } });

  let personaSummary = await generatePersonaSummary(
    cif,
    transactions,
    products,
  );

  personaSummary = String(personaSummary);

  await Personas.upsert({
    cif,
    summary: personaSummary,
    last_updated_at: new Date(),
  });

  if (
    previousPersona &&
    previousPersona.summary &&
    previousPersona.summary !== personaSummary
  ) {
    await PersonaRevisionLog.create({
      cif,
      previous_persona_summary: previousPersona.summary,
      revised_persona_summary: personaSummary,
      trigger_reason: "new_transaction",
    });
  }

  const existingSegments = await Segments.findAll();

  const segmentResult = await inferSegments(
    cif,
    personaSummary,
    existingSegments.map((s) => ({
      id: s.id,
      name: s.name,
      description: s.description,
    })),
  );

  for (const seg of segmentResult.new_segments) {
    await Segments.findOrCreate({
      where: { name: seg.segment_name },
      defaults: { description: seg.description },
    });
  }

  for (const seg of segmentResult.segments) {
    const dbSegment = await Segments.findOne({
      where: { name: seg.segment_name },
    });
    if (!dbSegment) continue;

    await CustomerSegments.upsert({
      cif,
      segment_id: dbSegment.id,
      confidence_score: seg.confidence_score,
      last_evaluated_at: new Date(),
      ai_reason: seg.reason,
    });
  }

  const recs = await generateRecommendations(
    cif,
    personaSummary,
    segmentResult.segments,
  );

  const persona = await Personas.findOne({ where: { cif } });
  if (!persona) {
    console.warn("Persona not found after upsert for cif", cif);
  }

  for (const r of recs.recommendations) {
    const seg = await Segments.findOne({ where: { name: r.segment_name } });
    if (!seg) continue;

    const recommendation = await Recommendations.create({
      cif,
      persona_id: persona ? persona.id : null,
      segment_id: seg.id,
      recommendation: r.recommendation,
      ai_reason: r.reason,
      is_active: true,
    });

    await RecommendationHistory.create({
      cif,
      recommendation_id: recommendation.id,
      recommendation_content: JSON.stringify(r),
      persona_snapshot: personaSummary,
    });
  }

  return true;
}

export async function runPersonaPipelineWithFeedback(cif, userFeedback) {
  const previousPersona = await Personas.findOne({ where: { cif } });

  const transactions = await Transactions.findAll({ where: { cif } });
  const products = await Products.findAll({ where: { cif, status: "active" } });

  let personaSummary = await generatePersonaSummary(
    cif,
    transactions,
    products,
    userFeedback,
  );

  personaSummary = String(personaSummary);

  await Personas.upsert({
    cif,
    summary: personaSummary,
    last_updated_at: new Date(),
  });

  if (previousPersona && previousPersona.summary !== personaSummary) {
    await PersonaRevisionLog.create({
      cif,
      previous_persona_summary: previousPersona.summary,
      revised_persona_summary: personaSummary,
      trigger_reason: "user_feedback",
    });
  }

  const rejectedHistories = await RecommendationHistory.findAll({
    where: { cif },
    include: [
      {
        model: RecommendationFeedback,
        where: { action: "IGNORE" },
      },
    ],
  });

  console.log("Rejected histories count:", rejectedHistories.length);
  console.log(
    "Rejected histories (sample):",
    rejectedHistories.map((h) => ({
      id: h.id,
      cif: h.cif,
      content: h.recommendation_content,
    })),
  );

  const rejectedRecommendations = rejectedHistories.map((h) => {
    const content = JSON.parse(h.recommendation_content);
    const feedbacks =
      h.RecommendationFeedbacks ||
      h.recommendation_feedbacks ||
      h.recommendation_feedback ||
      null;

    return {
      recommendation: content.recommendation,
      ai_reason: content.ai_reason,
      user_feedback:
        feedbacks && feedbacks[0] ? feedbacks[0].user_reason : null,
    };
  });

  console.log(
    "Rejected recommendations to pass to LLM:",
    rejectedRecommendations,
  );

  await Recommendations.update(
    { is_active: false },
    { where: { cif, is_active: true } },
  );

  const existingSegments = await Segments.findAll();

  const segmentResult = await inferSegments(
    cif,
    personaSummary,
    existingSegments.map((s) => ({
      id: s.id,
      name: s.name,
      description: s.description,
    })),
  );

  for (const seg of segmentResult.segments) {
    const dbSegment = await Segments.findOne({
      where: { name: seg.segment_name },
    });
    if (!dbSegment) continue;

    await CustomerSegments.upsert({
      cif,
      segment_id: dbSegment.id,
      confidence_score: seg.confidence_score,
      last_evaluated_at: new Date(),
      ai_reason: seg.reason,
    });
  }

  let recs;
  try {
    recs = await generateRecommendations(
      cif,
      personaSummary,
      segmentResult.segments,
      rejectedRecommendations,
    );
  } catch (err) {
    console.error(
      "Error generating recommendations:",
      err?.response?.data ?? err.message ?? err,
    );
    return false;
  }

  console.log("LLM returned recommendations:", recs);

  if (
    !recs ||
    !Array.isArray(recs.recommendations) ||
    recs.recommendations.length === 0
  ) {
    console.log(
      "No recommendations generated after feedback — nothing to insert.",
    );
    return true;
  }

  // Ensure we have the persona record to link recommendations
  const persona = await Personas.findOne({ where: { cif } });
  if (!persona) {
    console.warn("Persona not found after upsert for cif", cif);
  }

  for (const r of recs.recommendations) {
    console.log("Processing LLM recommendation:", r);

    // Find or create the segment suggested by the LLM
    let seg = await Segments.findOne({ where: { name: r.segment_name } });

    if (!seg) {
      console.log("Segment not found, creating new segment:", r.segment_name);
      const [createdSeg, created] = await Segments.findOrCreate({
        where: { name: r.segment_name },
        defaults: {
          description: `Auto-created segment from LLM recommendation.`,
        },
      });
      seg = createdSeg;
      console.log("Segment created:", seg && seg.toJSON ? seg.toJSON() : seg);
    }

    const recommendation = await Recommendations.create({
      cif,
      persona_id: persona ? persona.id : null,
      segment_id: seg.id,
      recommendation: r.recommendation,
      ai_reason: r.reason,
      is_active: true,
    });

    console.log(
      "Created recommendation:",
      recommendation && recommendation.toJSON
        ? recommendation.toJSON()
        : recommendation,
    );

    await RecommendationHistory.create({
      cif,
      recommendation_id: recommendation.id,
      recommendation_content: JSON.stringify(r),
      persona_snapshot: personaSummary,
    });

    console.log(
      "Inserted recommendation history for recommendation_id:",
      recommendation.id,
    );
  }

  return true;
}

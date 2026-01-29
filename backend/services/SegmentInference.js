import { callLLM } from "./OllamaClient.js";

export async function inferSegments(
  cif,
  behaviorSummary,
  products,
  existingSegments = [],
) {
  const prompt = `
You are an AI system performing behavioral segmentation for internal banking analysis.

Customer CIF: ${cif}

Behavior summary:
"${behaviorSummary}"

Active products owned by the customer:
${JSON.stringify(products, null, 2)}

Existing segments in the system:
${JSON.stringify(existingSegments, null, 2)}

TASK:
- Decide which existing segments this customer belongs to
- If no suitable segment exists, propose a NEW segment
- A customer may belong to MULTIPLE segments
- Segment membership must be BASED ON DOMINANT and RECURRING behavioral patterns
- Do NOT remove a segment unless the dominant pattern has clearly changed over time

ADDITIONAL TASK – OPPORTUNITY SCORING:
For EACH segment membership, determine an Opportunity Score (OS) that represents:
- The potential business opportunity to take action on this customer NOW
- The likelihood that this segment can lead to upsell or cross-sell in the near term

OPPORTUNITY SCORE GUIDELINES:
- Opportunity Score is NOT the same as confidence
- Confidence = how stable and representative the behavior is
- Opportunity Score = how actionable and valuable the behavior is

Opportunity Score should consider:
- Gaps between behavior and owned products
- Signs of growth, transition, or unmet needs
- Whether the customer is early-stage, mature, or saturated in this segment

SCORING RULES:
- Confidence Score range: 0–100 (stability of behavior)
- Opportunity Score range: 0–100 (business potential)
- High confidence does NOT automatically mean high opportunity
- Opportunity score may CHANGE even if confidence remains stable

OUTPUT RULES:
- Output raw JSON ONLY
- Do NOT mention AI, models, probabilities, or uncertainty language

FORMAT:
{
  "segments": [
    {
      "segment_name": "",
      "confidence_score": 0,
      "opportunity_score": 0,
      "reason": ""
    }
  ],
  "new_segments": [
    {
      "segment_name": "",
      "description": ""
    }
  ]
}
`;

  const raw = await callLLM(prompt);
  return JSON.parse(raw);
}

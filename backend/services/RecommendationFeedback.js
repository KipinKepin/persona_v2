import RecommendationFeedback from "../models/RecommendationFeedbackModel.js";
import RecommendationHistory from "../models/RecommendationHistoryModel.js";
import { runPersonaPipelineWithFeedback } from "./PersonaPipeline.js";

export const handleRecommendationFeedback = async ({
  recommendation_history_id,
  action,
  user_reason,
  cif,
}) => {
  await RecommendationFeedback.create({
    recommendation_history_id,
    action,
    user_reason,
    decided_at: new Date(),
  });

  console.log("Recommendation feedback created:", {
    recommendation_history_id,
    action,
    user_reason,
    cif,
  });

  if (action === "IGNORE") {
    const history = await RecommendationHistory.findByPk(
      recommendation_history_id,
    );

    console.log(
      "Found recommendation history for feedback:",
      history && history.toJSON ? history.toJSON() : history,
    );

    const parsed = JSON.parse(history.recommendation_content);
    console.log("Parsed rejected recommendation:", parsed);

    await runPersonaPipelineWithFeedback(cif, {
      rejected_recommendation: parsed.recommendation,
      user_reason,
    });
  }

  return true;
};

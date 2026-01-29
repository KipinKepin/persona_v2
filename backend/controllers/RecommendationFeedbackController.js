import { handleRecommendationFeedback } from "../services/RecommendationFeedback.js";

export const submitRecommendationFeedback = async (req, res) => {
  try {
    const { recommendation_history_id, action, user_reason } = req.body;
    const { cif } = req.params;

    await handleRecommendationFeedback({
      recommendation_history_id,
      action,
      user_reason,
      cif,
    });

    res.status(200).json({
      status: "success",
      message: "Recommendation feedback processed successfully",
    });
  } catch (error) {
    console.error("Error processing recommendation feedback:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to process recommendation feedback",
    });
  }
};

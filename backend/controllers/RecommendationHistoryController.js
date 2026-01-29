import RecommendationHistory from "../models/RecommendationHistoryModel.js";

export const createRecommendationHistory = async (req, res) => {
  try {
    const { cif, recommendation_id, recommendation_content, persona_snapshot } =
      req.body;

    const history = await RecommendationHistory.create({
      cif,
      recommendation_id,
      recommendation_content,
      persona_snapshot,
    });

    res.status(201).json({
      status: "success",
      message: "Recommendation history recorded",
      data: history,
    });
  } catch (error) {
    console.error("Error creating recommendation history:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to record recommendation history",
    });
  }
};

export const getRecommendationHistoryByCif = async (req, res) => {
  try {
    const { cif } = req.params;

    // Debug: log incoming cif
    console.log(`GET /recommendations/history/${cif} called`);

    // Debug: show total count and a list of cifs in the DB
    const allHistories = await RecommendationHistory.findAll({ order: [["created_at", "DESC"]] });
    console.log("Total recommendation histories in DB:", allHistories.length);
    console.log("Sample cifs:", allHistories.map((h) => h.cif));

    const histories = await RecommendationHistory.findAll({
      where: { cif },
      order: [["created_at", "DESC"]],
    });

    console.log(`this is the histories from cif ${cif}:`, histories);

    res.status(200).json({
      status: "success",
      data: histories,
    });
  } catch (error) {
    console.error("Error fetching recommendation history:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch recommendation history",
    });
  }
};

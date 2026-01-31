import Recommendations from "../models/RecommendationModel.js";

export const getRecommendationBySegment = async (req, res) => {
  try {
    const { cif, segmentId } = req.params;

    const recs = await Recommendations.findAll({
      where: {
        cif,
        segment_id: segmentId,
        is_active: true,
      },
    });

    res.status(200).json({
      status: "success",
      data: recs,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed fetch recommendations",
    });
  }
};

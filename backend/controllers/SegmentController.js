import Segments from "../models/SegmentModel.js";
import CustomerSegments from "../models/CustomerSegmentModel.js";

export const getAllSegments = async (req, res) => {
  try {
    const segments = await Segments.findAll({
      order: [["id", "ASC"]],
    });

    res.status(200).json({
      status: "success",
      data: segments,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed fetch segments" });
  }
};

export const getCustomersBySegment = async (req, res) => {
  try {
    const { segmentId } = req.params;

    const customers = await CustomerSegments.findAll({
      where: { segment_id: segmentId },
      order: [["opportunity_score", "DESC"]],
    });

    res.status(200).json({
      status: "success",
      data: customers,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Failed fetch customers" });
  }
};

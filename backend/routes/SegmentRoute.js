import express from "express";
import {
  getAllSegments,
  getCustomersBySegment,
} from "../controllers/SegmentController.js";

const router = express.Router();

router.get("/segments", getAllSegments);
router.get("/segments/:segmentId/customers", getCustomersBySegment);

export default router;

import express from "express";
import { getRecommendationBySegment } from "../controllers/RecommendationController.js";

const router = express.Router();

router.get("/recommendations/:cif/:segmentId", getRecommendationBySegment);
export default router;

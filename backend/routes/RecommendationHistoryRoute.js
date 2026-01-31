import express from "express";
import { getRecommendationHistoryByCif } from "../controllers/RecommendationHistoryController.js";

const router = express.Router();

router.get("/recommendation-histories/:cif", getRecommendationHistoryByCif);
export default router;

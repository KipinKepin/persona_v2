import express from "express";
import { submitRecommendationFeedback } from "../controllers/RecommendationFeedbackController.js";

const router = express.Router();

router.post("/recommendations/feedback/:cif", submitRecommendationFeedback);

export default router;

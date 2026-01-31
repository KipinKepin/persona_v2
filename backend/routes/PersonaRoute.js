import express from "express";
import {
  getPersonaByCif,
  runPersonaPipelineController,
} from "../controllers/PersonaController.js";

const router = express.Router();

router.get("/persona/:cif", getPersonaByCif);
router.post("/persona/analyze/:cif", runPersonaPipelineController);

export default router;

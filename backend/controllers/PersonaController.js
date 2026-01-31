import Personas from "../models/PersonaModel.js";
import { runPersonaPipeline } from "../services/PersonaPipeline.js";

export const getPersonaByCif = async (req, res) => {
  try {
    const { cif } = req.params;

    const persona = await Personas.findOne({
      where: { cif },
    });

    res.status(200).json({
      status: "success",
      data: persona,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed fetch persona",
    });
  }
};

export const runPersonaPipelineController = async (req, res) => {
  try {
    const { cif } = req.params;

    await runPersonaPipeline(cif);

    res.status(200).json({
      status: "success",
      message: `Persona analysis completed for ${cif}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Persona analysis failed",
    });
  }
};

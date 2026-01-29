import PersonaRevisionLog from "../models/PersonaRevisionLogModel.js";

export const createPersonaRevisionLog = async (req, res) => {
  try {
    const {
      cif,
      previous_persona_summary,
      revised_persona_summary,
      trigger_reason,
    } = req.body;

    const log = await PersonaRevisionLog.create({
      cif,
      previous_persona_summary,
      revised_persona_summary,
      trigger_reason,
    });

    res.status(201).json({
      status: "success",
      message: "Persona revision logged",
      data: log,
    });
  } catch (error) {
    console.error("Error creating persona revision log:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to log persona revision",
    });
  }
};

export const getPersonaRevisionByCif = async (req, res) => {
  try {
    const { cif } = req.params;

    const logs = await PersonaRevisionLog.findAll({
      where: { cif },
      order: [["created_at", "DESC"]],
    });

    res.status(200).json({
      status: "success",
      data: logs,
    });
  } catch (error) {
    console.error("Error fetching persona revision logs:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch persona revision logs",
    });
  }
};

import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const PersonaRevisionLog = db.define(
  "persona_revision_log",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    cif: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    previous_persona_summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    revised_persona_summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    trigger_reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  },
);

export default PersonaRevisionLog;

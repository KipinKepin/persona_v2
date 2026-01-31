import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Recommendations = db.define(
  "recommendations",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    cif: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    persona_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    segment_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    recommendation: {
      type: DataTypes.TEXT,
    },

    ai_reason: {
      type: DataTypes.TEXT,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

export default Recommendations;

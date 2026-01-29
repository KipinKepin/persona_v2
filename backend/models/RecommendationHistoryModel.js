import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const RecommendationHistory = db.define(
  "recommendation_histories",
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

    recommendation_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    recommendation_content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    persona_snapshot: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  },
);

export default RecommendationHistory;

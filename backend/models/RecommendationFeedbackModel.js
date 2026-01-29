import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const RecommendationFeedback = db.define(
  "recommendation_feedback",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    recommendation_history_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    action: {
      type: DataTypes.ENUM("TAKE", "IGNORE"),
      allowNull: false,
    },

    user_reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    decided_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  },
);

export default RecommendationFeedback;

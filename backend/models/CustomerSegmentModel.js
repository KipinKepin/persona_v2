import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const CustomerSegments = db.define(
  "customer_segments",
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

    segment_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    confidence_score: {
      type: DataTypes.DECIMAL(5, 2),
    },

    opportunity_score: {
      type: DataTypes.DECIMAL(5, 2),
    },

    last_evaluated_at: {
      type: DataTypes.DATE,
    },

    ai_reason: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

export default CustomerSegments;

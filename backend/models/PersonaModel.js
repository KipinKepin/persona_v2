import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Personas = db.define(
  "personas",
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

    summary: {
      type: DataTypes.TEXT,
    },

    last_updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

export default Personas;

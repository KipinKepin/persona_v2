import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Customers = db.define(
  "customers",
  {
    cif: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    birth_year: {
      type: DataTypes.INTEGER,
    },

    city: {
      type: DataTypes.STRING,
    },

    occupation: {
      type: DataTypes.STRING,
    },

    monthly_income: {
      type: DataTypes.DECIMAL(18, 2),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

export default Customers;

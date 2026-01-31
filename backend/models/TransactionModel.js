import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Transactions = db.define(
  "transactions",
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

    trx_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    amount: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },

    channel: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

export default Transactions;

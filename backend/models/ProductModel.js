import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Products = db.define(
  "products",
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

    product_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    product_name: {
      type: DataTypes.STRING,
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "active",
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

export default Products;

import Customers from "../models/CustomerModel.js";
import Products from "../models/ProductModel.js";

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customers.findAll({
      attributes: ["cif", "name", "occupation", "monthly_income"],
      order: [["cif", "DESC"]],
      include: {
        model: Products,
        attributes: ["id", "product_type", "product_name", "status"],
      },
    });

    res.status(200).json({
      status: "success",
      data: customers,
    });
  } catch (error) {
    console.error("Error getting customers:\n", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch all customers",
    });
  }
};

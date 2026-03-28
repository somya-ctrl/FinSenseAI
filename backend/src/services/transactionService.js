const Transaction = require("../models/transactionModel");

const createTransactionService = async (data) => {
  try {
    const {
      business_name,
      business_id,
      user_id,
      description,
      amount,
      balance,
      category,
      forecast_days,
      business_type,
      monthly_revenue,
    } = data;

    // Required field validation
    if (
      !business_id ||
      !user_id ||
      !description ||
      !amount ||
      !balance ||
      !forecast_days ||
      !business_type ||
      !monthly_revenue
    ) {
      throw new Error("All required fields must be provided");
    }

    const transaction = await Transaction.create({
      business_name:   business_name   || "",
      business_id,
      user_id,
      description,
      amount,
      balance,
      category:        category        || "",
      forecast_days,
      business_type,
      monthly_revenue,
    });

    return {
      success: true,
      message: "Transaction created successfully",
      data: transaction,
    };
  } catch (error) {
    throw new Error(error.message || "Transaction creation failed");
  }
};

module.exports = {
  createTransactionService,
};
const Transaction = require("../models/transactionModel");

const createTransactionService = async (data) => {
  try {
    const {
      business_id,
      user_id,
      description,
      amount,
      balance,
      forecast_days,
      business_type,
      monthly_revenue,
    } = data;

    // Basic validation
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
      throw new Error("All fields are required");
    }

    const transaction = await Transaction.create({
      business_id,
      user_id,
      description,
      amount,
      balance,
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
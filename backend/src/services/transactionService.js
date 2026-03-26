// src/services/transactionService.js

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
    } = data;

    // Basic validation
    if (
      !business_id ||
      !user_id ||
      !description ||
      !amount ||
      !balance ||
      !forecast_days
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
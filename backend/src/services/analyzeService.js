const axios = require("axios");
const Transaction = require("../models/transactionModel");

const ML_API_BASE = process.env.ML_API_URL || "https://finsense-project.onrender.com";

// ─── Single Transaction Analyze (FROM FORM INPUT) ────────────────────────────
const analyzeSingle = async (input) => {
  const {
    business_id,
    user_id,
    description,
    amount,
    current_balance,
    income,
    expense,
    forecast_days,
  } = input;

  // Build payload directly from frontend form
  const payload = {
    business_id,
    user_id,
    description,
    amount,
    balance: current_balance,
    income,
    expense,
    forecast_days,
  };

  // Call ML API
  const mlResponse = await axios.post(`${ML_API_BASE}/analyze-transaction`, payload);

  // Return what user entered + ML output
  return {
    input: payload,
    analysis: mlResponse.data,
  };
};

// ─── Batch Analyze (FROM DB) ──────────────────────────────────────────────────
const analyzeBatch = async (business_id) => {
  const transactions = await Transaction.find({ business_id }).sort({ created_at: -1 });

  if (!transactions || transactions.length === 0) {
    throw new Error(`No transactions found for business_id: ${business_id}`);
  }

  const payload = {
    transactions: transactions.map((t) => ({
      business_id: t.business_id,
      user_id: t.user_id,
      description: t.description,
      amount: t.amount,
      balance: t.balance,
      forecast_days: t.forecast_days,
    })),
  };

  const mlResponse = await axios.post(`${ML_API_BASE}/batch-analyze`, payload);

  return {
    total: transactions.length,
    transactions,
    analysis: mlResponse.data,
  };
};

module.exports = { analyzeSingle, analyzeBatch };
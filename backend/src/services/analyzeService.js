const axios = require("axios");
const Transaction = require("../models/transactionModel");

const ML_API_BASE = process.env.ML_API_URL || "https://finsense-project.onrender.com";

// ─── Single Transaction Analyze ───────────────────────────────────────────────
const analyzeSingle = async (business_id) => {
  // 1. Fetch latest transaction from MongoDB
  const transaction = await Transaction.findOne({ business_id }).sort({ created_at: -1 });

  if (!transaction) {
    throw new Error(`No transaction found for business_id: ${business_id}`);
  }

  // 2. Build payload for ML API
  const payload = {
    business_id: transaction.business_id,
    user_id: transaction.user_id,
    description: transaction.description,
    amount: transaction.amount,
    balance: transaction.balance,
    forecast_days: transaction.forecast_days,
  };

  // 3. Call ML API
  const mlResponse = await axios.post(`${ML_API_BASE}/analyze-transaction`, payload);

  // 4. Return combined result
  return {
    transaction,
    analysis: mlResponse.data,
  };
};

// ─── Batch Analyze ────────────────────────────────────────────────────────────
const analyzeBatch = async (business_id) => {
  // 1. Fetch ALL transactions for this business from MongoDB
  const transactions = await Transaction.find({ business_id }).sort({ created_at: -1 });

  if (!transactions || transactions.length === 0) {
    throw new Error(`No transactions found for business_id: ${business_id}`);
  }

  // 2. Build payload array for ML API
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

  // 3. Call ML batch API
  const mlResponse = await axios.post(`${ML_API_BASE}/batch-analyze`, payload);

  // 4. Return combined result
  return {
    total: transactions.length,
    transactions,
    analysis: mlResponse.data,
  };
};

module.exports = { analyzeSingle, analyzeBatch };
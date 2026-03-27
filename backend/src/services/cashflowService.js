const axios = require("axios");
const Transaction = require("../models/transactionModel");

const ML_API_BASE = process.env.ML_API_URL || "https://finsense-project.onrender.com";

// ─── Cash Flow Predict ────────────────────────────────────────────────────────
// Fetches latest transaction from DB → sends to ML /analyze-transaction
// → extracts and returns only the forecast data
const predictCashFlow = async (business_id, forecast_days) => {

  // 1. Fetch latest transaction for this business from MongoDB
  const transaction = await Transaction.findOne({ business_id }).sort({ created_at: -1 });

  if (!transaction) {
    throw new Error(`No transaction found for business_id: ${business_id}`);
  }

  // 2. Build payload for ML API
  //    Override forecast_days with the one passed in the request
  const payload = {
    business_id:   transaction.business_id,
    user_id:       transaction.user_id,
    description:   transaction.description,
    amount:        transaction.amount,
    balance:       transaction.balance,
    forecast_days: forecast_days || transaction.forecast_days,
  };

  // 3. Call ML API /analyze-transaction
  const mlResponse = await axios.post(`${ML_API_BASE}/analyze-transaction`, payload);

  const mlData = mlResponse.data;

  // 4. Extract only the forecast section + summary
  const forecast = mlData?.forecast || null;

  if (!forecast) {
    throw new Error("ML API did not return forecast data");
  }

  // 5. Return structured forecast result
  return {
    business_id,
    forecast_days: forecast.days,
    transaction: {
      description:   transaction.description,
      amount:        transaction.amount,
      balance:       transaction.balance,
      created_at:    transaction.created_at,
    },
    forecast: {
      daily:       forecast.daily,
      min_balance: forecast.min_balance,
      alert:       forecast.alert,
      summary:     forecast.summary,
    },
    insights: mlData?.insights || [],
    summary:  mlData?.summary  || {},
  };
};

module.exports = { predictCashFlow };
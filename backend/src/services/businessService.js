const Transaction = require("../models/transactionModel");

// ─── POST /api/business/register ─────────────────────────────────────────────
const registerBusiness = async (data) => {
  const { business_id, user_id, description, amount, balance, forecast_days } = data;

  const existing = await Transaction.findOne({ business_id });
  if (existing) {
    const error = new Error("Business ID already registered");
    error.status = 409;
    throw error;
  }

  const transaction = await Transaction.create({
    business_id,
    user_id,
    description,
    amount,
    balance,
    forecast_days,
  });

  return transaction;
};

// ─── GET /api/business/:business_id ──────────────────────────────────────────
const getBusinessById = async (business_id) => {
  const transaction = await Transaction.findOne({ business_id });
  if (!transaction) {
    const error = new Error("Business not found");
    error.status = 404;
    throw error;
  }
  return transaction;
};

module.exports = {
  registerBusiness,
  getBusinessById,
};
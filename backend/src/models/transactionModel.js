const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    business_name: {
      type: String,
      default: "",
    },
    business_id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      default: "",
    },
    forecast_days: {
      type: Number,
      required: true,
    },
    business_type: {
      type: String,
      required: true,
    },
    monthly_revenue: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
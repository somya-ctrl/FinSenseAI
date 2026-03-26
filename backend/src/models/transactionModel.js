// src/models/transactionModel.js

const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
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
    forecast_days: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
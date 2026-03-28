const { sendMessage } = require("../services/FinBotService");
const Transaction = require("../models/transactionModel");

const chatWithBot = async (req, res) => {
  try {
    const { user_id, business_id, message } = req.body;

    if (!user_id || !business_id || !message) {
      return res.status(400).json({
        success: false,
        message: "user_id, business_id, and message are required",
      });
    }

    // ── Fetch latest transaction for business context ────────
    const latestTransaction = await Transaction.findOne({ business_id, user_id })
      .sort({ createdAt: -1 });

    if (!latestTransaction) {
      return res.status(404).json({
        success: false,
        message: "No transaction found for this business. Please create a New Entry first.",
      });
    }

    // ── Pull all business details from Transaction model ─────
    const business_name    = latestTransaction.business_name    || "";
    const business_type    = latestTransaction.business_type    || "";
    const category         = latestTransaction.category         || "";
    const description      = latestTransaction.description      || "";
    const forecast_days    = latestTransaction.forecast_days    || 7;

    // ── Calculate total monthly revenue from all transactions ─
    const allTransactions = await Transaction.find({ business_id, user_id });

    const monthly_revenue = allTransactions.reduce(
      (sum, tx) => sum + Number(tx.monthly_revenue || 0),
      0
    ) / (allTransactions.length || 1); // average monthly revenue

    const total_balance = latestTransaction.balance || 0;
    const total_amount  = allTransactions.reduce(
      (sum, tx) => sum + Number(tx.amount || 0),
      0
    );

    // ── Send enriched payload to ML API ─────────────────────
    const result = await sendMessage({
      user_id,
      business_id,
      message,
      business_name,
      business_type,
      category,
      description,
      forecast_days,
      monthly_revenue,
      balance:       total_balance,
      total_amount,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("❌ chatWithBot error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to send message to FinBot API",
    });
  }
};

module.exports = {
  chatWithBot,
};
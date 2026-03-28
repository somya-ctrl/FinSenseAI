const { sendMessage } = require("../services/finbotService");

// Example models (adjust according to your project)
const User = require("../models/User");
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

    // ── Fetch business profile info ─────────────────────────
    // Change this according to where your business info is stored
    const user = await User.findOne({ user_id, business_id });

    let business_type = user?.business_type || null;
    let monthly_revenue = user?.monthly_revenue || null;
    let business_name = user?.business_name || null;
    let category = user?.category || null;

    // Optional fallback: calculate revenue from transactions
    if (!monthly_revenue) {
      const incomeTransactions = await Transaction.find({
        business_id,
        amount: { $gt: 0 },
      });

      monthly_revenue = incomeTransactions.reduce(
        (sum, tx) => sum + Number(tx.amount || 0),
        0
      );
    }

    // ── Send enriched payload to ML API ─────────────────────
    const result = await sendMessage({
      user_id,
      business_id,
      message,
      business_type,
      monthly_revenue,
      business_name,
      category,
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
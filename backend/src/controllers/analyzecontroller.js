const analyzeService = require("../services/analyzeService");

// ─── POST /api/analyze/single ─────────────────────────────────────────────────
const analyzeSingle = async (req, res) => {
  try {
    const {
      description,
      amount,
      income,
      expense,
      current_balance,
      user_id,
      business_id,
      forecast_days,
    } = req.body;

    if (!business_id) {
      return res.status(400).json({
        success: false,
        message: "business_id is required",
      });
    }

    if (!description || amount === undefined || amount === null) {
      return res.status(400).json({
        success: false,
        message: "description and amount are required",
      });
    }

    const payload = {
      description,
      amount: Number(amount),
      income: Number(income || 0),
      expense: Number(expense || 0),
      current_balance: Number(current_balance || 0),
      user_id: user_id || "",
      business_id,
      forecast_days: Number(forecast_days || 30),
    };

    const result = await analyzeService.analyzeSingle(payload);

    return res.status(200).json({
      success: true,
      message: "Transaction analyzed successfully",
      data: result,
    });
  } catch (error) {
    console.error("❌ analyzeSingle controller error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to analyze transaction",
    });
  }
};

// ─── POST /api/analyze/batch ──────────────────────────────────────────────────
const analyzeBatch = async (req, res) => {
  try {
    const { business_id } = req.body;

    if (!business_id) {
      return res.status(400).json({
        success: false,
        message: "business_id is required",
      });
    }

    const result = await analyzeService.analyzeBatch(business_id);

    return res.status(200).json({
      success: true,
      message: "Batch analysis completed successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to run batch analysis",
    });
  }
};

module.exports = { analyzeSingle, analyzeBatch };
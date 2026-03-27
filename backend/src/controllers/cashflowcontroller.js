const cashflowService = require("../services/cashflowService");

// ─── POST /api/cashflow/predict ───────────────────────────────────────────────
// Body: { business_id, forecast_days }
const predictCashFlow = async (req, res) => {
  try {
    const { business_id, forecast_days } = req.body;

    // Validate required fields
    if (!business_id) {
      return res.status(400).json({
        success: false,
        message: "business_id is required",
      });
    }

    if (!forecast_days) {
      return res.status(400).json({
        success: false,
        message: "forecast_days is required",
      });
    }

    // Validate forecast_days is a positive number
    const days = parseInt(forecast_days);
    if (isNaN(days) || days <= 0) {
      return res.status(400).json({
        success: false,
        message: "forecast_days must be a positive number",
      });
    }

    const result = await cashflowService.predictCashFlow(business_id, days);

    return res.status(200).json({
      success: true,
      message: "Cash flow prediction generated successfully",
      data: result,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to generate cash flow prediction",
    });
  }
};

module.exports = { predictCashFlow };
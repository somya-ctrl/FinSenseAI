const analyzeService = require("../services/analyzeService");

// ─── POST /api/analyze/single ─────────────────────────────────────────────────
// Body: { business_id }
const analyzeSingle = async (req, res) => {
  try {
    const { business_id } = req.body;

    if (!business_id) {
      return res.status(400).json({
        success: false,
        message: "business_id is required",
      });
    }

    const result = await analyzeService.analyzeSingle(business_id);

    return res.status(200).json({
      success: true,
      message: "Transaction analyzed successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to analyze transaction",
    });
  }
};

// ─── POST /api/analyze/batch ──────────────────────────────────────────────────
// Body: { business_id }
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
const overviewService = require("../services/overviewService");

const getBusinessSummary = async (req, res) => {
  try {
    const { business_id } = req.params;

    if (!business_id) {
      return res.status(400).json({
        success: false,
        error: "business_id is required",
      });
    }

    const data = await overviewService.getBusinessSummary(business_id);

    return res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {
    console.error("Overview error:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = { getBusinessSummary };
const businessService = require("../services/businessService");

// ─── POST /api/business/register ─────────────────────────────────────────────
const registerBusiness = async (req, res) => {
  const business = await businessService.registerBusiness(req.body);
  res.status(201).json({
    success: true,
    message: "Business registered successfully",
    data: business,
  });
};

// ─── GET /api/business/:business_id ──────────────────────────────────────────
const getBusinessById = async (req, res) => {
  const business = await businessService.getBusinessById(req.params.business_id);
  res.status(200).json({
    success: true,
    data: business,
  });
};

module.exports = {
  registerBusiness,
  getBusinessById,
};
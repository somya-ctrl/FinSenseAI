const express = require("express");
const router = express.Router();
const controller = require("../controllers/businesscontroller");

// POST /api/business/register
router.post("/register", controller.registerBusiness);

// GET /api/business/:business_id
router.get("/:business_id", controller.getBusinessById);

module.exports = router;
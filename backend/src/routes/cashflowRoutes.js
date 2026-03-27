const express = require("express");
const router  = express.Router();
const { predictCashFlow } = require("../controllers/cashflowcontroller");

// POST /api/cashflow/predict → fetch from DB + call ML + return forecast
router.post("/predict", predictCashFlow);

module.exports = router;
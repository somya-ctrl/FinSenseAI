const express = require("express");
const router = express.Router();
const { analyzeSingle, analyzeBatch } = require("../controllers/analyzecontroller");

// POST /api/analyze/single  → analyze latest transaction for a business
router.post("/single", analyzeSingle);

// POST /api/analyze/batch   → analyze all transactions for a business
router.post("/batch", analyzeBatch);

module.exports = router;
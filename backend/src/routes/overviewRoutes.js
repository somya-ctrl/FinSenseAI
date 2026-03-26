const express = require("express");
const router = express.Router();
const { getBusinessSummary } = require("../controllers/overviewcontroller");

router.get("/summary/:business_id", getBusinessSummary);

module.exports = router;
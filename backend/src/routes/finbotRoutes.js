const express = require("express");
const router = express.Router();

const { chatWithBot } = require("../controllers/FinBotcontroller");

router.post("/chat", chatWithBot);

module.exports = router;
const express = require("express");
const router = express.Router();

const {
  chatWithBot,
  resetBotChat,
} = require("../controllers/FinBotcontroller");

router.post("/chat", chatWithBot);
router.post("/chat/reset", resetBotChat);

module.exports = router;
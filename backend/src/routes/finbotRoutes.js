const express = require("express");
const router = express.Router();
const { chat, resetChat } = require("../controllers/FinBotcontroller");

router.post("/chat", chat);
router.post("/chat/reset", resetChat);

module.exports = router;
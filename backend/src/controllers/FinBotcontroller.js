const { sendMessage, resetChatHistory } = require("../services/FinBotService");

// ── Send Message ─────────────────────────────────────────────
const chatWithBot = async (req, res) => {
  try {
    const { user_id, business_id, message, reset = false } = req.body;

    if (!user_id || !business_id || !message) {
      return res.status(400).json({
        message: "user_id, business_id, and message are required",
      });
    }

    const data = await sendMessage(user_id, business_id, message, reset);

    res.status(200).json(data);
  } catch (error) {
    console.error("❌ chatWithBot error:", error.message);
    res.status(500).json({
      message: error.message || "Failed to chat with FinBot",
    });
  }
};

// ── Reset Chat ───────────────────────────────────────────────
const resetBotChat = async (req, res) => {
  try {
    const { user_id, business_id } = req.body;

    if (!user_id || !business_id) {
      return res.status(400).json({
        message: "user_id and business_id are required",
      });
    }

    const data = await resetChatHistory(user_id, business_id);

    res.status(200).json(data);
  } catch (error) {
    console.error("❌ resetBotChat error:", error.message);
    res.status(500).json({
      message: error.message || "Failed to reset FinBot chat",
    });
  }
};

module.exports = {
  chatWithBot,
  resetBotChat,
};
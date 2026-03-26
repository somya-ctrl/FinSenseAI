const finbotService = require("../services/FinBotService");

// ── POST /api/chat ───────────────────────────────────────────
const chat = async (req, res) => {
  try {
    const { business_id, message, reset } = req.body;

    if (!business_id || !message) {
      return res.status(400).json({
        success: false,
        error: "business_id and message are required",
      });
    }

    const data = await finbotService.sendMessage(business_id, message, reset);

    return res.status(200).json({
      success: true,
      reply: data.reply,
      business_id,
    });

  } catch (error) {
    console.error("FinBot chat error:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ── POST /api/chat/reset ─────────────────────────────────────
const resetChat = async (req, res) => {
  try {
    const { business_id } = req.body;

    if (!business_id) {
      return res.status(400).json({
        success: false,
        error: "business_id is required",
      });
    }

    const data = await finbotService.resetChatHistory(business_id);

    return res.status(200).json({
      success: true,
      message: data.message || `Chat history cleared for ${business_id}`,
    });

  } catch (error) {
    console.error("FinBot reset error:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = { chat, resetChat };
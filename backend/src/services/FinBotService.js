const axios = require("axios");

const FINBOT_BASE_URL = process.env.FINBOT_BASE_URL || "http://140.40.0.12:5000";

// ── Chat with FinBot ─────────────────────────────────────────
const sendMessage = async (business_id, message, reset = false) => {
  const response = await axios.post(`${FINBOT_BASE_URL}/chat`, {
    business_id,
    message,
    reset,
  });
  return response.data;
};

// ── Reset Chat History ───────────────────────────────────────
const resetChatHistory = async (business_id) => {
  const response = await axios.post(`${FINBOT_BASE_URL}/chat/reset`, {
    business_id,
  });
  return response.data;
};

module.exports = { sendMessage, resetChatHistory };
const axios = require("axios");
const https = require("https");

const FINBOT_BASE_URL =
  process.env.FINBOT_BASE_URL || "https://finsense-project.onrender.com";

// Reuse HTTPS agent
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

// ── Common Axios Config ──────────────────────────────────────
const axiosConfig = {
  httpsAgent,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
  timeout: 30000,
};

// ── Chat with FinBot / ML API ────────────────────────────────
const sendMessage = async (user_id, business_id, message, reset = false) => {
  try {
    const response = await axios.post(
      `${FINBOT_BASE_URL}/chat`,
      {
        user_id,
        business_id,
        message,
        reset,
      },
      axiosConfig
    );

    return response.data;
  } catch (error) {
    console.error("❌ FinBot sendMessage error:", error?.response?.data || error.message);

    throw new Error(
      error?.response?.data?.detail ||
      error?.response?.data?.message ||
      "Failed to send message to FinBot API"
    );
  }
};

// ── Reset Chat History ───────────────────────────────────────
const resetChatHistory = async (user_id, business_id) => {
  try {
    const response = await axios.post(
      `${FINBOT_BASE_URL}/chat/reset`,
      {
        user_id,
        business_id,
      },
      axiosConfig
    );

    return response.data;
  } catch (error) {
    console.error("❌ FinBot resetChatHistory error:", error?.response?.data || error.message);

    throw new Error(
      error?.response?.data?.detail ||
      error?.response?.data?.message ||
      "Failed to reset FinBot chat history"
    );
  }
};

module.exports = {
  sendMessage,
  resetChatHistory,
};
const axios = require("axios");

const FINSENSE_BASE_URL = process.env.FINSENSE_BASE_URL || "https://finsense-project.onrender.com";

const getBusinessSummary = async (business_id) => {
  const response = await axios.get(`${FINSENSE_BASE_URL}/business-summary/${business_id}`);
  return response.data;
};

module.exports = { getBusinessSummary };
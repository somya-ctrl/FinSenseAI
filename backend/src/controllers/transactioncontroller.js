// src/controllers/transactionController.js

const { createTransactionService } = require("../services/transactionService");

const createTransaction = async (req, res) => {
  try {
    const response = await createTransactionService(req.body);

    return res.status(201).json(response);
  } catch (error) {
    console.error("Create Transaction Error:", error.message);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTransaction,
};
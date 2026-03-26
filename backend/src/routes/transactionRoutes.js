// src/routes/transactionRoutes.js

const express = require("express");
const router = express.Router();

const { createTransaction } = require("../controllers/transactioncontroller");
const protect = require("../middleware/authMiddleware");

// Protected route
router.post("/create", protect, createTransaction);

module.exports = router;
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://fin-sense-ai-jade.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const finbotRoutes = require("./routes/finbotRoutes");   
const overviewRoutes = require("./routes/overviewRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const analyzeRoutes = require("./routes/analyzeRoutes");
const businessRoutes = require("./routes/businessRoutes");
const cashflowRoutes = require("./routes/cashflowRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/finbot", finbotRoutes);                  
app.use("/api/overview", overviewRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/analyze", analyzeRoutes);
app.use("/api/business",businessRoutes);
app.use("/api/cashflow",cashflowRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;
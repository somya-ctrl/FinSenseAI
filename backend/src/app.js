const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const finbotRoutes = require("./routes/finbotRoutes");   
const overviewRoutes = require("./routes/overviewRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/finbot", finbotRoutes);                  
app.use("/api/overview", overviewRoutes);
app.use("/api/transactions", transactionRoutes);
// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;
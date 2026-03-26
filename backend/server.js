require("dotenv").config();

const http = require("http");
const app = require("./src/app");
const { connectmongoDB } = require("./src/config/db");

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Connect DB first, then start server
connectmongoDB(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
  });
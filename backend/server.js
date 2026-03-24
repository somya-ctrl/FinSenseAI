require("dotenv").config();

const http = require("http");
const app = require("./src/app");
const { connectmongoDB } = require("./src/config/db");
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
connectmongoDB(process.env.MONGO_URI);
server.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
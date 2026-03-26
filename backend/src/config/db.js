const mongoose = require("mongoose");

async function connectmongoDB(uri) {
  try {
    const conn = await mongoose.connect(uri);

    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn; // important
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
}

module.exports = { connectmongoDB };
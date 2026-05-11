const mongoose = require("mongoose");
const config = require("./config.js");

const connectDB = async () => {
  try {
    await mongoose
      .connect(config.DB_URL)
      .then(() => console.log("MongoDB connected successfully"));
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;

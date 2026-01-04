require("dotenv").config();
const uri = process.env.MONGODB_URI;

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Ichthys Charity Database Connected!");
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

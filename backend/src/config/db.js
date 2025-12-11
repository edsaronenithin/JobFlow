// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDB connected: ${conn.connection.host}`);
//   } catch (err) {
//     console.error("MongoDB connection error:", err.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // optional to silence strictQuery deprecation warnings
    mongoose.set("strictQuery", false);

    // connect without passing legacy options
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error:", err.message || err);
    process.exit(1);
  }
};

module.exports = connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to MongoDB");
      return;
    }

    const conn = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/afritheatre",
      {
        serverSelectionTimeoutMS: 5000,
      }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: unknown) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export default connectDB;

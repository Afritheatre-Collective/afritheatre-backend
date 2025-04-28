import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import connectDB from "../connection/db";

const ensureDBConnection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log("Database connection not ready. Attempting to connect...");
      await connectDB();
    }
    next();
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).json({
      message: "Database connection unavailable",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export default ensureDBConnection;

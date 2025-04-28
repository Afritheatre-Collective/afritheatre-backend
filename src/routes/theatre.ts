import express, { Request, Response, Router, RequestHandler } from "express";
import TheatreActivity from "../models/TheatreActivity";
import connectDB from "../connection/db";

const router: Router = express.Router();

// ===== Types =====
export interface TheatreActivityRequestBody {
  month?: string;
  week?: string;
  date?: string;
  year?: string;
  time?: string;
  companyName: string;
  sector?: "public" | "private";
  companyStatus?: "new" | "existing";
  activityType?: "performance" | "capacity" | "outreach";
  nature?:
    | "frequent-regular"
    | "frequent-irregular"
    | "infrequent-regular"
    | "infrequent-irregular";
  eventName: string;
  county?: string;
  venue?: string;
  newVenue?: string;
  totalSessions?: string;
  jobsCreated?: string;
  indirectJobs?: string;
  directJobs?: string;
  entryType?: "free" | "paid";
  bookingPlatform?: string;
  newBookingPlatform?: string;
  paymentMethods?: string[];
  language?: string;
  otherLanguage?: string;
  contactPerson: string;
  email?: string;
  phone?: string;
  notes?: string;
}

// ===== Handlers =====

// Create a new theatre activity
const createTheatreActivityHandler: RequestHandler<
  {},
  any,
  TheatreActivityRequestBody
> = async (req, res) => {
  await connectDB();
  try {
    const activityData = req.body;

    // Basic validation
    if (
      !activityData.companyName ||
      !activityData.eventName ||
      !activityData.contactPerson
    ) {
      res.status(400).json({
        success: false,
        message: "Company name, event name, and contact person are required",
      });
      return;
    }

    const newActivity = new TheatreActivity(activityData);
    await newActivity.save();

    res.status(201).json({
      success: true,
      message: "Theatre activity created successfully",
      data: newActivity,
    });
  } catch (error) {
    console.error("Error creating theatre activity:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: errorMessage,
    });
  }
};

// Get all theatre activities
const getTheatreActivitiesHandler: RequestHandler = async (req, res) => {
  await connectDB();
  try {
    const activities = await TheatreActivity.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: activities,
    });
  } catch (error) {
    console.error("Error fetching theatre activities:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ===== Routes =====
router.post("/theatre-activities", createTheatreActivityHandler);
router.get("/theatre-activities", getTheatreActivitiesHandler);

export default router;

import { RequestHandler } from "express";
import TheatreActivity from "../models/TheatreActivity";
import connectDB from "../connection/db";

// ===== Types =====
export interface TheatreActivityRequestBody {
  date: Date;
  companyName: string;
  sector: "public" | "private";
  companyStatus: "new" | "existing";
  activityType: "performance" | "capacity" | "outreach";
  nature:
    | "frequent-regular"
    | "frequent-irregular"
    | "infrequent-regular"
    | "infrequent-irregular";
  eventName: string;
  county: string;
  venue: string;
  newVenue: string;
  poster?: string; // This will store the path/filename of the uploaded image
  totalSessions: string; // or number, depending on your needs
  jobsCreated: string; // or number
  indirectJobs: string; // or number
  directJobs: string; // or number
  entryType: "free" | "paid";
  bookingPlatform: string;
  newBookingPlatform: string;
  paymentMethods: string[];
  language: string;
  otherLanguage: string;
  contactPerson: string;
  email: string;
  phone: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

// ===== Handlers =====

// Create a new theatre activity
export const createTheatreActivity: RequestHandler<
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
export const getTheatreActivities: RequestHandler = async (req, res) => {
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

// Get a single theatre activity by ID
export const getTheatreActivityById: RequestHandler = async (req, res) => {
  await connectDB();
  try {
    const activity = await TheatreActivity.findById(req.params.id);
    if (!activity) {
      res.status(404).json({
        success: false,
        message: "Theatre activity not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: activity,
    });
  } catch (error) {
    console.error("Error fetching theatre activity:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update a theatre activity
export const updateTheatreActivity: RequestHandler = async (req, res) => {
  await connectDB();
  try {
    const { id } = req.params;
    const activityData = req.body;

    const updatedActivity = await TheatreActivity.findByIdAndUpdate(
      id,
      activityData,
      { new: true, runValidators: true }
    );

    if (!updatedActivity) {
      res.status(404).json({
        success: false,
        message: "Theatre activity not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Theatre activity updated successfully",
      data: updatedActivity,
    });
  } catch (error) {
    console.error("Error updating theatre activity:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: errorMessage,
    });
  }
};

// Delete a theatre activity
export const deleteTheatreActivity: RequestHandler = async (req, res) => {
  await connectDB();
  try {
    const { id } = req.params;
    const deletedActivity = await TheatreActivity.findByIdAndDelete(id);

    if (!deletedActivity) {
      res.status(404).json({
        success: false,
        message: "Theatre activity not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Theatre activity deleted successfully",
      data: deletedActivity,
    });
  } catch (error) {
    console.error("Error deleting theatre activity:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const toggleTheatreActivityPublicHandler: RequestHandler<
  { id: string },
  any,
  { isPublic: boolean }
> = async (req, res) => {
  await connectDB();

  const { id } = req.params;
  const { isPublic } = req.body;

  try {
    const updatedActivity = await TheatreActivity.findByIdAndUpdate(
      id,
      { isPublic },
      { new: true }
    );

    if (!updatedActivity) {
      res.status(404).json({
        success: false,
        message: "Theatre activity not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Theatre activity visibility updated successfully",
      data: updatedActivity,
    });
  } catch (error) {
    console.error("Theatre activity visibility update failed:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: errorMessage,
    });
  }
};

// Add this to get public theatre activities
export const getPublicTheatreActivities: RequestHandler = async (req, res) => {
  await connectDB();
  try {
    const activities = await TheatreActivity.find({ isPublic: true }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      data: activities,
    });
  } catch (error) {
    console.error("Error fetching public theatre activities:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

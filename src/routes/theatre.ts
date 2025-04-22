import express, { Request, Response } from "express";
import TheatreActivity from "../models/TheatreActivity";

const router = express.Router();

interface TheatreActivityRequestBody {
  month: string;
  week: string;
  date: string;
  year: string;
  time: string;
  companyName: string;
  sector: string;
  companyStatus: string;
  activityType: string;
  nature: string;
  eventName: string;
  county: string;
  venue?: string;
  newVenue?: string;
  totalSessions: string;
  jobsCreated: string;
  indirectJobs: string;
  directJobs: string;
  entryType: string;
  bookingPlatform?: string;
  newBookingPlatform?: string;
  paymentMethods?: string[];
  language: string;
  otherLanguage?: string;
  contactPerson: string;
  email: string;
  phone: string;
  notes?: string;
}

router.post(
  "/submit",
  async (req: Request<{}, {}, TheatreActivityRequestBody>, res: Response) => {
    try {
      const formData = req.body;
      console.log("Received theatre data:", JSON.stringify(formData, null, 2));

      // Create a new theatre activity document
      const newActivity = new TheatreActivity({
        month: formData.month,
        week: formData.week,
        // ... rest of the fields
      });

      console.log("Document to be saved:", newActivity);

      // Save to database
      const savedActivity = await newActivity.save();
      console.log("Saved document:", savedActivity);

      res.status(201).json({
        message: "Theatre activity submitted successfully",
        data: savedActivity.toObject(), // Convert to plain object
      });
    } catch (error) {
      console.error("Full error stack:", error);
      if (error instanceof Error) {
        console.error("Error submitting theatre activity:", error);
        res.status(500).json({
          message: "Failed to submit theatre activity",
          error: error.message,
        });
      } else {
        console.error("Error submitting theatre activity:", error);
        res.status(500).json({
          message: "Failed to submit theatre activity",
          error: "An unknown error occurred",
        });
      }
    }
  }
);

export default router;

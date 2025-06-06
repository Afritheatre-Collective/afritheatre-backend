import express, { Router } from "express";
import {
  createTheatreActivity,
  getTheatreActivities,
  getTheatreActivityById,
  updateTheatreActivity,
  deleteTheatreActivity,
  toggleTheatreActivityPublicHandler,
  getPublicTheatreActivities,
} from "../controller/theatreController";

const router: Router = express.Router();

// Routes
router.post("/theatre-activities", createTheatreActivity);
router.get("/theatre-activities", getTheatreActivities);
router.get("/theatre-activities/public", getPublicTheatreActivities);
router.get("/theatre-activities/:id", getTheatreActivityById);
router.put("/theatre-activities/:id", updateTheatreActivity);
router.delete("/theatre-activities/:id", deleteTheatreActivity);
router.patch(
  "/theatre-activities/:id/visibility",
  toggleTheatreActivityPublicHandler
);

export default router;

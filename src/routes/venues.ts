import express, { Router, RequestHandler } from "express";
import Venue from "../models/Venue";
import connectDB from "../connection/db";

const router: Router = express.Router();

// ===== Types =====
interface VenueRequestBody {
  county: string;
  subCounty?: string;
  area?: string;
  name: string;
  capacity: number;
  mapLink?: string;
}

// ===== Create Venue Handler =====
const createVenueHandler: RequestHandler<{}, any, VenueRequestBody> = async (
  req,
  res
) => {
  await connectDB();

  const { county, subCounty, area, name, capacity, mapLink } = req.body;

  if (!county || !name || !capacity) {
    res.status(400).json({ message: "Required fields are missing" });
    return;
  }

  try {
    const newVenue = await Venue.create({
      county,
      subCounty,
      area,
      name,
      capacity,
      mapLink,
    });

    res
      .status(201)
      .json({ message: "Venue created successfully", venue: newVenue });
  } catch (error) {
    console.error("Venue creation failed:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ===== Get Venues Handler =====
const getVenuesHandler: RequestHandler = async (_req, res) => {
  await connectDB();

  try {
    const venues = await Venue.find();
    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ===== Routes =====
router.post("/venues", createVenueHandler);
router.get("/venues", getVenuesHandler);

export default router;

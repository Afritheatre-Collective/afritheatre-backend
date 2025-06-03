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
  isPublic: boolean;
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

// ===== Update Venue Handler =====
const updateVenueHandler: RequestHandler<
  { id: string },
  any,
  Partial<VenueRequestBody>
> = async (req, res) => {
  await connectDB();

  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedVenue = await Venue.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedVenue) {
      res.status(404).json({ message: "Venue not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Venue updated successfully", venue: updatedVenue });
  } catch (error) {
    console.error("Venue update failed:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ===== Delete Venue Handler =====
const deleteVenueHandler: RequestHandler<{ id: string }> = async (req, res) => {
  await connectDB();

  const { id } = req.params;

  try {
    const deletedVenue = await Venue.findByIdAndDelete(id);

    if (!deletedVenue) {
      res.status(404).json({ message: "Venue not found" });
      return;
    }

    res.status(200).json({ message: "Venue deleted successfully" });
  } catch (error) {
    console.error("Venue deletion failed:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ===== to publish venue =====
const toggleVenuePublicHandler: RequestHandler<
  { id: string },
  any,
  { isPublic: boolean }
> = async (req, res) => {
  await connectDB();

  const { id } = req.params;
  const { isPublic } = req.body;

  try {
    const updatedVenue = await Venue.findByIdAndUpdate(
      id,
      { isPublic },
      { new: true }
    );

    if (!updatedVenue) {
      res.status(404).json({ message: "Venue not found" });
      return;
    }

    res.status(200).json({
      message: "Venue visibility updated successfully",
      venue: updatedVenue,
    });
  } catch (error) {
    console.error("Venue visibility update failed:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ===== Get Public Venues Handler =====
const getPublicVenuesHandler: RequestHandler = async (_req, res) => {
  await connectDB();

  try {
    const venues = await Venue.find({ isPublic: true });
    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ===== Routes =====
router.post("/venues", createVenueHandler);
router.get("/venues", getVenuesHandler);
router.get("/venues/public", getPublicVenuesHandler);
router.put("/venues/:id", updateVenueHandler);
router.delete("/venues/:id", deleteVenueHandler);
router.patch("/venues/:id/visibility", toggleVenuePublicHandler);

export default router;

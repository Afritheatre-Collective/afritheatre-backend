import express, { Router } from "express";
import {
  createVenueHandler,
  getVenuesHandler,
  getPublicVenuesHandler,
  updateVenueHandler,
  deleteVenueHandler,
  toggleVenuePublicHandler,
} from "../controller/venuesController";

const router: Router = express.Router();

// ===== Routes =====
router.post("/venues", createVenueHandler);
router.get("/venues", getVenuesHandler);
router.get("/venues/public", getPublicVenuesHandler);
router.put("/venues/:id", updateVenueHandler);
router.delete("/venues/:id", deleteVenueHandler);
router.patch("/venues/:id/visibility", toggleVenuePublicHandler);

export default router;

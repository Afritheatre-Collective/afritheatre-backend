import mongoose from "mongoose";

const venueSchema = new mongoose.Schema(
  {
    county: { type: String, required: true },
    subCounty: { type: String },
    area: { type: String },
    name: { type: String, required: true },
    capacity: { type: String, required: true },
    mapLink: { type: String },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Venue || mongoose.model("Venue", venueSchema);

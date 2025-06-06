import { Document, model, Schema } from "mongoose";

// ===== Interface =====
export interface ITheatreActivity extends Document {
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
  poster?: string;
  totalSessions: string;
  jobsCreated: string;
  indirectJobs: string;
  directJobs: string;
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
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ===== Schema =====
const TheatreActivitySchema: Schema = new Schema(
  {
    date: { type: Date },
    companyName: { type: String, required: true },
    sector: { type: String, enum: ["public", "private"] },
    companyStatus: { type: String, enum: ["new", "existing"] },
    activityType: {
      type: String,
      enum: ["performance", "capacity", "outreach"],
    },
    nature: {
      type: String,
      enum: [
        "frequent-regular",
        "frequent-irregular",
        "infrequent-regular",
        "infrequent-irregular",
      ],
    },
    poster: {
      type: String,
    },
    eventName: { type: String, required: true },
    county: { type: String },
    venue: { type: String },
    newVenue: { type: String },
    totalSessions: { type: String },
    jobsCreated: { type: String },
    indirectJobs: { type: String },
    directJobs: { type: String },
    entryType: { type: String, enum: ["free", "paid"] },
    bookingPlatform: { type: String },
    newBookingPlatform: { type: String },
    paymentMethods: [{ type: String }],
    language: { type: String },
    otherLanguage: { type: String },
    contactPerson: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    notes: { type: String },
    isPublic: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// ===== Export Model =====
export default model<ITheatreActivity>(
  "TheatreActivity",
  TheatreActivitySchema
);

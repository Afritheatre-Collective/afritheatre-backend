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
      type: String, // This will store the path/filename of the uploaded image
    },
    eventName: { type: String, required: true },
    county: { type: String },
    venue: { type: String },
    newVenue: { type: String },
    totalSessions: { type: String }, // or Number
    jobsCreated: { type: String }, // or Number
    indirectJobs: { type: String }, // or Number
    directJobs: { type: String }, // or Number
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

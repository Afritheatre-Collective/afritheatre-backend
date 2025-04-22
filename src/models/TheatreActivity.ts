import mongoose, { Document, Schema } from "mongoose";

export interface ITheatreActivity extends Document {
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
  venue: string;
  newVenue: string;
  totalSessions: string;
  jobsCreated: string;
  indirectJobs: string;
  directJobs: string;
  entryType: string;
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

const TheatreActivitySchema: Schema = new Schema(
  {
    month: { type: String, required: true },
    week: { type: String, required: true },
    date: { type: String, required: true },
    year: { type: String, required: true },
    time: { type: String, required: true },
    companyName: { type: String, required: true },
    sector: { type: String, required: true },
    companyStatus: { type: String, required: true },
    activityType: { type: String, required: true },
    nature: { type: String, required: true },
    eventName: { type: String, required: true },
    county: { type: String, required: true },
    venue: { type: String },
    newVenue: { type: String },
    totalSessions: { type: String, required: true },
    jobsCreated: { type: String, required: true },
    indirectJobs: { type: String, required: true },
    directJobs: { type: String, required: true },
    entryType: { type: String, required: true },
    bookingPlatform: { type: String },
    newBookingPlatform: { type: String },
    paymentMethods: { type: [String], default: [] },
    language: { type: String, required: true },
    otherLanguage: { type: String },
    contactPerson: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITheatreActivity>(
  "TheatreActivity",
  TheatreActivitySchema
);

import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors"; // ✅ Import CORS and types
import connectDB from "./connection/db";
import authRoutes from "./routes/auth";
import theatreRoutes from "./routes/theatre";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ Define CORS options
const corsOptions: CorsOptions = {
  origin: "http://localhost:3000", // No array if single origin
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// ✅ Use middleware
app.use(cors(corsOptions));
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api", theatreRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;

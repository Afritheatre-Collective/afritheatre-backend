import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import connectDB from "./connection/db";
import authRoutes from "./routes/authRoutes";
import theatreRoutes from "./routes/theatre";
import venuesRoutes from "./routes/venues";
import userRoutes from "./routes/userRoutes";
import uploadRoutes from "./routes/uploads";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions: CorsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api", theatreRoutes);
app.use("/api", venuesRoutes);
app.use("/api/users", userRoutes);
app.use("/api", uploadRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;

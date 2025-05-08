import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import connectDB from "./connection/db";
import authRoutes from "./routes/auth";
import theatreRoutes from "./routes/theatre";
import venuesRoutes from "./routes/venues";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions: CorsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/auth/users", authRoutes);
app.use("/api", theatreRoutes);
app.use("/api", venuesRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;

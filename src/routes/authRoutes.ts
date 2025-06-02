// routes/authRoute.ts
import express, { Request, Response, Router } from "express";
import { registerHandler, loginHandler } from "../controller/authController";
import User from "../models/User";
import connectDB from "../connection/db";

const router: Router = express.Router();

// ===== Routes =====
router.post("/register", registerHandler);
router.post("/login", loginHandler);

// Optional: GET all users (can also move to a separate controller)
router.get("/users", async (req: Request, res: Response) => {
  await connectDB();
  try {
    const users = await User.find({}, "-password"); // Exclude passwords
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

export default router;

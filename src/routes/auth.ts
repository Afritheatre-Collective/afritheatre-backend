import express, { Request, Response, Router, RequestHandler } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import connectDB from "../connection/db";

const router: Router = express.Router();

// ===== Types =====
interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

// ===== Register Handler =====
const registerHandler: RequestHandler<{}, any, RegisterRequestBody> = async (
  req,
  res
) => {
  await connectDB();
  const { name, email, password, phone } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    res.status(201).json({ message: "User registered", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// ===== Login Handler =====
const loginHandler: RequestHandler<{}, any, LoginRequestBody> = async (
  req,
  res
) => {
  await connectDB();
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // (Later: Generate JWT token here)
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// GET all users
router.get("/users", async (req: Request, res: Response) => {
  await connectDB();
  try {
    const users = await User.find({}, "-password"); // exclude passwords
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// ===== Routes =====
router.post("/register", registerHandler);
router.post("/login", loginHandler);

export default router;

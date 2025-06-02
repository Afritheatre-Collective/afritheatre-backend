// controllers/authController.ts
import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import connectDB from "../connection/db";

// ===== Types =====
interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string; // added role
}

interface LoginRequestBody {
  email: string;
  password: string;
}

// ===== Register Handler =====
export const registerHandler: RequestHandler<
  {},
  any,
  RegisterRequestBody
> = async (req, res) => {
  await connectDB();
  const { name, email, password, phone, role } = req.body;

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
      role,
    });
    res.status(201).json({ message: "User registered", user: newUser });
    return;
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
    return;
  }
};

// ===== Login Handler =====
export const loginHandler: RequestHandler<{}, any, LoginRequestBody> = async (
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
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Login successful", user, token });
    return;
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
    return;
  }
};

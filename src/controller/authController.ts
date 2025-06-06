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

// Add this to your existing authController.ts
export const meHandler: RequestHandler = async (req, res) => {
  await connectDB();
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    if (!process.env.JWT_SECRET) {
      res.status(500).json({ message: "Server configuration error" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
    return;
  } catch (err) {
    console.error("Error in /me endpoint:", err);
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Token expired" });
      return;
    }
    if (err instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }
    res.status(500).json({ message: "Server error", error: err });
    return;
  }
};

// Update user handler
export const updateUserHandler: RequestHandler = async (req, res) => {
  await connectDB();
  const { id } = req.params;
  const { name, email, phone, role } = req.body;
  try {
    const updated = await User.findByIdAndUpdate(
      id,
      { name, email, phone, role },
      { new: true, runValidators: true, select: "-password" }
    );
    if (!updated) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User updated", user: updated });
    return;
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
    return;
  }
};

// Delete user handler
export const deleteUserHandler: RequestHandler = async (req, res) => {
  await connectDB();
  const { id } = req.params;
  try {
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User deleted", user: deleted });
    return;
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
    return;
  }
};

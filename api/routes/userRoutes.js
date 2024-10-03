import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user already exists with that email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Create and save new user
    const user = new User({ email, password });
    await user.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Email Verification Route
router.post("/verify-email", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email }); // Verify by email instead of name
    if (!user) return res.status(400).json({ error: "Email not found" });

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ error: "Email verification failed" });
  }
});

// Modified login route for email-based login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;

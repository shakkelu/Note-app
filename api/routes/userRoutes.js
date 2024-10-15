import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js"; // Import the token utility

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

    // Generate token
    const token = generateToken(user._id);

    res.json({ token, message: "User registered successfully" }); // Send token upon registration
  } catch (err) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Email Verification Route
router.post("/validateEmail", async (req, res) => {
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

    // Generate token
    const token = generateToken(user._id);

    res.json({ token, message: "User login successfull" }); // Send token upon login
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;

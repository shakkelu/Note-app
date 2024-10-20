import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Import JWT if not already done
import User from "../models/user.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js"; // Import the token utility

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const user = new User({ email, password });
    await user.save();

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshTokens.push(refreshToken);
    await user.save();

    // Cookie settings
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set secure only for production
      sameSite: "strict",
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);
    res.json({ accessToken, message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Email validation route
router.post("/validateEmail", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Email not found" });

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ error: "Email verification failed" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshTokens.push(refreshToken);
    await user.save();

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set secure only for production
      sameSite: "strict",
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);
    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

// Route to refresh access token using refresh token
router.post("/refresh-token", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(403).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Find user by ID from the decoded token
    const user = await User.findById(decoded._id);
    if (!user || !user.refreshTokens.includes(refreshToken)) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Generate a new access token
    const newAccessToken = generateAccessToken(user._id);

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
});

export default router;

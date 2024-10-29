import bcrypt from "bcryptjs";
import User from "../models/user.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken";

/* 


Register controller


*/
export const registerController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const user = new User({ email, password });
    await user.save(); // Save the user in the database

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);
    res.json({
      accessToken,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error("Error saving user:", err); // Log the actual error to help diagnose it
    res.status(500).json({ error: "Failed to register user" });
  }
};

/* 


Login controller


*/

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set secure only for production
      sameSite: "strict",
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);
    res.json({ accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Login failed" });
  }
};

/* 


Validate email controller


*/

export const validateEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Email not found" });

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ error: "Email verification failed" });
  }
};

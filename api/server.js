import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import cookieParser from "cookie-parser";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const corsOptions = {
  origin: "http://localhost:5173", // Set the specific origin or dynamically determine it
  credentials: true, // Enable credentials (cookies, etc.)
};

// Middleware
app.use(express.json()); // This will parse incoming JSON payloads
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/user", noteRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Middleware to verify token
const verifyToken = async (req, res, next) => {
  console.log("Inside the middleware ");
  try {
    // Check if authorization header exists
    const head = req.headers["authorization"];
    console.log(head);
    if (!head) {
      return res
        .status(401)
        .json({ message: "Authorization header is required" });
    }

    // Extract the token from the header
    const token = head.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded token:", decoded);

    // Find the user by decoded ID
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "User not found!" });
    }

    // Attach user to request object
    req.body.user = user;
    next();
  } catch (error) {
    console.error("Error during token verification:", error);
    res.status(500).json({ error: error.message });
  }
};

export default verifyToken;

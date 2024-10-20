import jwt from "jsonwebtoken";
import User from "../models/user";

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send("Token is required");
  }

  // Verify token
  jwt.verify(token.split(" ")[1], ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }
    console.log(decoded);
    req.user = await User.findById(decoded._id).select("-password");
    console.log("Middleware run success");

    next();
  });
};

export default verifyToken;

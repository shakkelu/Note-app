import jwt from "jsonwebtoken";
import User from "../models/user.js";

/*
|
|
middleware for token verification in header
|
|
*/

const verifyToken = async (req, res, next) => {
  console.log(`
    *
    *
    *
    ###### INSIDE authMiddleware ######
     `);
  try {
    const head = req.headers["authorization"];
    if (head) {
      console.log(`
    *
    *
    *
    token is in the headers
     `);
    }
    if (!head) {
      return res
        .status(401)
        .json({ message: "Authorization header is required" });
    }

    const token = head.split(" ")[1];
    if (token) {
      console.log(`
    *
    *
    *
    token spitting successfull
     `);
    }
    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (decoded) {
      console.log(`
    *
    *
    *
    token decoding successfull
     `);
    } else {
      console.log(`
    *
    *
    *
    error in token decoding
     `);
    }

    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "User not found!" });
    } else {
      console.log(`
    *
    *
    *
    user found in DB
     `);
    }

    req.user = user;
    console.log(`
    *
    *
    *
    exiting middleware
     `);
    next();
  } catch (error) {
    console.error("Error during token verification:", error);
    res.status(500).json({ error: error.message });
  }
};

export default verifyToken;

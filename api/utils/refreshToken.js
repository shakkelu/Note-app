import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { generateAccessToken } from "./generateToken.js";

/* 
|
|
Return new access token after validating the refresh token inside cookie
|
|
*/
export const refreshTokenLogic = async (req, res) => {
  console.log(`
    *
    *
    *
    ###### INSIDE refreshTokenLogic ######
     `);
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    console.log(`
    *
    *
    *
    refresh token not recieved from cookie
   `);
    return res.status(403).json({ message: "No refresh token provided" });
  } else {
    console.log(`
    *
    *
    *
    refresh token recieved from cookie
   `);
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (decoded) {
      console.log(`
    *
    *
    *
    refresh token decoded successfully
   `);
    } else {
      console.log(`
    *
    *
    *
    refresh token can't be decoded
   `);
    }

    // Find user by ID from the decoded token
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    } else {
      console.log(`
    *
    *
    *
    found the user in the DB
   `);
    }

    // Generate a new access token
    const newAccessToken = generateAccessToken(user._id);
    if (newAccessToken) {
      console.log(`
    *
    *
    *
    new access token is generated
   `);
    }

    res.json({ accessToken: newAccessToken });
    console.log(`
    *
    *
    *
    new access token is sent as response
   `);
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
};

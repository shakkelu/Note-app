import jwt from "jsonwebtoken";

/**
 * Generates a JWT token for a given user ID.
 *
 * @param {string} userId - The unique identifier of the user.
 * @returns {string} - The signed JWT token.
 */
export const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d", // Token expires in one day
  });
};

export const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d", // Token expires in one day
  });
};

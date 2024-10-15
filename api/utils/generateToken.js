import jwt from "jsonwebtoken";

/**
 * Generates a JWT token for a given user ID.
 *
 * @param {string} userId - The unique identifier of the user.
 * @returns {string} - The signed JWT token.
 */
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d", // Token expires in one day
  });
};

export default generateToken;

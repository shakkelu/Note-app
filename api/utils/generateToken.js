import jwt from "jsonwebtoken";

/**
 * Generates a JWT token for a given user ID.
 *
 * @param {string} userId - The unique identifier of the user.
 * @returns {string} - The signed JWT token.
 */
export const generateAccessToken = (_id) => {
  const accessToken = jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d", // Token expires in one day
  });

  return accessToken;
};

export const generateRefreshToken = (_id) => {
  const refreshToken = jwt.sign({ _id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d", // Token expires in one day
  });

  return refreshToken;
};

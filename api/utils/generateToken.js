import jwt from "jsonwebtoken";

/**
 * Generates a JWT token for a given user ID.
 *
 * @param {string} userId - The unique identifier of the user.
 * @returns {string} - The signed JWT token.
 */
export const generateAccessToken = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d", // Token expires in one day
  });
  console.log(
    `Access token created at generateToken , this is token - ${accessToken} `
  );
  return accessToken;
};

export const generateRefreshToken = (userId) => {
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d", // Token expires in one day
  });
  console.log(
    `Refresh token created at generateToken , this is token - ${refreshToken} `
  );
  return refreshToken;
};

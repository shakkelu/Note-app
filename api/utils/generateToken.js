import jwt from "jsonwebtoken";
/* 
|
|
Generates access token
|
|
*/
export const generateAccessToken = (_id) => {
  console.log(`
    *
    *
    *
    ###### INSIDE generateAccessToken ######
     `);
  const accessToken = jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d", // Token expires in one day
  });
  if (accessToken) {
    console.log(`
    *
    *
    *
    new access token created
     `);
  } else {
    console.log(`
    *
    *
    *
    no new access token created
     `);
  }
  return accessToken;
};

/* 
|
|
Generates refresh token
|
|
*/
export const generateRefreshToken = (_id) => {
  console.log(`
    *
    *
    *
    ###### INSIDE generateRefreshToken ######
     `);
  const refreshToken = jwt.sign({ _id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "2d", // Token expires in one day
  });
  if (refreshToken) {
    console.log(`
    *
    *
    *
    New refresh token created
     `);
  } else {
    console.log(`
    *
    *
    *
    no new refresh token created
     `);
  }
  return refreshToken;
};

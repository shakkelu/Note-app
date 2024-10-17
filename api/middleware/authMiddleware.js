import jwt from "jsonwebtoken";

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send("Token is required");
  }

  // Verify token
  jwt.verify(token.split(" ")[1], ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }
    req.user = decoded; // Attach the decoded user data to the request object
    next();
  });
};

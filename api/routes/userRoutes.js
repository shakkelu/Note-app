import express from "express";
import {
  registerController,
  loginController,
  validateEmail,
} from "../controllers/authController.js";
import { refreshTokenLogic } from "../utils/refreshToken.js";

const router = express.Router();

router.post("/register", registerController);

router.post("/validateEmail", validateEmail);

router.post("/login", loginController);

router.get("/refresh-token", refreshTokenLogic);

export default router;

import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import {
  getNotes,
  createNote,
  getNote,
  editNote,
  deleteNote,
} from "../controllers/noteController.js";

const router = express.Router();

// Get all notes for the authenticated user
router.get("/get-notes", verifyToken, getNotes);

router.post("/create", verifyToken, createNote);

router.get("/get-note", verifyToken, getNote);

router.put("/edit", verifyToken, editNote);

router.delete("/delete-note", deleteNote);

export default router;

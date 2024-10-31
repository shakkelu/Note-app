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

router.get("/get-notes", verifyToken, getNotes);

router.post("/create", verifyToken, createNote);

router.get("/get-note/:noteId", verifyToken, getNote);

router.put("/edit", verifyToken, editNote);

router.delete("/delete-note/:noteId", deleteNote);

export default router;

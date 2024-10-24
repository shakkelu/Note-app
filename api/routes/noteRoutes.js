import express from "express";
import Note from "../models/notes.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all notes for the authenticated user
router.get("/dashboard", verifyToken, async (req, res) => {
  try {
    console.log("Inside the noteRoutes");
    const { user } = req.body;
    console.log(req.body);
    console.log(user._id);
    const notes = await Note.find({ user: user._id });
    res.json({ notes, user });
  } catch (err) {
    res.status(403).json({ error: "Failed to fetch notes" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { user, title, content } = req.body;
    console.log(req.body);
    const newNote = new Note({
      user,
      title,
      content,
    });
    const saved = await newNote.save();

    res.status(200).json({ message: " New note created succesfully!" });
  } catch (error) {}
});

export default router;

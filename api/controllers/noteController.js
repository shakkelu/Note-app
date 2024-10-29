import Note from "../models/notes.js";

export const getNotes = async (req, res) => {
  try {
    console.log("Inside the noteRoutes");
    const { user } = req.body;

    const notes = await Note.find({ user: user._id });
    res.json({ notes, user });
  } catch (err) {
    res.status(403).json({ error: "Failed to fetch notes" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { user, title, content } = req.body;
    console.log(req.body);
    const newNote = new Note({
      user,
      title,
      content,
    });
    await newNote.save();

    res.status(200).json({ message: " New note created succesfully!" });
  } catch (error) {}
};

export const getNote = async (req, res) => {
  try {
    const { noteId } = req.body;
    const note = await Note.findById(noteId);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: "Cannot find the note!" });
  }
};

export const editNote = async (req, res) => {
  try {
    const { noteId, title, content } = req.body;

    console.log(req.body);
    const note = await Note.findByIdAndUpdate(
      noteId,
      { title, content },
      { new: true } // Return the updated document
    );
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the note!" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { noteId } = req.body;
    const note = await Note.findByIdAndDelete(noteId);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
};

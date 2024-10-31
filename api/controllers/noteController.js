import Note from "../models/notes.js";

/*
|
|
getting all notes
|
|
*/
export const getNotes = async (req, res) => {
  try {
    console.log(`
    *
    *
    *
    ###### INSIDE getNotes ######
     `);
    const user = req.user;
    if (user) {
      console.log(`
    *
    *
    *
    user obtained from the body
     `);
    } else {
      console.log(`
    *
    *
    *
    no user obtained from the body
     `);
    }

    const notes = await Note.find({ user: user._id }).select({
      title: { $substr: ["$title", 0, 10] }, // Fetch first 10 characters of title
      content: { $substr: ["$content", 0, 15] }, // Fetch first 15 characters of content
    });

    if (notes) {
      console.log(`
    *
    *
    *
    notes obtained from the database
     `);
    } else {
      console.log(`
    *
    *
    *
    no notes obtained from the database
     `);
    }
    res.json({ notes, user });
    console.log(`
    *
    *
    *
    response sent from the server. {notes , user}
     `);
  } catch (err) {
    res.status(403).json({ error: "Failed to fetch notes" });
  }
};

/*
|
|
creating a new note
|
|
*/

export const createNote = async (req, res) => {
  console.log(`
    *
    *
    *
    ###### INSIDE createNote ######
     `);

  try {
    const user = req.user;
    const { title, content } = req.body;
    if (user && title && content) {
      console.log(`
    *
    *
    *
    user,title,content obtained from the body
     `);
    } else {
      console.log(`
    *
    *
    *
    no user/title/content obtained from the body
     `);
    }
    const newNote = new Note({
      user,
      title,
      content,
    });
    const noteSave = await newNote.save();

    if (noteSave) {
      console.log(`
    *
    *
    *
    new note is saved in DB
     `);
    } else {
      console.log(`
    *
    *
    *
    new note is not saved in the body 
     `);
    }

    res.status(200).json({ message: " New note created succesfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create note" });
  }
};

/*
|
|
getting a specific note
|
|
*/

export const getNote = async (req, res) => {
  console.log(`
    *
    *
    *
    ###### INSIDE getNote ######
     `);
  try {
    const { noteId } = req.params;
    if (noteId) {
      console.log(`
    *
    *
    *
    note id obtained from request
     `);
    } else {
      console.log(`
    *
    *
    *
    no note id obtained from request
     `);
    }
    const note = await Note.findById(noteId);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: "Cannot find the note!" });
  }
};

/*
|
|
editing a specific note
|
|
*/
export const editNote = async (req, res) => {
  console.log(`
    *
    *
    *
    ###### INSIDE editNote ######
     `);
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

/*
|
|
deleting a specific note
|
|
*/

export const deleteNote = async (req, res) => {
  console.log(`
    *
    *
    *
    ###### INSIDE deleteNote ######
     `);

  try {
    const { noteId } = req.params;
    const note = await Note.findByIdAndDelete(noteId);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
};

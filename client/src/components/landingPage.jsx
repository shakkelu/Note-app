import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotes,
  getNotesState,
  getNote,
  deleteNote,
} from "../store/noteSlice";
import { openButton, getButton } from "../store/modalSlice";
import Note from "./note";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const dispatch = useDispatch();
  const notes = useSelector(getNotesState);
  const button = useSelector(getButton);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  const handleOnClickOnNote = (noteId) => {
    console.log(noteId);
    dispatch(getNote({ noteId }));
    navigate("/note");
  };

  const handleDelete = (noteId) => {
    dispatch(deleteNote({ noteId }));
  };

  const handleCreateNewNote = () => {
    navigate("/create");
  };
  return (
    <div>
      {notes &&
        notes.length !== 0 &&
        notes.map((note) => (
          <div key={note._id}>
            <div onClick={() => handleOnClickOnNote(note._id)}>
              <div>{note.title}</div>
              <div>{note.content}</div>
            </div>
            <button onClick={() => handleDelete(note._id)}>Delete</button>
          </div>
        ))}

      <div onClick={() => handleCreateNewNote()}>new</div>
    </div>
  );
}

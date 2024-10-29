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

export default function landingPage() {
  const dispatch = useDispatch();
  const notes = useSelector(getNotesState);
  const button = useSelector(getButton);
  useEffect(() => {
    dispatch(getNotes());
  }, []);
  const handleOnClickOnNote = (noteId) => {
    dispatch(getNote(noteId));
    dispatch(openButton());
    return (
      <>
        {button && (
          <>
            <Note />
          </>
        )}
      </>
    );
  };

  const handleDelete = (noteId) => {
    dispatch(deleteNote(noteId));
  };
  return (
    <div>
      {notes &&
        notes.length !== 0 &&
        notes.map((note) => (
          <div key={note._id} onClick={() => handleOnClickOnNote(note._id)}>
            <div>{note.title}</div>
            <div>{note.content}</div>
            <button onClick={() => handleDelete(note._id)}>Delete</button>
          </div>
        ))}
    </div>
  );
}

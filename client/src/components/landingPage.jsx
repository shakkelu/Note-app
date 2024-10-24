import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotes, privateRoute } from "../store/noteSlice";

export default function landingPage() {
  const dispatch = useDispatch();
  const notes = useSelector(getNotes);
  useEffect(() => {
    dispatch(privateRoute());
  }, []);
  return (
    <div>
      {notes &&
        notes.length !== 0 &&
        notes.map((note) => (
          <div key={note._id}>
            <div>{note.title}</div>
            <div>{note.content}</div>
          </div>
        ))}
    </div>
  );
}

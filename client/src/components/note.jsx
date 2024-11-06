import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNoteState,
  getLoadingState,
  editNote,
  resetNewNoteFlag,
} from "../store/noteSlice";
import { useNavigate } from "react-router-dom";

const Note = () => {
  const note = useSelector(getNoteState);
  const loading = useSelector(getLoadingState);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure the note is available before setting title and content
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      // Reset the newNoteFlag when the note is displayed
      dispatch(resetNewNoteFlag());
    } else {
      navigate("/dashboard");
    }
  }, [note, dispatch, navigate]);

  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Save changes and exit edit mode
  const handleSaveClick = () => {
    setIsEditing(false);
    if (note) {
      dispatch(editNote({ noteId: note._id, title, content }));
    }
  };

  const handleClose = () => {
    navigate("/dashboard");
  };

  if (loading) return <div>Loading...</div>;
  if (!note) return <div>Note not obtained :/</div>;

  return (
    <div>
      {!loading && (
        <>
          <div>
            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            ) : (
              <h2>{title}</h2>
            )}
          </div>
          <div>
            {isEditing ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            ) : (
              <p>{content}</p>
            )}
          </div>
        </>
      )}
      <div>
        {isEditing ? (
          <button onClick={handleSaveClick}>Save</button>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
      </div>
      <div onClick={handleClose}>Close</div>
    </div>
  );
};

export default Note;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNoteState, editNote } from "../store/noteSlice";
import { closeButton } from "../store/modalSlice";

const Note = () => {
  const note = useSelector(getNoteState);
  const dispatch = useDispatch();
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [isEditing, setIsEditing] = useState(false);
  const noteId = note._id;

  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Save changes and exit edit mode
  const handleSaveClick = () => {
    setIsEditing(false);
    dispatch(editNote({ noteId, title, content }));
  };

  return (
    <div>
      {note && (
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
          <button onClick={() => handleSaveClick}>Save</button>
        ) : (
          <button onClick={() => handleEditClick}>Edit</button>
        )}
      </div>
      <div onClick={() => dispatch(closeButton)}>Close</div>
    </div>
  );
};

export default Note;

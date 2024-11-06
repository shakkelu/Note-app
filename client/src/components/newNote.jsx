import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../store/noteSlice";
import { getNewNoteFlag } from "../store/noteSlice";
import { useNavigate } from "react-router-dom";

const NewNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const flag = useSelector(getNewNoteFlag);

  useEffect(() => {
    if (flag) {
      navigate("/note");
    }
  }, [flag]);

  const handleSaveClick = () => {
    dispatch(createNote({ title, content }));
  };
  return (
    <>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button onClick={handleSaveClick}>Save</button>
    </>
  );
};

export default NewNote;

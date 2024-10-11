import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../store/modalSlice"; // Import Redux actions

import "../styles/sidebar.css";
import Modal from "./modal"; // Reuse the Modal component
import Login from "./login"; // Reuse the Login form component
import Register from "./register"; // Reuse the Register form component

const Sidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { isModalOpen, modalContentType } = useSelector((state) => state.modal); // Access modal state from Redux

  // Modal content based on the state
  let modalContent;
  if (modalContentType === "login") {
    modalContent = <Login />;
  } else if (modalContentType === "register") {
    modalContent = <Register />;
  }

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="close-button1" onClick={onClose}>
          &times;
        </button>
        <nav className="sidebar-nav">
          <button
            className="home-button"
            onClick={() => dispatch(openModal("login"))} // Dispatch openModal action with "login"
          >
            Login
          </button>
          <button
            className="home-button"
            onClick={() => dispatch(openModal("register"))} // Dispatch openModal action with "register"
          >
            Signup
          </button>
        </nav>
      </div>
      {isModalOpen && (
        <Modal onClose={() => dispatch(closeModal())}>{modalContent}</Modal>
      )}
    </>
  );
};

export default Sidebar;

import React, { useState } from "react";

import "../styles/sidebar.css";
import Modal from "./modal"; // Reuse the Modal component
import Login from "./login"; // Reuse the Login form component
import Register from "./register"; // Reuse the Register form component

const Sidebar = ({ isOpen, onClose }) => {
  const [modalContent, setModalContent] = useState(null);

  // Open modal with the corresponding form
  const openModal = (type) => {
    if (type === "login") {
      setModalContent(<Login />);
    } else if (type === "register") {
      setModalContent(<Register />);
    }
  };

  const closeModal = () => {
    setModalContent(null); // Close the modal
    onClose(); // Also close the sidebar
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="close-button1" onClick={onClose}>
          &times;
        </button>
        <nav className="sidebar-nav">
          {/* Replace NavLink with button to open modal */}
          <button className="sidebar-link" onClick={() => openModal("login")}>
            Login
          </button>
          <button
            className="sidebar-link"
            onClick={() => openModal("register")}
          >
            Signup
          </button>
        </nav>
      </div>

      {/* Show the modal if there's content */}
      {modalContent && <Modal onClose={closeModal}>{modalContent}</Modal>}
    </>
  );
};

export default Sidebar;

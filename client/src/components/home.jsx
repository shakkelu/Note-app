import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./modal"; // Import Modal component
import Login from "./login"; // Assuming Login component will be displayed
import Register from "./register"; // Assuming Register component will be displayed
import "../styles/home.css";

const Home = () => {
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  const openModal = (type) => {
    if (type === "login") {
      setModalContent(<Login />);
    } else if (type === "register") {
      setModalContent(<Register />);
    }
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <>
      <div className={`home-body ${modalContent ? "blur-background" : ""}`}>
        <div className="home-container">
          <div className="welcome-message">
            <h1>Welcome to Notes App</h1>
          </div>
        </div>
        <div className="button-container">
          <div className="faa">
            <div className="small-txt">Already registered user?</div>
            <button className="home-button" onClick={() => openModal("login")}>
              Login
            </button>
          </div>
          <div className="faa">
            <div className="small-txt">New to notes app?</div>
            <button
              className="home-button"
              onClick={() => openModal("register")}
            >
              Signup
            </button>
          </div>
        </div>
      </div>

      {modalContent && <Modal onClose={closeModal}>{modalContent}</Modal>}
    </>
  );
};

export default Home;

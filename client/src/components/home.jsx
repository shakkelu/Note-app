import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../store/modalSlice"; // Import Redux actions
import Modal from "./modal";
import Login from "./login";
import Register from "./register";
import "../styles/home.css";

const Home = () => {
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
      <div className={`home-body ${isModalOpen ? "blur-background" : ""}`}>
        <div className="home-container">
          <div className="welcome-message">
            <h1>Welcome to Notes App</h1>
          </div>
        </div>
        <div className="button-container">
          <div className="faa">
            <div className="small-txt">Already registered user?</div>
            <button
              className="home-button"
              onClick={() => dispatch(openModal("login"))} // Dispatch openModal action with "login"
            >
              Login
            </button>
          </div>
          <div className="faa">
            <div className="small-txt">New to notes app?</div>
            <button
              className="home-button"
              onClick={() => dispatch(openModal("register"))} // Dispatch openModal action with "register"
            >
              Signup
            </button>
          </div>
        </div>
      </div>

      {/* Modal is displayed based on Redux state */}
      {isModalOpen && (
        <Modal onClose={() => dispatch(closeModal())}>{modalContent}</Modal>
      )}
    </>
  );
};

export default Home;

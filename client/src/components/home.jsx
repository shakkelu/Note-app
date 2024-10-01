import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="home-body">
        <div className="home-container">
          <div className="welcome-message">
            <h1>Welcome to Notes App</h1>
          </div>
        </div>
        <div className="button-container">
          <div className="faa">
            <div className="small-txt">Already registered user?</div>

            <button className="home-button" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
          <div className="faa">
            <div className="small-txt">New to notes app?</div>

            <button
              className="home-button"
              onClick={() => navigate("/register")}
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css"; // Create this CSS file for the sidebar styles

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-button" onClick={onClose}>
        &times;
      </button>
      <nav className="sidebar-nav">
        <NavLink to="/login" className="sidebar-link" onClick={onClose}>
          Login
        </NavLink>
        <NavLink to="/register" className="sidebar-link" onClick={onClose}>
          Signup
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;

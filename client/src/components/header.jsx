import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Sidebar from "./sidebar"; // Import Sidebar component
import "../styles/header.css";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="header">
        <button className="menu-button" onClick={toggleSidebar}>
          &#9776; {/* This is a hamburger icon */}
        </button>
        <NavLink to="/" className="nav-link color">
          <h3>Notes App</h3>
        </NavLink>
        <div className="color">Search button</div>
      </div>

      {/* Sidebar component */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </>
  );
};

export default Header;

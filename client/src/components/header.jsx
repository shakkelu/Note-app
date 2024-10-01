import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  return (
    <>
      <div className="header">
        <NavLink to="/" className="nav-link color">
          <h3>Notes App</h3>
        </NavLink>
        <div className="color">Search button</div>
        <div className="color">Dropdown</div>
      </div>
    </>
  );
};

export default Header;

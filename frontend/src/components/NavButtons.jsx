//src/components/NavButtons.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/common.css";

const NavButtons = () => {
  
  const navigate = useNavigate();

  return (
    <div className="nav-buttons-container">
      <button className="nav-button">
        <div className="original">My Account</div>
        <div className="letters">
          <span>M</span>
          <span>Y</span>
          <span>&nbsp;</span>
          <span>A</span>
          <span>C</span>
          <span>C</span>
          <span>O</span>
          <span>U</span>
          <span>N</span>
          <span>T</span>
        </div>
      </button>
      <button className="nav-button" onClick={() => navigate("/recordings")} >
        <div className="original">My Recordings</div>
        <div className="letters">
          <span>L</span>
          <span>a</span>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <span>L</span>
          <span>a</span>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <span>L</span>
          <span>a</span>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <span>L</span>
          <span>a</span>
          <span>🎤✌🏻</span>

        </div>
      </button>
      <button className="nav-button" onClick={() => navigate("/login")}>
        <div className="original">Logout</div>
        <div className="letters">
          <span>B</span>
          <span>u</span>
          <span>B</span>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <span>B</span>
          <span>Y</span>
          <span>E</span>
          <span>!</span>
          <span>!</span>
          <span>😄</span>


        </div>
      </button>
    </div>
  );
};

export default NavButtons;

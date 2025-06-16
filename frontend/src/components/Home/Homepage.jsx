//src/components/Home/Homepage.jsx

import React from "react";
import NavButtons from "../NavButtons";
import "../../styles/Homepage.css"; // Add any additional styling for the homepage
import Mic from "./Mic";



const Homepage = () => {
  return (
    <div className="homepage-container">
    <NavButtons />
    <Mic />
    <div className="content">
      <div className="paralax">
        <div className="layer rocks2"></div>
        <div className="layer rocks1"></div>
        <div className="layer hills"></div>
        <div className="layer foreground"></div>
      </div>
     
    </div>
  </div>
  );
};

export default Homepage;

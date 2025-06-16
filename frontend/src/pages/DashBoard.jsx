

import React from "react";
import "../styles/darkmodeparallax.css";
import "../styles/glassmorphism.css";  // New CSS file for glassmorphism

const DashBoard = () => {

  const handleClick = (section) => {
    alert(`Clicked on: ${section}`);
  };


  return (
    <div className="Darkpage-container">
      <div className="content">
        <div className="darkparalax">
          <div className="layer rocks2"></div>
          <div className="layer rocks1"></div>
          <div className="layer hills"></div>
          <div className="layer foreground"></div>
        </div>

        {/* Glassmorphism Main Container */}
        <div className="glass-main-container">
          {/* Profile Section */}
          <div className="glass-profile " onClick={() => handleClick('Profile Section')}>
            <div className="profile-pic"></div>
            <div className="profile-info">
              <h2>Welcome, Ashwani & Bhamya</h2>
              <p>Stress Detection Dashboard</p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="glass-stats">
            <div className="stat-card tile" onClick={() => handleClick('Total Sessions')}>Total Sessions: 25</div>
            <div className="stat-card tile" onClick={() => handleClick('Average Stress Level')}>Average Stress Level: 60%</div>
            <div className="stat-card tile" onClick={() => handleClick('Peak Stress')}>Peak Stress: 90%</div>
          </div>

          {/* Charts Section */}
          <div className="glass-charts">
            <div className="chart tile" onClick={() => handleClick('Graph 1')}>Graph 1</div>
            <div className="chart tile" onClick={() => handleClick('Graph 2')}>Graph 2</div>
            <div className="chart tile" onClick={() => handleClick('Graph 3')}>Graph 3</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

//src/pages/MyRecordingsPage.jsx

import React from "react";

import "../styles/Homepage.css"; // Reusing the same styles as Homepage
import RecordingsList from "../components/MyRecordings/RecordingsList";

const MyRecordingsPage = () => {
  return (
    <div className="homepage-container">
      <div className="content">
        <div className="paralax">
          <div className="layer rocks2"></div>
          <div className="layer rocks1"></div>
          <div className="layer hills"></div>
          <div className="layer foreground"></div>
          <div>
            {/* Table */}
            <RecordingsList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRecordingsPage;

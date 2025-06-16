//src/components/TranscriptBox.jsx

import React from "react";
import "../styles/transcript.css";


const TranscriptBox = ({ transcript, onSave, onRetry, onCancel }) => {
  return (
    <div className="transcript-box">
      <div className="transcript-header">
        <h3>Live Transcript</h3>
      </div>
      <div className="transcript-content">
        <p className="transcript-text">{transcript || "Listening..."}</p>
      </div>
      <div className="button-group">
        <button className="save-btn" onClick={onSave}>Save</button>
        <button className="retry-btn" onClick={onRetry}>Retry</button>
        <button className="cancel-btn" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default TranscriptBox;

// //src/components/MyRecordings/RecordingsList.jsx


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { fetchRecordings } from "../../utils/api";
// import '../../styles/recordinglist.css'
// import '../../styles/common.css'


// const RecordingsList = () => {
//   const [recordings, setRecordings] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadRecordings = async () => {
//       const data = await fetchRecordings();
//       setRecordings(data); // Store the fetched recordings in state
//     };
//     loadRecordings();
//   }, []);

//   return (
//     <div className="recordings-container">
//         <button className="nav-button" onClick={() => navigate("/home")}>Home Page</button>
//       <h2 className="title">My Recordings</h2>
//       <div className="table-wrapper">
//         <table className="recordings-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Transcript</th>
//               <th>Sentiment</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {recordings.length > 0 ? (
//               recordings.map((rec, index) => (
//                 <tr key={rec._id || index}>
//                   <td>{index + 1}</td>
//                   <td>{rec.transcript.length > 50 ? rec.transcript.substring(0, 50) + "..." : rec.transcript}</td>
//                   <td>
//                     {rec.sentiment ? (
//                       <>
//                        Negative : {rec.sentiment.neg} |Neutral : {rec.sentiment.neu} |Positive : {rec.sentiment.pos} |Overall : {rec.sentiment.compound}
//                       </>
//                     ) : (
//                       "N/A"
//                     )}
//                   </td>
//                   <td>{rec.createdAt ? new Date(rec.createdAt).toLocaleDateString() : "Unknown"}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="no-data">No recordings found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default RecordingsList;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRecordings } from "../../utils/api";
import "../../styles/recordinglist.css";
import "../../styles/common.css";

const RecordingsList = () => {
  const [recordings, setRecordings] = useState([]);
  const [hoveredTranscript, setHoveredTranscript] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const loadRecordings = async () => {
      const data = await fetchRecordings();
      setRecordings(data);
    };
    loadRecordings();
  }, []);

  const handleMouseEnter = (event, transcript) => {
    setHoveredTranscript(transcript);
    setTooltipPosition({
      x: event.clientX + 10, // Position slightly right
      y: event.clientY + 10, // Position slightly down
    });
  };

  const handleMouseLeave = () => {
    setHoveredTranscript(null);
  };

  return (
    <div className="recordings-container">
      <button className="nav-button" onClick={() => navigate("/home")}>
        Home Page
      </button>
      <h2 className="title">My Recordings</h2>
      <div className="table-wrapper">
        <table className="recordings-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Transcript</th>
              <th>Sentiment</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recordings.length > 0 ? (
              recordings.map((rec, index) => (
                <tr
                  key={rec._id || index}
                  onMouseEnter={(e) => handleMouseEnter(e, rec.transcript)}
                  onMouseMove={(e) => setTooltipPosition({ x: e.clientX + 10, y: e.clientY + 10 })}
                  onMouseLeave={handleMouseLeave}
                >
                  <td>{index + 1}</td>
                  <td>{rec.transcript.length > 50 ? rec.transcript.substring(0, 50) + "..." : rec.transcript}</td>
                  <td>
                    {rec.sentiment ? (
                      <>
                        Negative: {rec.sentiment.neg} | Neutral: {rec.sentiment.neu} | Positive: {rec.sentiment.pos} |
                        Overall: {rec.sentiment.compound}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>{rec.createdAt ? new Date(rec.createdAt).toLocaleDateString() : "Unknown"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-data">No recordings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Tooltip Box */}
      {hoveredTranscript && (
        <div
          className="tooltip-box"
          style={{ top: `${tooltipPosition.y}px`, left: `${tooltipPosition.x}px` }}
        >
          {hoveredTranscript}
        </div>
      )}
    </div>
  );
};

export default RecordingsList;



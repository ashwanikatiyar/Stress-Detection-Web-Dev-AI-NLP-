//src/components/Home/Mic.jsx


import React, { useState, useEffect } from "react";
import "../../styles/mic.css";
import "../../styles/timer.css";
import TranscriptBox from "../TranscriptBox";
import "../../styles/transcript.css";

const MicButtonWithTimer = () => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);

 

  // Initialize Speech Recognition API
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = (event) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            setTranscript((prev) => prev + " " + event.results[i][0].transcript);
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
      };

      recognitionInstance.onend = () => {
        if (isMicOn) {
          recognitionInstance.start(); // Restart if still recording
        }
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const [isRecognizing, setIsRecognizing] = useState(false); // Track if recognition is running

  const handleMicClick = () => {
    if (isMicOn) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {

    if (isRecognizing) return; // Prevent multiple starts

    setIsMicOn(true);
    setTranscript(""); // Clear previous transcript
    setTimeLeft(30);
    setIsRecognizing(true); // Mark recognition as running

    if (!recognition) return; // Ensure recognition exists

    recognition.start();
  };

  const stopRecording = () => {
    setIsMicOn(false);
    setIsRecognizing(false); // Mark recognition as stopped

    if (recognition) {
      recognition.stop();
    }
  };

  const saveRecording = async () => {
    if (!transcript) {
      alert("No transcript available to save.");
      return;
    }
  
    // Assuming you have an audio file stored somewhere
    const audioFile = new File([/* Blob or recording data */], "recording.mp3", { type: "audio/mpeg" });
  
    const formData = new FormData();
    // formData.append("userId", "65a1b2c3d4e5f67890123456"); // Replace with actual user ID
    formData.append("transcript", transcript);
    formData.append("audio", audioFile);  // Attach the audio file
  
    try {
      const response = await fetch("http://localhost:2000/api/recordings/save", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Recording saved successfully!");
        setTranscript("");
      } else {
        alert("Error saving recording: " + data.error);
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save recording.");
    }
  };
  
  

  useEffect(() => {
    let timer;
    if (isMicOn && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } 
    else if (timeLeft === 0) {
      stopRecording();
      navigator.vibrate?.(500);
      setTimeout(() => setTimeLeft(30), 500); // Reset timer after stopping
    }
    return () => clearInterval(timer);
  }, [isMicOn, timeLeft , stopRecording]);

  return (
    <div className="mic-container">
      {isMicOn && (
        <div className="timer">
          <span>{`00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`}</span>
        </div>
      )}
      {(isMicOn || transcript) && (
        <TranscriptBox
          transcript={transcript}
          onSave={saveRecording}
          onRetry={startRecording}
          onCancel={() => setTranscript("")}
        />
      )}

      <button
        className={`button ${isMicOn ? "clicked" : ""}`}
        onClick={handleMicClick}
        disabled={timeLeft === 0}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          className="svg-icon"
        >
          <g strokeWidth="2" strokeLinecap="round" stroke="#ff342b">
            <rect x="9" y="3" width="6" height="11" rx="3"></rect>
            <path d="M12 18v3"></path>
            <path d="M8 21h8"></path>
            <path d="M19 11c0 3.866-3.134 7-7 7-3.866 0-7-3.134-7-7"></path>
          </g>
        </svg>
        <span className="label">{isMicOn ? "Recording..." : "Record"}</span>
      </button>
    </div>
  );
};

export default MicButtonWithTimer;






// //src/components/Home/Mic.jsx


// import React, { useState, useEffect } from "react";
// import "../../styles/mic.css";
// import "../../styles/timer.css";
// import TranscriptBox from "../TranscriptBox";
// import "../../styles/transcript.css";

// const MicButtonWithTimer = () => {
//   const [isMicOn, setIsMicOn] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(30);
//   const [transcript, setTranscript] = useState("");
//   const [recognition, setRecognition] = useState(null);


//   // Initialize Speech Recognition API
//   useEffect(() => {
//     if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
//       const SpeechRecognition =
//         window.SpeechRecognition || window.webkitSpeechRecognition;
//       const recognitionInstance = new SpeechRecognition();
//       recognitionInstance.continuous = true;
//       recognitionInstance.interimResults = true;
//       recognitionInstance.lang = "en-US";

//       recognitionInstance.onresult = (event) => {
//         let interimTranscript = "";
//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           if (event.results[i].isFinal) {
//             setTranscript((prev) => prev + " " + event.results[i][0].transcript);
//           } else {
//             interimTranscript += event.results[i][0].transcript;
//           }
//         }
//       };

      

//       setRecognition(recognitionInstance);
//     }
//   }, []);

//   const handleMicClick = () => {
//     if (isMicOn) {
//       stopRecording();
//     } else {
//       startRecording();
//     }
//   };

//   const startRecording = () => {
//     setIsMicOn(true);
//     setTranscript(""); // Clear previous transcript
//     setTimeLeft(30);

//     if (recognition) {
//       recognition.start();
//     }
//   };

//   const stopRecording = () => {
//     setIsMicOn(false);

//     if (recognition) {
//       recognition.stop();
//     }
//   };

//   const saveRecording = async () => {
//     if (!transcript) {
//       alert("No transcript available to save.");
//       return;
//     }
  
//     // Assuming you have an audio file stored somewhere
//     const audioFile = new File([/* Blob or recording data */], "recording.mp3", { type: "audio/mpeg" });
  
//     const formData = new FormData();
//     // formData.append("userId", "65a1b2c3d4e5f67890123456"); // Replace with actual user ID
//     formData.append("transcript", transcript);
//     formData.append("audio", audioFile);  // Attach the audio file
  
//     try {
//       const response = await fetch("http://localhost:2000/api/recordings/save", {
//         method: "POST",
//         body: formData,
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         alert("Recording saved successfully!");
//         setTranscript("");
//       } else {
//         alert("Error saving recording: " + data.error);
//       }
//     } catch (error) {
//       console.error("Save error:", error);
//       alert("Failed to save recording.");
//     }
//   };
  
  

//   useEffect(() => {
//     let timer;
//     if (isMicOn && timeLeft > 0) {
//       timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
//     } else if (timeLeft === 0) {
//       stopRecording();
//       navigator.vibrate?.(500);
//     }
//     return () => clearInterval(timer);
//   }, [isMicOn, timeLeft , stopRecording]);

//   return (
//     <div className="mic-container">
//       {isMicOn && (
//         <div className="timer">
//           <span>{`00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`}</span>
//         </div>
//       )}
//       {(isMicOn || transcript) && (
//         <TranscriptBox
//           transcript={transcript}
//           onSave={saveRecording}
//           onRetry={startRecording}
//           onCancel={() => setTranscript("")}
//         />
//       )}

//       <button
//         className={`button ${isMicOn ? "clicked" : ""}`}
//         onClick={handleMicClick}
//         disabled={timeLeft === 0}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="32"
//           height="32"
//           viewBox="0 0 24 24"
//           fill="none"
//           className="svg-icon"
//         >
//           <g strokeWidth="2" strokeLinecap="round" stroke="#ff342b">
//             <rect x="9" y="3" width="6" height="11" rx="3"></rect>
//             <path d="M12 18v3"></path>
//             <path d="M8 21h8"></path>
//             <path d="M19 11c0 3.866-3.134 7-7 7-3.866 0-7-3.134-7-7"></path>
//           </g>
//         </svg>
//         <span className="label">{isMicOn ? "Recording..." : "Record"}</span>
//       </button>

    
//     </div>
//   );
// };

// export default MicButtonWithTimer;













































































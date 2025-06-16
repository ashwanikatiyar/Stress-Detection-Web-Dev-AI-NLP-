//controllers/recordingController.js



const axios = require("axios");
const Recording = require("../models/RecordingModel");

const saveRecording = async (req, res) => {
  try {
    const { transcript } = req.body;
    const audioUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!audioUrl || !transcript) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // 1️⃣ Send the transcript to Flask API for sentiment analysis
    const flaskApiUrl = "http://127.0.0.1:4000/analyze";

    const flaskResponse = await axios.post(flaskApiUrl, { text: transcript }, {
      headers: { "Content-Type": "application/json" }
    });

    const sentimentData = flaskResponse.data;  // Extract sentiment scores

    // 2️⃣ Save recording & sentiment analysis result in MongoDB
    const newRecording = new Recording({
      audioUrl,
      transcript,
      sentiment: sentimentData,  // Store sentiment analysis result
    });

    await newRecording.save();
    res.status(201).json({ message: "Recording saved successfully!", newRecording });

  } catch (error) {
    console.error("Error saving recording:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getRecordings = async (req, res) => {
  try {
    const recordings = await Recording.find().sort({ createdAt: -1 }); // ✅ Sort by date (latest first)
    res.json(recordings);
  } catch (error) {
    console.error("Error fetching recordings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { saveRecording, getRecordings };






// const Recording = require("../models/RecordingModel");

// const saveRecording = async (req, res) => {
//   try {
//     const {  transcript } = req.body;
//     const audioUrl = req.file ? `/uploads/${req.file.filename}` : null;

//     if (!audioUrl || !transcript) {
//       return res.status(400).json({ error: "Missing required fields." });
//     }

//     const newRecording = new Recording({
//       // userId,
//       audioUrl,
//       transcript,
//     });

//     await newRecording.save();
//     res.status(201).json({ message: "Recording saved successfully!", newRecording });
//   } catch (error) {
//     console.error("Error saving recording:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// module.exports = { saveRecording };

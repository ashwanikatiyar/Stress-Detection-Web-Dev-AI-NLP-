//models/RecordingModel.js



const mongoose = require("mongoose");

const RecordingSchema = new mongoose.Schema({
  audioUrl: { type: String, required: true },
  transcript: { type: String, required: true },
  sentiment: {
    neg: { type: Number, default: 0 },
    neu: { type: Number, default: 0 },
    pos: { type: Number, default: 0 },
    compound: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Recording", RecordingSchema);














// const mongoose = require("mongoose");

// const RecordingSchema = new mongoose.Schema({
//   // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   audioUrl: { type: String, required: true },  // File path or Cloud URL
//   transcript: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Recording", RecordingSchema);

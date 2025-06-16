//routes/recordingRoutes.js
const express = require("express");
const router = express.Router();
const { saveRecording, getRecordings } = require("../controllers/recordingController"); // ✅ Import getRecordings

const fileUploadMiddleware = require("../middlewares/fileUploadMiddleware");

router.post("/save", fileUploadMiddleware.single("audio"), saveRecording);
router.get("/", getRecordings); // ✅ This should now work

module.exports = router;

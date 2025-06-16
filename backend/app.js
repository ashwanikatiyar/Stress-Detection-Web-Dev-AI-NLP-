//app.js

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const recordingRoutes = require("./routes/recordingRoutes");
const cors = require('cors');
const stressRoutes = require("./routes/stressRoutes");

app.use(cors({
  origin: 'http://localhost:3001', // Replace with your frontend URL
  credentials: true, // Allow cookies (if needed)
}));

dotenv.config();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use("/api/recordings", recordingRoutes); // ✅ Correctly uses recording routes
app.use("/api/stress", stressRoutes); //ML Model


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected!"))
  .then(() => app.listen(2000, () => console.log("🚀 Server running on port 2000")))
  .catch((err) => console.log("❌ MongoDB connection error:", err));


//brew services start mongodb/brew/mongodb-community

//or

//mongod --config /opt/homebrew/etc/mongod.conf --fork

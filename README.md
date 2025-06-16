
# 🧠 Stress Detection Platform using AI & NLP

A full-stack web application that detects stress levels from user inputs using advanced Natural Language Processing and deep learning techniques.

> 🚀 Built with Node.js, Express, React, MongoDB, and a Python-based AI model for stress prediction.

---

## 📂 Project Structure

Stress-Detection-Web-Dev-AI-NLP-
├── backend/ # Node.js backend server
├── frontend/ # React.js frontend app


---

## 💡 Features

- 🔍 **Stress Detection** using a deep learning NLP model (ONNX format)
- 🧪 Real-time input analysis and stress prediction
- 📦 RESTful APIs built with Express.js
- 🧠 Model inference powered by Python backend (served with Flask/NLP)
- 💾 MongoDB database integration for storing user data or logs
- 📥 File upload and processing (e.g., CSV or text)
- 🌐 Dockerized for deployment

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- HTML, CSS, JavaScript
- Axios for API calls

### Backend:
- Node.js with Express
- Python (for NLP model inference)
- MongoDB (via Mongoose)
- ONNX model for stress detection
- REST API structure

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- Python 3.8+
- MongoDB
- `pip` (Python package manager)

---

### 🔧 Installation

#### 1. Clone the Repository


git clone https://github.com/ashwanikatiyar/Stress-Detection-Web-Dev-AI-NLP-.git
cd Stress-Detection-Web-Dev-AI-NLP-


#### 2. Setup Backend

cd backend
npm install


#### 3. Setup Python Virtual Environment

python3 -m venv myvenv
source myvenv/bin/activate
pip install -r requirements.txt


#### 4. Setup Frontend

cd ../frontend
npm install

🧪 Running the Project
Start Backend Server (Node + Python)

# From backend/
npm run dev
# OR manually:
node app.js

Start Frontend App

# From frontend/
npm start


#### 📦 Folder Highlights
backend/onnx-model/: Pre-trained NLP model in ONNX format

backend/services/: Python/NLP model integration

backend/controllers/, routes/, middlewares/: REST API logic

frontend/src/: Main React source files

#### 📌 Future Improvements
Improve UI/UX using Tailwind or Material UI

Add voice/text input for real-time stress tracking

Enable user login and personalized dashboards

Graph-based visual feedback (charts for stress trends)

Cloud deployment (Render/Heroku + MongoDB Atlas)

#### 🙌 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.


#### 👨‍💻 Author
Ashwani Katiyar



---


Would you like me to help create a deployment-ready `Dockerfile`, or explain how to host the app (e.g., on Render or Vercel)?


# 🎵 AI Playlist Generator

An AI-powered music playlist generator that analyzes your listening history and recommends personalized songs.

## 🚀 Live Demo
Coming soon...

## ✨ Features
- Fetches your top tracks from Last.fm
- Uses Groq AI (Llama 3) to generate personalized playlist recommendations
- Clean, responsive dark UI
- Real-time AI music suggestions

## 🛠️ Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js + Express
- **Music Data:** Last.fm API
- **AI:** Groq AI (Llama 3)

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/jaishrivijayakumar/AI-playlist-generator.git
cd AI-playlist-generator
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```
LASTFM_API_KEY=your_lastfm_api_key
LASTFM_SECRET=your_lastfm_secret
GROQ_API_KEY=your_groq_api_key
PORT=5000
```

Run the backend:
```bash
node index.js
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm start
```

### 4. Open the app
Go to `http://localhost:3000` in your browser.

## 📸 How It Works
1. Enter your Last.fm username
2. App fetches your top 10 most played tracks
3. Groq AI analyzes your taste and recommends 10 new songs
4. Enjoy your personalized playlist!

## 🔑 API Keys Required
- [Last.fm API](https://www.last.fm/api/account/create) — Free
- [Groq AI](https://console.groq.com) — Free

## 👩‍💻 Author
Made by [jaishrivijayakumar](https://github.com/jaishrivijayakumar)
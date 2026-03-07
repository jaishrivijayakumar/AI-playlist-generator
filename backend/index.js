const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Groq = require('groq-sdk');

const app = express();
const PORT = process.env.PORT || 5000;
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'AI Playlist Generator Backend is running!' });
});

// Last.fm - Get top tracks for a user
app.get('/lastfm/toptracks/:username', async (req, res) => {
  const { username } = req.params;
  const apiKey = process.env.LASTFM_API_KEY;

  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${username}&api_key=${apiKey}&format=json&limit=10`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Last.fm data' });
  }
});

// AI - Generate playlist based on top tracks
app.post('/generate-playlist', async (req, res) => {
  const { tracks } = req.body;

  try {
    const trackList = tracks.map(t => `${t.name} by ${t.artist}`).join(', ');

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `Based on these songs the user loves: ${trackList}. 
          Generate a playlist of 10 new song recommendations they would enjoy. 
          For each song provide: song name, artist, and a one line reason why they'd like it.
          Format as a numbered list.`
        }
      ],
      model: 'llama3-8b-8192',
    });

    res.json({ playlist: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate playlist' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
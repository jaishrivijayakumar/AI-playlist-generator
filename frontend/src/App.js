import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [tracks, setTracks] = useState([]);
  const [playlist, setPlaylist] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const fetchTracks = async () => {
    if (!username) return;
    setLoading(true);
    try {
      const res = await axios.get(`https://ai-playlist-generator-backend.onrender.com/lastfm/toptracks/${username}`);
      setTracks(res.data.toptracks.track);
      setStep(2);
    } catch (error) {
      alert('User not found! Try a different Last.fm username.');
    }
    setLoading(false);
  };

  const generatePlaylist = async () => {
    setLoading(true);
    try {
      // eslint-disable-next-line
      const trackData = tracks.map(t => ({
        name: t.name,
        artist: t.artist.name
      }));
     const res = await axios.post('https://ai-playlist-generator-backend.onrender.com/generate-playlist', {
        tracks: trackData
      });
      setPlaylist(res.data.playlist);
      setStep(3);
    } catch (error) {
      alert('Failed to generate playlist. Try again!');
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>🎵 AI Playlist Generator</h1>
      <p className="subtitle">Powered by Last.fm + Groq AI</p>

      {step === 1 && (
        <div className="card">
          <h2>Enter your Last.fm username</h2>
          <input
            type="text"
            placeholder="e.g. rj"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={fetchTracks} disabled={loading}>
            {loading ? 'Loading...' : 'Get My Top Tracks →'}
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="card">
          <h2>Your Top Tracks 🎧</h2>
          <ul>
            {tracks.map((track, i) => (
              <li key={i}>
                <strong>{track.name}</strong> — {track.artist.name}
              </li>
            ))}
          </ul>
          <button onClick={generatePlaylist} disabled={loading}>
            {loading ? 'Generating...' : '✨ Generate AI Playlist'}
          </button>
          <button className="back" onClick={() => setStep(1)}>← Back</button>
        </div>
      )}

      {step === 3 && (
        <div className="card">
          <h2>Your AI Playlist 🎶</h2>
          <pre>{playlist}</pre>
          <button onClick={() => { setStep(1); setUsername(''); setTracks([]); setPlaylist(''); }}>
            🔄 Start Over
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import './App.css';

function App() {
  const [portfolioData, setPortfolioData] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [projects, setProjects] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const prompt = `Create a professional portfolio for ${name}.\n\nBio:\n${bio}\n\nSkills:\n${skills}\n\nProjects:\n${projects}\n`;

    try {
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ...`,
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt,
          max_tokens: 1500,
        }),
      });

      const data = await response.json();
      setPortfolioData(data.choices[0].text.trim());
    } catch (error) {
      setError('There was an issue generating your portfolio. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>AI Portfolio Builder</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="bio">Bio:</label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
        />

        <label htmlFor="skills">Skills:</label>
        <textarea
          id="skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          required
        />

        <label htmlFor="projects">Projects:</label>
        <textarea
          id="projects"
          value={projects}
          onChange={(e) => setProjects(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Portfolio'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {portfolioData && (
        <div className="portfolio">
          <h2>Your AI-Generated Portfolio</h2>
          <pre>{portfolioData}</pre>
        </div>
      )}
    </div>
  );
}

export default App;

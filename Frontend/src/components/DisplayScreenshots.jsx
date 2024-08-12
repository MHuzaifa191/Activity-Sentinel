import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const DisplayScreenshots = () => {
  const [screenshots, setScreenshots] = useState([]);
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);
  const { username } = useAuth();

  useEffect(() => {
    const fetchScreenshots = async () => {
      if (username) {
        try {
          console.log(`Fetching screenshots for username: ${username}`);
          const response = await axios.get(`http://127.0.0.1:5000/screenshots/${username}`);
          console.log('Response:', response.data);
          setScreenshots(response.data.screenshots);
        } catch (error) {
          console.error('Error fetching screenshots:', error);
        }
      } else {
        console.log('No username found');
      }
    };

    fetchScreenshots();
  }, [username]);

  return (
    <div className="screenshot-container">
      <h1>Available Screenshots</h1>
      <div className="screenshot-list">
        {screenshots.map((screenshot, index) => (
          <button key={index} onClick={() => setSelectedScreenshot(screenshot)}>
            {screenshot}
          </button>
        ))}
      </div>
      {selectedScreenshot && (
        <div className="screenshot-display">
          <h2>Displaying: {selectedScreenshot}</h2>
          <img src={`http://127.0.0.1:5000/screenshots/${username}/${selectedScreenshot}`} alt={selectedScreenshot} />
        </div>
      )}
    </div>
  );
};

export default DisplayScreenshots;

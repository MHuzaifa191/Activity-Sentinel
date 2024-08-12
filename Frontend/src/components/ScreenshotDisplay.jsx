import React from 'react';

const ScreenshotDisplay = ({ screenshot }) => {
  if (!screenshot) {
    return <p>No screenshot selected</p>;
  }

  return (
    <div className="screenshot-display">
      <img src={screenshot} alt="Selected Screenshot" />
    </div>
  );
};

export default ScreenshotDisplay;

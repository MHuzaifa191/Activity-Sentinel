import React from 'react';

const ScreenshotList = ({ screenshots, onSelect }) => {
  return (
    <div className="screenshot-list">
      {screenshots.map((screenshot, index) => (
        <button key={index} onClick={() => onSelect(screenshot)}>
          Screenshot {index + 1}
        </button>
      ))}
    </div>
  );
};

export default ScreenshotList;

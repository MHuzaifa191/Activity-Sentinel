import React from 'react';
import Tesseract from 'tesseract.js';

const ConvertToText = ({ screenshot }) => {
  const handleConvert = () => {
    if (!screenshot) {
      alert('No screenshot selected');
      return;
    }

    Tesseract.recognize(
      screenshot,
      'eng',
      {
        logger: (m) => console.log(m),
      }
    ).then(({ data: { text } }) => {
      const element = document.createElement('a');
      const file = new Blob([text], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = 'screenshot.txt';
      document.body.appendChild(element);
      element.click();
    });
  };

  return (
    <div className="convert-to-text">
      <button onClick={handleConvert}>Convert to Text</button>
    </div>
  );
};

export default ConvertToText;

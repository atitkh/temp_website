import React from 'react';
import './App.css';

// Configuration options - easily customizable
const CONFIG = {
  // Set to 'black' for solid black background, or provide an image URL for background image
  backgroundType: 'black', // Options: 'black' | 'image'
  backgroundImage: '/your-background-image.jpg', // Used when backgroundType is 'image'
  logoSrc: '/logo_square.png',
  companyName: 'BIOCOM'
};

function App() {
  const backgroundStyle = CONFIG.backgroundType === 'image' 
    ? {
        backgroundImage: `url(${CONFIG.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    : {};

  return (
    <div className="App" style={backgroundStyle}>
      <div className="container">
        <div className="logo-container">
          <img src={CONFIG.logoSrc} alt={`${CONFIG.companyName} Logo`} className="logo" />
        </div>
        <div className="text-container">
          <span className="text">More information coming soon</span>
          <span className="dot dot-1">.</span>
          <span className="dot dot-2">.</span>
          <span className="dot dot-3">.</span>
        </div>
      </div>
    </div>
  );
}

export default App;

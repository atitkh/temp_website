import React from 'react';
import { CONFIG } from '../config';

export function InfoPage() {
  const backgroundStyle =
    CONFIG.backgroundType === 'image'
      ? {
          backgroundImage: `url(${CONFIG.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
      : {};

  return (
    <div className="App" style={backgroundStyle}>
      <div className="page-container">
        <div className="logo-container">
          <img src={CONFIG.logoSrc} alt={`${CONFIG.companyName} Logo`} className="logo" />
        </div>
        <div className="page-content">
          <h1>Information</h1>
          <p>More information about BIOCOM coming soon.</p>
          <a href="/" className="back-link">← Back to Home</a>
        </div>
      </div>
    </div>
  );
}

export default InfoPage;

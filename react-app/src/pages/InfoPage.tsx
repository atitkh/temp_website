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

export default InfoPage;

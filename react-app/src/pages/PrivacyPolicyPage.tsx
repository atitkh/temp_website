import React from 'react';
import { CONFIG } from '../config';

export function PrivacyPolicyPage() {
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
          <h1>Privacy Policy</h1>
          <p>Our privacy policy information coming soon.</p>
          <a href="/" className="back-link">← Back to Home</a>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;

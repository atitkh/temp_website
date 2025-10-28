// Global app configuration and constants

export const CONFIG = {
  // Set to 'black' for solid black background, or provide an image URL for background image
  backgroundType: 'black' as 'black' | 'image',
  backgroundImage: '/logo_square.png',
  logoSrc: '/logo_square.png',
  companyName: 'BIOCOM',
};

export const API_ENDPOINTS = {
  contactUs: 'https://biocom.technology/api/contact-us.php',
  pitchDeck: 'https://biocom.technology/api/pitch-deck.php',
};

// reCAPTCHA v3 Site Key (client-side). Fallbacks to Google's test key in dev if env var missing.
export const RECAPTCHA_SITE_KEY: string =
  process.env.REACT_APP_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

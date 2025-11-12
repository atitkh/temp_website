import React, { useState } from 'react';
import { CONFIG } from '../config';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import ContactUsForm from '../components/forms/ContactUsForm';
import PitchDeckForm from '../components/forms/PitchDeckForm';

export function HomePage() {
  const [activeForm, setActiveForm] = useState<'contact' | 'pitchDeck' | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const backgroundStyle =
    CONFIG.backgroundType === 'image'
      ? {
          backgroundImage: `url(${CONFIG.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
      : {};

  const handleFormSuccess = () => {
    setSubmitSuccess(true);
    setTimeout(() => {
      setActiveForm(null);
      setSubmitSuccess(false);
    }, 2000);
  };

  const closeModal = () => {
    setActiveForm(null);
    setSubmitSuccess(false);
  };

  return (
    <>
      <Navbar />
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

        <div className="button-container">
          <button className="contact-button" onClick={() => setActiveForm('contact')}>
            Contact Us
          </button>
          <button
            className="contact-button pitch-deck-button"
            onClick={() => setActiveForm('pitchDeck')}
          >
            Request More Info
          </button>
          </div>
        </div>

      <Modal isOpen={!!activeForm} onClose={closeModal}>
        {submitSuccess ? (
          <div className="success-message">
            <h2>Thank you!</h2>
            <p>
              Your {activeForm === 'contact' ? 'message' : 'info request'} has been sent
              successfully. We'll get back to you soon.
            </p>
            </div>
        ) : (
          <>
            {activeForm === 'contact' && (
              <ContactUsForm onClose={closeModal} onSuccess={handleFormSuccess} />)
            }
            {activeForm === 'pitchDeck' && (
              <PitchDeckForm onClose={closeModal} onSuccess={handleFormSuccess} />)
            }
          </>
        )}
      </Modal>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;




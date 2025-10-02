import React, { useState } from 'react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import './App.css';

// Configuration options - easily customizable
const CONFIG = {
  // Set to 'black' for solid black background, or provide an image URL for background image
  backgroundType: 'black', // Options: 'black' | 'image'
  backgroundImage: '/your-background-image.jpg', // Used when backgroundType is 'image'
  logoSrc: '/logo_square.png',
  companyName: 'BIOCOM'
};

// reCAPTCHA v3 Site Key - Get this from https://www.google.com/recaptcha/admin/create
// Use the "Site Key" (Client Side) for reCAPTCHA v3
const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  reason: string;
  consentMarketing: boolean;
}

interface PitchDeckFormData {
  fullName: string;
  email: string;
  linkedinUrl: string;
  orgName: string;
  orgWebsite: string;
  roleTitle: string;
  useTermsAck: boolean;
}

// Contact Us Form Component
function ContactUsForm({ 
  onClose, 
  onSuccess 
}: { 
  onClose: () => void; 
  onSuccess: () => void; 
}) {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    reason: '',
    consentMarketing: false
  });
  const [formErrors, setFormErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { executeRecaptcha } = useGoogleReCaptcha();

  const roleOptions = ['Founder', 'Investor', 'Partner', 'Press', 'Other'];

  const validateForm = (): boolean => {
    const errors: Partial<ContactFormData> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.reason.trim()) {
      errors.reason = 'Reason is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field when user starts typing
    if (formErrors[name as keyof ContactFormData]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (!executeRecaptcha) {
      console.error('reCAPTCHA not available');
      return;
    }

    setIsSubmitting(true);

    try {
      // Execute reCAPTCHA v3
      const recaptchaToken = await executeRecaptcha('contact_us');
      
      // Submit form data to PHP API
      const response = await fetch('https://biocom.technology/api/contact-us.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
          recaptchaAction: 'contact_us'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Contact form submitted successfully:', result);
      
      onSuccess();
      
    } catch (error) {
      console.error('Form submission error:', error);
      // You could show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h2>Contact Us</h2>
      
      <div className="form-group">
        <label htmlFor="fullName">Full Name *</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          className={formErrors.fullName ? 'error' : ''}
        />
        {formErrors.fullName && <span className="error-message">{formErrors.fullName}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={formErrors.email ? 'error' : ''}
        />
        {formErrors.email && <span className="error-message">{formErrors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className="form-select"
        >
          <option value="">Select a role</option>
          {roleOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="reason">Reason *</label>
        <textarea
          id="reason"
          name="reason"
          rows={4}
          value={formData.reason}
          onChange={handleInputChange}
          className={formErrors.reason ? 'error' : ''}
          placeholder="Please tell us how we can help you..."
        />
        {formErrors.reason && <span className="error-message">{formErrors.reason}</span>}
      </div>

      <div className="form-group checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="consentMarketing"
            checked={formData.consentMarketing}
            onChange={handleInputChange}
          />
          <span>I agree to receive marketing updates</span>
        </label>
      </div>

      <button 
        type="submit" 
        className="submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

// Request Pitch Deck Form Component
function PitchDeckForm({ 
  onClose, 
  onSuccess 
}: { 
  onClose: () => void; 
  onSuccess: () => void; 
}) {
  const [formData, setFormData] = useState<PitchDeckFormData>({
    fullName: '',
    email: '',
    linkedinUrl: '',
    orgName: '',
    orgWebsite: '',
    roleTitle: '',
    useTermsAck: false
  });
  const [formErrors, setFormErrors] = useState<{
    fullName?: string;
    email?: string;
    linkedinUrl?: string;
    orgName?: string;
    orgWebsite?: string;
    roleTitle?: string;
    useTermsAck?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { executeRecaptcha } = useGoogleReCaptcha();

  const validateForm = (): boolean => {
    const errors: {
      fullName?: string;
      email?: string;
      linkedinUrl?: string;
      orgName?: string;
      orgWebsite?: string;
      roleTitle?: string;
      useTermsAck?: string;
    } = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.linkedinUrl.trim()) {
      errors.linkedinUrl = 'LinkedIn URL is required';
    } else if (!/^https?:\/\/.+/.test(formData.linkedinUrl)) {
      errors.linkedinUrl = 'Please enter a valid URL';
    }

    if (!formData.orgName.trim()) {
      errors.orgName = 'Organization name is required';
    }

    if (!formData.orgWebsite.trim()) {
      errors.orgWebsite = 'Organization website is required';
    } else if (!/^https?:\/\/.+/.test(formData.orgWebsite)) {
      errors.orgWebsite = 'Please enter a valid URL';
    }

    if (!formData.roleTitle.trim()) {
      errors.roleTitle = 'Role title is required';
    }

    if (!formData.useTermsAck) {
      errors.useTermsAck = 'You must acknowledge the confidentiality terms';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (!executeRecaptcha) {
      console.error('reCAPTCHA not available');
      return;
    }

    setIsSubmitting(true);

    try {
      // Execute reCAPTCHA v3
      const recaptchaToken = await executeRecaptcha('pitch_deck_request');
      
      // Submit form data to PHP API
      const response = await fetch('https://biocom.technology/api/pitch-deck.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
          recaptchaAction: 'pitch_deck_request'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Pitch deck request submitted successfully:', result);
      
      onSuccess();
      
    } catch (error) {
      console.error('Form submission error:', error);
      // You could show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h2>Request Pitch Deck</h2>
      
      <div className="form-group">
        <label htmlFor="fullName">Full Name *</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          className={formErrors.fullName ? 'error' : ''}
        />
        {formErrors.fullName && <span className="error-message">{formErrors.fullName}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={formErrors.email ? 'error' : ''}
        />
        {formErrors.email && <span className="error-message">{formErrors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="linkedinUrl">LinkedIn URL *</label>
        <input
          type="url"
          id="linkedinUrl"
          name="linkedinUrl"
          value={formData.linkedinUrl}
          onChange={handleInputChange}
          className={formErrors.linkedinUrl ? 'error' : ''}
          placeholder="https://linkedin.com/in/your-profile"
        />
        {formErrors.linkedinUrl && <span className="error-message">{formErrors.linkedinUrl}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="orgName">Organization Name *</label>
        <input
          type="text"
          id="orgName"
          name="orgName"
          value={formData.orgName}
          onChange={handleInputChange}
          className={formErrors.orgName ? 'error' : ''}
        />
        {formErrors.orgName && <span className="error-message">{formErrors.orgName}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="orgWebsite">Organization Website *</label>
        <input
          type="url"
          id="orgWebsite"
          name="orgWebsite"
          value={formData.orgWebsite}
          onChange={handleInputChange}
          className={formErrors.orgWebsite ? 'error' : ''}
          placeholder="https://your-organization.com"
        />
        {formErrors.orgWebsite && <span className="error-message">{formErrors.orgWebsite}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="roleTitle">Role Title *</label>
        <input
          type="text"
          id="roleTitle"
          name="roleTitle"
          value={formData.roleTitle}
          onChange={handleInputChange}
          className={formErrors.roleTitle ? 'error' : ''}
          placeholder="e.g. Managing Partner, Investment Director"
        />
        {formErrors.roleTitle && <span className="error-message">{formErrors.roleTitle}</span>}
      </div>

      <div className="form-group checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="useTermsAck"
            checked={formData.useTermsAck}
            onChange={handleInputChange}
            className={formErrors.useTermsAck ? 'error' : ''}
          />
          <span>I understand all materials are confidential; I agree not to redistribute without consent *</span>
        </label>
        {formErrors.useTermsAck && <span className="error-message">{formErrors.useTermsAck}</span>}
      </div>

      <button 
        type="submit" 
        className="submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Request Pitch Deck'}
      </button>
    </form>
  );
}

// Main App Component
function App() {
  const [activeForm, setActiveForm] = useState<'contact' | 'pitchDeck' | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const backgroundStyle = CONFIG.backgroundType === 'image' 
    ? {
        backgroundImage: `url(${CONFIG.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    : {};

  const handleFormSuccess = () => {
    setSubmitSuccess(true);
    
    // Reset form after 2 seconds
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
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
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
            <button 
              className="contact-button"
              onClick={() => setActiveForm('contact')}
            >
              Contact Us
            </button>
            <button 
              className="contact-button pitch-deck-button"
              onClick={() => setActiveForm('pitchDeck')}
            >
              Request Pitch Deck
            </button>
          </div>
        </div>

        {/* Form Modal */}
        {activeForm && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>×</button>
              
              {submitSuccess ? (
                <div className="success-message">
                  <h2>Thank you!</h2>
                  <p>Your {activeForm === 'contact' ? 'message' : 'pitch deck request'} has been sent successfully. We'll get back to you soon.</p>
                </div>
              ) : (
                <>
                  {activeForm === 'contact' && (
                    <ContactUsForm 
                      onClose={closeModal}
                      onSuccess={handleFormSuccess}
                    />
                  )}
                  {activeForm === 'pitchDeck' && (
                    <PitchDeckForm 
                      onClose={closeModal}
                      onSuccess={handleFormSuccess}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </GoogleReCaptchaProvider>
  );
}

export default App;

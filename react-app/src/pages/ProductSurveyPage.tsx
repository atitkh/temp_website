import React, { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { CONFIG } from '../config';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { submitProductSurvey } from '../services/api';

interface ProductSurveyFormData {
  email: string;
  xrExpectations: string;
  xrExpectationsOther: string;
  aimlIssues: string[];
  aimlIssuesOther: string;
  bciPotential: string;
  bciPotentialOther: string;
  xrComplaints: string;
  furtherInterest: string;
  furtherInterestOther: string;
}

export function ProductSurveyPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ProductSurveyFormData>({
    email: '',
    xrExpectations: '',
    xrExpectationsOther: '',
    aimlIssues: [],
    aimlIssuesOther: '',
    bciPotential: '',
    bciPotentialOther: '',
    xrComplaints: '',
    furtherInterest: '',
    furtherInterestOther: ''
  });
  
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    xrExpectations?: string;
    bciPotential?: string;
    furtherInterest?: string;
  }>({});
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const backgroundStyle =
    CONFIG.backgroundType === 'image'
      ? {
          backgroundImage: `url(${CONFIG.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
      : {};

  const validateForm = (): boolean => {
    const errors: typeof formErrors = {};

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.xrExpectations.trim()) {
      errors.xrExpectations = 'Please select an option';
    }

    if (!formData.bciPotential.trim()) {
      errors.bciPotential = 'Please select an option';
    }

    if (!formData.furtherInterest.trim()) {
      errors.furtherInterest = 'Please select an option';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      const checkboxValue = (e.target as HTMLInputElement).value;
      
      if (name === 'aimlIssues') {
        setFormData(prev => ({
          ...prev,
          aimlIssues: checked 
            ? [...prev.aimlIssues, checkboxValue]
            : prev.aimlIssues.filter(item => item !== checkboxValue)
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (!executeRecaptcha) {
      console.error('reCAPTCHA not available');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const recaptchaToken = await executeRecaptcha('product_survey');
      
      const result = await submitProductSurvey(formData, recaptchaToken);
      console.log('Product survey submitted successfully:', result);
      setIsSubmitted(true);
      
    } catch (err) {
      console.error('Form submission error:', err);
      try {
        window.alert('Submission failed. Please try again later.');
      } catch (_) {}
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="App" style={backgroundStyle}>
          <div className="page-content survey-page">
            {isSubmitted ? (
              <div className="success-message">
                <h1>Thank You!</h1>
                <p>Your survey has been submitted successfully. We appreciate your feedback!</p>
                <button 
                  className="submit-button" 
                  onClick={() => setIsSubmitted(false)}
                >
                  Submit Another Response
                </button>
              </div>
            ) : (
              <>
                <h1>BIOCOM Product Survey</h1>
                <div className="">
                  <p>
                    BIOCOM is a technology company focused on developing advanced human-machine interface (HMI) solutions. 
                    The company specializes in brain-computer interfaces, augmented reality, and bio-digital integration technologies.
                  </p>
                  <p className="">
                    <strong>We want to hear about YOUR technological complaints with modern XR</strong>
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="survey-form-page">
                  {/* Email */}
                  <div className="form-group">
                    <label htmlFor="email">Please provide your email before answering *</label>
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

                  {/* XR Expectations */}
                  <div className="form-group">
                    <label>Do you think XR hardware is up to par with your expectations? *</label>
                    <div className="radio-group">
                      {[
                        'Yes, it does everything I could ask for',
                        'Yes',
                        'No',
                        'Definitely Not',
                        'Other'
                      ].map(option => (
                        <label key={option} className="radio-label">
                          <input
                            type="radio"
                            name="xrExpectations"
                            value={option}
                            checked={formData.xrExpectations === option}
                            onChange={handleInputChange}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                    {formData.xrExpectations === 'Other' && (
                      <input
                        type="text"
                        name="xrExpectationsOther"
                        value={formData.xrExpectationsOther}
                        onChange={handleInputChange}
                        placeholder="Please specify..."
                        className="other-input"
                      />
                    )}
                    {formErrors.xrExpectations && <span className="error-message">{formErrors.xrExpectations}</span>}
                  </div>

                  {/* AI/ML Issues */}
                  <div className="form-group">
                    <label>Do you use AI/ML in your XR development? If so which of the following issues do you experience</label>
                    <div className="checkbox-group">
                      {[
                        'High latency',
                        'Incompatibility/Struggle to connect to cloud services',
                        'Device Limitations (Battery life, Processing Power, Comfort, etc)',
                        'Vulnerability to Cyberattacks',
                        'I do not use AI/ML in a XR setting',
                        'Other'
                      ].map(option => (
                        <label key={option} className="checkbox-label">
                          <input
                            type="checkbox"
                            name="aimlIssues"
                            value={option}
                            checked={formData.aimlIssues.includes(option)}
                            onChange={handleInputChange}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                    {formData.aimlIssues.includes('Other') && (
                      <input
                        type="text"
                        name="aimlIssuesOther"
                        value={formData.aimlIssuesOther}
                        onChange={handleInputChange}
                        placeholder="Please specify..."
                        className="other-input"
                      />
                    )}
                  </div>

                  {/* BCI Potential */}
                  <div className="form-group">
                    <label>Do you see potential for BCI integration with XR? *</label>
                    <div className="radio-group">
                      {[
                        'Yes, it will change the world',
                        'Yes, I see the potential',
                        'No, its application is too niche',
                        'No, it is worthless',
                        'Other'
                      ].map(option => (
                        <label key={option} className="radio-label">
                          <input
                            type="radio"
                            name="bciPotential"
                            value={option}
                            checked={formData.bciPotential === option}
                            onChange={handleInputChange}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                    {formData.bciPotential === 'Other' && (
                      <input
                        type="text"
                        name="bciPotentialOther"
                        value={formData.bciPotentialOther}
                        onChange={handleInputChange}
                        placeholder="Please specify..."
                        className="other-input"
                      />
                    )}
                    {formErrors.bciPotential && <span className="error-message">{formErrors.bciPotential}</span>}
                  </div>

                  {/* XR Complaints */}
                  <div className="form-group">
                    <label htmlFor="xrComplaints">What complaints do you have with current XR hardware?</label>
                    <textarea
                      id="xrComplaints"
                      name="xrComplaints"
                      rows={4}
                      value={formData.xrComplaints}
                      onChange={handleInputChange}
                      placeholder="Please share your thoughts on current XR hardware limitations..."
                    />
                  </div>

                  {/* Further Interest */}
                  <div className="form-group">
                    <label>Please let us know if you would be interested in speaking further with us. *</label>
                    <div className="radio-group">
                      {['Yes', 'No', 'Other'].map(option => (
                        <label key={option} className="radio-label">
                          <input
                            type="radio"
                            name="furtherInterest"
                            value={option}
                            checked={formData.furtherInterest === option}
                            onChange={handleInputChange}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                    {formData.furtherInterest === 'Other' && (
                      <input
                        type="text"
                        name="furtherInterestOther"
                        value={formData.furtherInterestOther}
                        onChange={handleInputChange}
                        placeholder="Please specify..."
                        className="other-input"
                      />
                    )}
                    {formErrors.furtherInterest && <span className="error-message">{formErrors.furtherInterest}</span>}
                  </div>

                  <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      <Footer />
    </>
  );
}

export default ProductSurveyPage;
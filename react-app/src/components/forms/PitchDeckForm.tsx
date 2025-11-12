import React, { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { PitchDeckFormData } from '../../types/forms';
import { submitPitchDeck } from '../../services/api';

export interface PitchDeckFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function PitchDeckForm({ onClose, onSuccess }: PitchDeckFormProps) {
  const [formData, setFormData] = useState<PitchDeckFormData>({
    fullName: '',
    email: '',
    linkedinUrl: '',
    orgName: '',
    orgWebsite: '',
    roleTitle: '',
    useTermsAck: false,
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

    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';

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

    if (!formData.orgName.trim()) errors.orgName = 'Organization name is required';

    if (!formData.orgWebsite.trim()) {
      errors.orgWebsite = 'Organization website is required';
    } else if (!/^https?:\/\/.+/.test(formData.orgWebsite)) {
      errors.orgWebsite = 'Please enter a valid URL';
    }

    if (!formData.roleTitle.trim()) errors.roleTitle = 'Role title is required';

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
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
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
      const recaptchaToken = await executeRecaptcha('pitch_deck_request');
      await submitPitchDeck(formData, recaptchaToken);
      onSuccess();
    } catch (err) {
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h2>Request More Info</h2>

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
          <span>
            I understand all materials are confidential; I agree not to redistribute without consent *
          </span>
        </label>
        {formErrors.useTermsAck && <span className="error-message">{formErrors.useTermsAck}</span>}
      </div>

      <button type="submit" className="submit-button" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Request More Info'}
      </button>
    </form>
  );
}

export default PitchDeckForm;

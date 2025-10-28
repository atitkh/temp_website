import React, { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { ContactFormData } from '../../types/forms';
import { submitContactUs } from '../../services/api';

export interface ContactUsFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const roleOptions = ['Founder', 'Investor', 'Partner', 'Press', 'Other'];

export function ContactUsForm({ onClose, onSuccess }: ContactUsFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    reason: '',
    consentMarketing: false,
  });
  const [formErrors, setFormErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const validateForm = (): boolean => {
    const errors: Partial<ContactFormData> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.reason.trim()) errors.reason = 'Reason is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (formErrors[name as keyof ContactFormData]) {
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
      const recaptchaToken = await executeRecaptcha('contact_us');
      await submitContactUs(formData, recaptchaToken);
      onSuccess();
    } catch (err) {
      console.error('Form submission error:', err);
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
        {formErrors.fullName && (
          <span className="error-message">{formErrors.fullName}</span>
        )}
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
        {formErrors.email && (
          <span className="error-message">{formErrors.email}</span>
        )}
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
          {roleOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
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
        {formErrors.reason && (
          <span className="error-message">{formErrors.reason}</span>
        )}
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

      <button type="submit" className="submit-button" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

export default ContactUsForm;
import { API_ENDPOINTS } from '../config';
import { ContactFormData, PitchDeckFormData, ProductSurveyFormData } from '../types/forms';

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export function submitContactUs(
  data: ContactFormData,
  recaptchaToken: string
): Promise<unknown> {
  return postJson(API_ENDPOINTS.contactUs, {
    ...data,
    recaptchaToken,
    recaptchaAction: 'contact_us',
  });
}

export function submitPitchDeck(
  data: PitchDeckFormData,
  recaptchaToken: string
): Promise<unknown> {
  return postJson(API_ENDPOINTS.pitchDeck, {
    ...data,
    recaptchaToken,
    recaptchaAction: 'pitch_deck_request',
  });
}

export function submitProductSurvey(
  data: ProductSurveyFormData,
  recaptchaToken: string
): Promise<unknown> {
  return postJson(API_ENDPOINTS.productSurvey, {
    ...data,
    recaptchaToken,
    recaptchaAction: 'product_survey',
  });
}

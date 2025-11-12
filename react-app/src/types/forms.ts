export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  reason: string;
  consentMarketing: boolean;
}

export interface PitchDeckFormData {
  fullName: string;
  email: string;
  linkedinUrl: string;
  orgName: string;
  orgWebsite: string;
  roleTitle: string;
  useTermsAck: boolean;
}

export interface ProductSurveyFormData {
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

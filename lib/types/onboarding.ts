export interface OnboardingData {
  // Step 1: Name & credentials
  photo?: string;
  fullName: string;
  credentialType: string[];
  additionalCertifications: string;

  // Step 2: Location
  practiceLocation: string;
  serviceRadius: string;
  birthSettings: string[];

  // Step 3: Tagline
  tagline: string;

  // Step 4: Approach
  philosophy: string;
  specialties: string[];

  // Step 5: Values
  values: string[];

  // Step 6: Pricing
  feeMin: string;
  feeMax: string;
  whatsIncluded: string[];
  paymentOptions: string[];
  insurancePlans: string;
  acceptingDueMonths: string[];

  // Step 7: Mirror intake
  careStyle: string;
  communicationVibe: string;
  focusDescription: string;
  transferApproach: string;
  preferredContact: string;
  educationStyle: string;
  scopeComfort: string[];
  partnerInvolvement: string;

  // Step 8: Verification
  identityVerified: boolean;
  licenseVerified: boolean;
  practiceVerified: boolean;
  pullReviews: boolean;
}

export const INITIAL_ONBOARDING_DATA: OnboardingData = {
  fullName: "",
  credentialType: [],
  additionalCertifications: "",
  practiceLocation: "",
  serviceRadius: "",
  birthSettings: [],
  tagline: "",
  philosophy: "",
  specialties: [],
  values: [],
  feeMin: "",
  feeMax: "",
  whatsIncluded: [],
  paymentOptions: [],
  insurancePlans: "",
  acceptingDueMonths: [],
  careStyle: "",
  communicationVibe: "",
  focusDescription: "",
  transferApproach: "",
  preferredContact: "",
  educationStyle: "",
  scopeComfort: [],
  partnerInvolvement: "",
  identityVerified: false,
  licenseVerified: false,
  practiceVerified: false,
  pullReviews: false,
};

export const CREDENTIAL_OPTIONS = ["CNM", "CPM", "LM", "CM", "Doula", "Other"];

export const SPECIALTY_OPTIONS = [
  "VBAC",
  "Water birth",
  "Multiples",
  "First-time parents",
  "Breech",
  "Postpartum focus",
  "High-risk support",
];

export const VALUES_OPTIONS = [
  "Evidence-focused",
  "Trauma-informed",
  "LGBTQ+ affirming",
  "Faith-friendly",
  "Culturally responsive",
  "Spanish-speaking",
  "Bilingual",
  "Holistic",
];

export const BIRTH_SETTING_OPTIONS = ["Home birth", "Birth center", "Hospital"];

export const RADIUS_OPTIONS = ["5", "10", "15", "20", "30"];

export const WHATS_INCLUDED_OPTIONS = [
  "Prenatal visits",
  "Labor + delivery",
  "Postpartum visits",
  "24/7 on-call",
  "Birth supplies",
  "Newborn exam",
];

export const PAYMENT_OPTIONS = [
  "Insurance billing",
  "Self-pay",
  "Payment plans",
  "Sliding scale",
  "Medicaid",
  "HSA/FSA",
];

export const DUE_MONTH_OPTIONS = [
  "Apr 2026", "May 2026", "Jun 2026", "Jul 2026",
  "Aug 2026", "Sep 2026", "Oct 2026", "Nov 2026",
  "Dec 2026", "Jan 2027", "Feb 2027", "Mar 2027",
];

export const CARE_STYLE_OPTIONS = [
  { id: "hands-off", label: "Hands-off" },
  { id: "balanced", label: "Balanced" },
  { id: "guided", label: "Guided" },
];

export const COMMUNICATION_VIBE_OPTIONS = [
  { id: "direct", label: "Direct" },
  { id: "gentle", label: "Gentle" },
  { id: "educational", label: "Educational" },
  { id: "minimal", label: "Minimal" },
];

export const FOCUS_OPTIONS = [
  { id: "calm", label: "Calm reassurance" },
  { id: "evidence", label: "Evidence-based" },
  { id: "advocacy", label: "Advocacy" },
  { id: "holistic", label: "Holistic" },
];

export const TRANSFER_OPTIONS = [
  { id: "hospital-agreements", label: "Hospital agreements" },
  { id: "backup-ob", label: "Backup OB" },
  { id: "case-by-case", label: "Case-by-case" },
];

export const CONTACT_OPTIONS = [
  { id: "text", label: "Text" },
  { id: "email", label: "Email" },
  { id: "portal", label: "Portal" },
  { id: "phone", label: "Phone" },
];

export const EDUCATION_STYLE_OPTIONS = [
  { id: "hands-on", label: "Hands-on coaching" },
  { id: "resource-sharing", label: "Resource sharing" },
  { id: "on-request", label: "On-request only" },
];

export const SCOPE_COMFORT_OPTIONS = [
  "First-time parents",
  "VBAC",
  "Multiples",
  "Breech",
  "Higher-risk pregnancies",
  "Postpartum-only",
];

export const PARTNER_OPTIONS = [
  { id: "included", label: "Actively included" },
  { id: "parent-focused", label: "Welcome but parent-focused" },
  { id: "flexible", label: "Flexible" },
];

export const ONBOARDING_STEPS = [
  { id: 1, title: "First things first — what should we call you?" },
  { id: 2, title: "Where do you practice?" },
  { id: 3, title: "In one sentence, what makes you you?" },
  { id: 4, title: "How would you describe your approach?" },
  { id: 5, title: "Any values you want to lead with?" },
  { id: 6, title: "What do you charge?" },
  { id: 7, title: "Time to set up matching" },
  { id: 8, title: "One last thing — verification" },
];

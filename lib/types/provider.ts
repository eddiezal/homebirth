export interface Provider {
  id: string;
  name: string;
  credentials: string;
  location: string;
  distance: number;
  yearsExperience: number;
  birthsAttended: string;
  philosophy: string;
  priceRange: string;
  responseTime: string;
  matchScore: number;
  matchReasons: string[];
  tags: string[];
  acceptingClients: boolean;
  photo?: string;
  birthSettings: string[];
  languages: string[];
  insuranceAccepted: string[];
  slidingScale: boolean;
}

export interface ProviderReview {
  id: string;
  source: "google" | "yelp" | "facebook";
  author: string;
  rating: number;
  date: string;
  text: string;
}

export interface ProviderVerification {
  type: "identity" | "license" | "practice";
  verified: boolean;
  verifiedDate?: string;
  detail?: string;
}

export interface RatingBreakdown {
  source: "google" | "yelp" | "facebook";
  rating: number;
  count: number;
}

export interface Education {
  institution: string;
  degree: string;
  year: number;
}

export interface ProviderProfile extends Provider {
  specialties: string[];
  scope: string[];
  transferPlan: string;
  communicationTags: string[];
  education: Education[];
  verifications: ProviderVerification[];
  reviews: ProviderReview[];
  aggregateRating: number;
  reviewCount: number;
  ratingBreakdown: RatingBreakdown[];
  sentimentTags: string[];
  whatsIncluded: string[];
  paymentNotes: string;
}

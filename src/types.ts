export interface ServiceExperience {
  id: string;
  name: string;
  category: "smile" | "dermal" | "restorative";
  tagline: string;
  description: string;
  duration: string;
  comfortLevel: string; // e.g. "Excellent (Virtually Painless)", "Very High (Gentle sedation available)"
  longevity: string; // e.g. "10-15 Years", "6-12 Months", "Permanent with Proper Care"
  features: string[];
  image: string;
  faqs: { question: string; answer: string }[];
}

export interface Clinician {
  id: string;
  name: string;
  title: string;
  photo: string;
  credentials: string[];
  bio: string;
  philosophy: string;
  services: string[];
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string[]; // multi-paragraph body
  readTime: string;
  date: string;
  image: string;
  author: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  subtitle?: string;
  options: {
    label: string;
    description?: string;
    value: string;
    icon?: string; // Lucide icon identifier
  }[];
}

export interface AppointmentRequest {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  concernCategory: "smile" | "dermal" | "restorative" | string;
  clinicianId: string;
  date: string;
  timeSlot: string;
  specialNotes?: string;
  status: "pending" | "confirmed";
}

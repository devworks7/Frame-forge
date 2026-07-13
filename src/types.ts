export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Commercial' | 'Corporate' | 'YouTube' | 'Motion Graphics' | 'VFX' | 'Reels' | '3D' | 'Short Films';
  description: string;
  clientName?: string;
  date: string;
  softwareUsed: string[];
  duration: string;
  tags: string[];
  videoUrl: string; // Endpoint or cloud/local URL
  thumbnail: string;
  order: number;
}

export interface PDFDoc {
  id: string;
  title: string;
  category: 'Quotation' | 'Price List' | 'Package' | 'Brochure' | 'Company Profile';
  description: string;
  fileUrl: string;
  fileName: string;
  downloadsAllowed: boolean;
  order: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  company?: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
  order: number;
}

export interface ClientRequest {
  id: string;
  fullName: string;
  organizationName?: string;
  email: string;
  phoneNumber: string;
  country: string;
  city: string;
  projectType: string;
  purpose: string;
  budget: string;
  deadline: string;
  hearFrom: string;
  description: string;
  referenceLinks?: string;
  fileUrl?: string;
  fileName?: string;
  status: 'new' | 'in_progress' | 'completed' | 'rejected';
  createdAt: string;
}

export interface Analytics {
  totalVisitors: number;
  projectRequests: number;
  emailsReceived: number;
  videoViews: number;
  pdfViews: number;
}

export interface RecentActivity {
  id: string;
  type: 'visit' | 'request' | 'video_view' | 'pdf_view' | 'email';
  description: string;
  timestamp: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  badge: string;
  desc: string; // Short description
  fullDescription: string; // Small 50 words description that pops up
  iconName: 'Film' | 'Layers' | 'Sparkles' | 'Boxes' | 'Target' | 'Palette' | string;
  order: number;
}

export interface SectionContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutQuote?: string;
  aboutText: string;
  aboutStats: { label: string; value: string }[];
  contactEmail: string;
  contactPhone: string;
  contactWhatsapp: string;
  contactInstagram: string;
  contactLinkedIn: string;
  contactLocation: string;
  contactBusinessHours: string;
  logoUrl?: string;
}

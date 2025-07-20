export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: 'featured' | 'personal' | 'aialchemist' | 'vasiliades';
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Certificate {
  id: string;
  title: string;
  organization: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  imageUrl?: string;
  skills: string[];
  verified: boolean;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  imageUrl?: string;
  linkedinUrl?: string;
  featured: boolean;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
  publishedAt?: string;
  readTime: number;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  color: string;
}

export interface Settings {
  theme: 'developer' | 'entrepreneur';
  matrixRain: boolean;
  animations: boolean;
  soundEffects: boolean;
}

export interface PersonalInfo {
  name: string;
  alias: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location: string;
  website: string;
  imageUrl?: string;
  resumeUrl?: string;
  socials: SocialLink[];
}
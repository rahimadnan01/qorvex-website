export interface Service {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  iconMesh: 'cube' | 'knot' | 'sphere' | 'wireframe' | 'particle';
  techStack: string[];
  deliverables: string[];
  order: number;
  featured?: boolean;
}

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  pillar: 'Core' | 'Vision' | 'Execution';
  bio: string;
  philosophy: string;
  photoUrl: string;
  socials: {
    linkedin?: string;
    email?: string;
    github?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  order: number;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  client: string;
  category: string;
  summary: string;
  problem: string;
  approach: string;
  result: string;
  metrics: ProjectMetric[];
  imageUrl: string;
  tags: string[];
  liveUrl?: string;
  featured?: boolean;
  order: number;
}

export interface Testimonial {
  _id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  logoUrl?: string;
  avatarUrl?: string;
  order: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  projectTypes: string[];
  budgetRange: string;
  message: string;
}

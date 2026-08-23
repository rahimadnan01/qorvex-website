import { Service, TeamMember, Project, Testimonial, ContactFormData } from '../types';

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || '/api';

// Default fallbacks in case API server is starting or disconnected
const fallbackServices: Service[] = [
  {
    _id: 'srv_1',
    title: 'Software Development & Architecture',
    slug: 'software-development',
    shortDescription: 'Custom web applications, microservices, and WebGL-powered spatial interfaces built for enterprise scale.',
    fullDescription: 'We architect ultra-fast, resilient web systems and custom enterprise applications using Next.js, WebGL, and scalable cloud architectures.',
    iconMesh: 'cube',
    techStack: ['React', 'Next.js', 'Node.js', 'TypeScript', 'WebGL', 'GraphQL', 'AWS'],
    deliverables: ['Custom Web Apps', 'REST/GraphQL APIs', 'WebGL 3D Engines', 'Performance Audits'],
    order: 1,
    featured: true
  },
  {
    _id: 'srv_2',
    title: 'UI/UX & Interactive Product Design',
    slug: 'ui-ux-design',
    shortDescription: 'Cinematic digital experience design, motion design, design systems, and spatial interfaces.',
    fullDescription: 'Every pixel is crafted with mathematical precision, fluid micro-interactions, dark-mode-first aesthetics, and scalable design token systems.',
    iconMesh: 'knot',
    techStack: ['Figma', 'GSAP', 'Framer Motion', 'Three.js', 'Tailwind CSS'],
    deliverables: ['Product Interface Design', 'Design Token Systems', '3D Prototypes', 'Motion Guidelines'],
    order: 2,
    featured: true
  },
  {
    _id: 'srv_3',
    title: 'SEO & Growth Engineering',
    slug: 'seo-growth',
    shortDescription: 'Technical SEO, programmatic content engines, Lighthouse 95+ performance optimization, and search dominance.',
    fullDescription: 'We fix indexing latency, structure rich schemas, build programmatic SEO pipelines, and tune Core Web Vitals for organic search dominance.',
    iconMesh: 'sphere',
    techStack: ['Programmatic SEO', 'Lighthouse Optimization', 'JSON-LD Schema', 'Analytics'],
    deliverables: ['Technical SEO Audits', 'Programmatic Pages Engine', 'Speed Optimization', 'Schema Markup'],
    order: 3,
    featured: true
  },
  {
    _id: 'srv_4',
    title: 'AI Workflows & Intelligent Agents',
    slug: 'ai-ml-integration',
    shortDescription: 'Custom LLM integrations, retrieval-augmented search (RAG), and agentic workflow automation.',
    fullDescription: 'Integrate state-of-the-art AI models into your core business product. From fine-tuned LLM agents to intelligent vector search.',
    iconMesh: 'wireframe',
    techStack: ['Python', 'LangChain', 'OpenAI API', 'Vector DBs', 'Node.js'],
    deliverables: ['Custom LLM Integration', 'Autonomous Agents', 'Semantic Search', 'Automated Pipelines'],
    order: 4,
    featured: true
  }
];

const fallbackTeam: TeamMember[] = [
  {
    _id: 'tm_1',
    name: 'Alexander Vance',
    role: 'Co-Founder & Tech Lead',
    pillar: 'Core',
    bio: 'Ex-Senior Systems Architect with 10+ years scaling cloud platforms and real-time WebGL engines.',
    philosophy: 'Code is applied mathematics — keep it clean, deterministic, and blindingly fast.',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    socials: { github: 'https://github.com', linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
    order: 1
  },
  {
    _id: 'tm_2',
    name: 'Elena Rostova',
    role: 'Co-Founder & Design Director',
    pillar: 'Vision',
    bio: 'Awwwards Site of the Year nominee, specialized in spatial UI, kinetic typography, and motion design.',
    philosophy: 'Design is not how it looks — design is how it moves and makes the user feel.',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800',
    socials: { github: 'https://github.com', linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
    order: 2
  },
  {
    _id: 'tm_3',
    name: 'Marcus Chen',
    role: 'Co-Founder & SEO / Growth Lead',
    pillar: 'Execution',
    bio: 'Pioneered programmatic SEO workflows that drove over $120M in client enterprise valuations.',
    philosophy: 'Traffic is vanity, conversion is sanity, and speed is the foundation of both.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    socials: { github: 'https://github.com', linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
    order: 3
  }
];

const fallbackProjects: Project[] = [
  {
    _id: 'proj_1',
    title: 'QuantumPay Spatial Engine',
    slug: 'quantumpay-spatial-engine',
    client: 'QuantumPay Global',
    category: 'Software & Web UI',
    summary: 'Next-generation fintech dashboard with real-time WebGL transaction topology and sub-10ms query speeds.',
    problem: 'QuantumPay needed to present high-frequency transaction volume to institutional investors without cluttering the screen or lagging during peak traffic.',
    approach: 'We built a custom React Three Fiber visual node graph integrated with WebSockets, delivering real-time telemetry rendering at 60 FPS.',
    result: 'User engagement increased by 310%, securing $45M Series B funding within 3 months of launch.',
    metrics: [
      { label: 'Render Latency', value: '< 8ms' },
      { label: 'User Engagement', value: '+310%' },
      { label: 'Series B Raised', value: '$45M' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
    tags: ['Next.js', 'Three.js', 'WebSockets', 'Tailwind'],
    liveUrl: 'https://example.com',
    featured: true,
    order: 1
  },
  {
    _id: 'proj_2',
    title: 'Astra OS Spatial Design System',
    slug: 'astra-os-design-system',
    client: 'Astra Technologies',
    category: 'UI/UX Design',
    summary: 'Dark-mode glassmorphic component ecosystem for next-gen autonomous robotics control software.',
    problem: 'Control room operators struggled with visually chaotic interfaces across multi-monitor hardware stations.',
    approach: 'Created an ergonomic spatial design system using glowing focal indicators, contrast hierarchy, and micro-motion feedback.',
    result: 'Reduced operator error rates by 74% and accelerated onboarding time for telemetry pilots.',
    metrics: [
      { label: 'Operator Error Reduction', value: '-74%' },
      { label: 'Component Reusability', value: '98%' },
      { label: 'Design Tokens', value: '450+' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=1200',
    tags: ['Design System', 'Figma', 'React', 'Framer Motion'],
    liveUrl: 'https://example.com',
    featured: true,
    order: 2
  },
  {
    _id: 'proj_3',
    title: 'Nexus SEO Programmatic Engine',
    slug: 'nexus-seo-engine',
    client: 'Nexus Cloud',
    category: 'SEO & Growth',
    summary: 'Programmatic SEO infrastructure auto-generating 12,000+ indexed cloud comparisons with sub-second page loads.',
    problem: 'SaaS organic growth was stagnant due to manual blog creation and slow SSR hydration times.',
    approach: 'Engineered an edge-cached Next.js programmatic content pipeline with dynamic JSON-LD markup and automated sitemap indexing.',
    result: 'Achieved 4.2M monthly organic impressions and #1 rank for 85+ high-intent competitive keywords.',
    metrics: [
      { label: 'Monthly Organic Traffic', value: '4.2M' },
      { label: 'Top 3 Keyword Ranks', value: '85+' },
      { label: 'Page Load Speed', value: '0.4s' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    tags: ['Programmatic SEO', 'Next.js', 'Core Web Vitals', 'Edge Storage'],
    liveUrl: 'https://example.com',
    featured: true,
    order: 3
  },
  {
    _id: 'proj_4',
    title: 'CyberPulse AI Security Platform',
    slug: 'cyberpulse-ai-security',
    client: 'CyberPulse',
    category: 'Software & AI',
    summary: 'Intelligent security monitor blending LLM alert summaries with interactive 3D attack surface maps.',
    problem: 'Security analysts were overwhelmed by thousands of false-positive log alerts every hour.',
    approach: 'Deployed an AI pipeline that synthesizes logs into structured incident vectors with a dynamic 3D threat map.',
    result: 'Mean Time to Resolution (MTTR) dropped from 4 hours to 6 minutes.',
    metrics: [
      { label: 'MTTR Reduction', value: '97.5%' },
      { label: 'False Positive Filter', value: '99.1%' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200',
    tags: ['AI/ML', 'React Three Fiber', 'Node.js', 'Tailwind'],
    liveUrl: 'https://example.com',
    featured: true,
    order: 4
  }
];

const fallbackTestimonials: Testimonial[] = [
  {
    _id: 'tst_1',
    quote: 'Qorvex built our flagship WebGL platform in record time. Their motion standards and architectural precision are unmatched.',
    author: 'David Sterling',
    title: 'CTO & Co-Founder',
    company: 'QuantumPay Global',
    order: 1
  },
  {
    _id: 'tst_2',
    quote: 'Working with Qorvex felt like hiring a top 0.1% studio. They transformed our SEO engine and multiplied our organic traffic 4x.',
    author: 'Sarah Lin',
    title: 'VP of Growth',
    company: 'Nexus Cloud Systems',
    order: 2
  },
  {
    _id: 'tst_3',
    quote: 'The visual aesthetics and engineering polish Qorvex delivered helped us close our $45M Series B. Exceptional team.',
    author: 'Marcus Vance',
    title: 'Managing Partner',
    company: 'Vance Capital Studio',
    order: 3
  }
];

// Helper fetch wrapper
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}, fallback?: T): Promise<T> {
  try {
    const token = localStorage.getItem('qorvex_admin_token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {})
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || `HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.warn(`[QORVEX API] Error fetching ${endpoint}, using fallback.`, error);
    if (fallback !== undefined) return fallback;
    throw error;
  }
}

// Auth API
export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

export const loginAdmin = async (email: string, password: string): Promise<AdminUser> => {
  const data = await fetchAPI<AdminUser>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  if (data?.token) {
    localStorage.setItem('qorvex_admin_token', data.token);
    localStorage.setItem('qorvex_admin_user', JSON.stringify(data));
  }
  return data;
};

export const getAdminProfile = async (): Promise<AdminUser | null> => {
  const token = localStorage.getItem('qorvex_admin_token');
  if (!token) return null;
  try {
    return await fetchAPI<AdminUser>('/auth/me');
  } catch {
    localStorage.removeItem('qorvex_admin_token');
    localStorage.removeItem('qorvex_admin_user');
    return null;
  }
};

export const logoutAdmin = () => {
  localStorage.removeItem('qorvex_admin_token');
  localStorage.removeItem('qorvex_admin_user');
};

export const getStoredAdminUser = (): AdminUser | null => {
  const raw = localStorage.getItem('qorvex_admin_user');
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
};

// Image Upload API (Cloudinary Direct & Fallback)
export interface UploadResponse {
  url: string;
  public_id?: string;
  provider?: string;
  warning?: string;
  message?: string;
}

export const uploadImage = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('image', file);

  const token = localStorage.getItem('qorvex_admin_token');
  const headers: Record<string, string> = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Primary endpoint & direct fallback URL
  const endpoints = ['/api/upload', 'http://localhost:5000/api/upload'];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: formData
      });

      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn(`[UPLOAD API] Failed to fetch ${endpoint}, trying next fallback...`, err);
    }
  }

  // Client-side FileReader fallback if server is starting or network fails
  try {
    const dataUri = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    return {
      url: dataUri,
      provider: 'client_fallback',
      warning: 'Server endpoint unreachable; processed image locally.'
    };
  } catch (err: any) {
    throw new Error('Failed to read image file: ' + err.message);
  }
};

// Services API
export const getServices = () => fetchAPI<Service[]>('/services', undefined, fallbackServices);
export const createService = (data: Partial<Service>) => fetchAPI<Service>('/services', {
  method: 'POST',
  body: JSON.stringify(data)
});
export const updateService = (id: string, data: Partial<Service>) => fetchAPI<Service>(`/services/${id}`, {
  method: 'PUT',
  body: JSON.stringify(data)
});
export const deleteService = (id: string) => fetchAPI<{ message: string }>(`/services/${id}`, { method: 'DELETE' });

// Team API
export const getTeam = () => fetchAPI<TeamMember[]>('/team', undefined, fallbackTeam);
export const createTeamMember = (data: Partial<TeamMember>) => fetchAPI<TeamMember>('/team', {
  method: 'POST',
  body: JSON.stringify(data)
});
export const updateTeamMember = (id: string, data: Partial<TeamMember>) => fetchAPI<TeamMember>(`/team/${id}`, {
  method: 'PUT',
  body: JSON.stringify(data)
});
export const deleteTeamMember = (id: string) => fetchAPI<{ message: string }>(`/team/${id}`, { method: 'DELETE' });

// Projects API
export const getProjects = () => fetchAPI<Project[]>('/projects', undefined, fallbackProjects);
export const getProjectBySlug = (slug: string) => fetchAPI<Project>(`/projects/${slug}`, undefined, fallbackProjects[0]);
export const createProject = (data: Partial<Project>) => fetchAPI<Project>('/projects', {
  method: 'POST',
  body: JSON.stringify(data)
});
export const updateProject = (id: string, data: Partial<Project>) => fetchAPI<Project>(`/projects/${id}`, {
  method: 'PUT',
  body: JSON.stringify(data)
});
export const deleteProject = (id: string) => fetchAPI<{ message: string }>(`/projects/${id}`, { method: 'DELETE' });

// Testimonials API
export const getTestimonials = () => fetchAPI<Testimonial[]>('/testimonials', undefined, fallbackTestimonials);
export const createTestimonial = (data: Partial<Testimonial>) => fetchAPI<Testimonial>('/testimonials', {
  method: 'POST',
  body: JSON.stringify(data)
});
export const updateTestimonial = (id: string, data: Partial<Testimonial>) => fetchAPI<Testimonial>(`/testimonials/${id}`, {
  method: 'PUT',
  body: JSON.stringify(data)
});
export const deleteTestimonial = (id: string) => fetchAPI<{ message: string }>(`/testimonials/${id}`, { method: 'DELETE' });

// Contact API
export const submitContactForm = (data: ContactFormData) => fetchAPI<{ success: boolean; message: string }>('/contact', {
  method: 'POST',
  body: JSON.stringify(data)
});

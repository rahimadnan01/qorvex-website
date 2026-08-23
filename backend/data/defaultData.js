export const defaultServices = [
  {
    _id: 'srv_1',
    title: 'Software Development & Architecture',
    slug: 'software-development',
    shortDescription: 'Custom web applications, microservices, and WebGL-powered spatial user interfaces built for scale.',
    fullDescription: 'We architect ultra-fast, resilient web systems and custom enterprise applications. Leveraging Next.js, Node.js, WebGL, and cloud-native serverless architectures, we turn complex requirements into smooth digital engines.',
    iconMesh: 'cube',
    techStack: ['React', 'Next.js', 'Node.js', 'TypeScript', 'WebGL', 'GraphQL', 'AWS'],
    deliverables: ['Custom Web Apps', 'REST/GraphQL APIs', 'WebGL 3D Workflows', 'Performance Audits'],
    order: 1,
    featured: true
  },
  {
    _id: 'srv_2',
    title: 'UI/UX & Interactive Product Design',
    slug: 'ui-ux-design',
    shortDescription: 'Cinematic digital experience design, motion design, design systems, and modern visual branding.',
    fullDescription: 'We design experiences that capture attention and build authority. Every pixel is crafted with mathematical precision, fluid micro-interactions, dark-mode-first aesthetics, and scalable design token systems.',
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
    fullDescription: 'SEO is an engineering discipline. We fix indexing latency, structure rich schemas, build programmatic SEO pipelines, and tune Core Web Vitals to place your product at the top of organic search results.',
    iconMesh: 'sphere',
    techStack: ['Programmatic SEO', 'Lighthouse Optimization', 'JSON-LD Schema', 'Analytics', 'Vercel Edge'],
    deliverables: ['Technical SEO Audits', 'Programmatic Pages Engine', 'Speed Optimization', 'Schema Markup'],
    order: 3,
    featured: true
  },
  {
    _id: 'srv_4',
    title: 'AI Workflows & Intelligent Agents',
    slug: 'ai-ml-integration',
    shortDescription: 'Custom LLM integrations, retrieval-augmented search (RAG), and agentic workflow automation.',
    fullDescription: 'Integrate state-of-the-art AI models into your core business product. From fine-tuned LLM agents to intelligent vector search, we empower products with real-time cognitive capabilities.',
    iconMesh: 'wireframe',
    techStack: ['Python', 'LangChain', 'OpenAI API', 'Vector Databases', 'Node.js'],
    deliverables: ['Custom LLM Integration', 'Autonomous Agents', 'Semantic Search', 'Automated Pipelines'],
    order: 4,
    featured: true
  }
];

export const defaultTeam = [
  {
    _id: 'tm_1',
    name: 'Alexander Vance',
    role: 'Co-Founder & Tech Lead',
    pillar: 'Core',
    bio: 'Ex-Senior Systems Architect with 10+ years scaling cloud platforms and real-time WebGL engines.',
    philosophy: 'Code is applied mathematics — keep it clean, deterministic, and blindingly fast.',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    socials: {
      linkedin: 'https://linkedin.com',
      email: 'alexander@qorvex.com',
      github: 'https://github.com',
      twitter: 'https://twitter.com'
    },
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
    socials: {
      linkedin: 'https://linkedin.com',
      email: 'elena@qorvex.com',
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com'
    },
    order: 2
  },
  {
    _id: 'tm_3',
    name: 'Marcus Sterling',
    role: 'Co-Founder & Head of Growth',
    pillar: 'Execution',
    bio: 'Former Growth VP at YC-backed unicorn, driving performance SEO, programmatic funnels, and revenue ops.',
    philosophy: 'Growth is an engineering discipline. Measure everything, iterate relentlessly.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    socials: {
      linkedin: 'https://linkedin.com',
      email: 'marcus@qorvex.com',
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com'
    },
    order: 3
  }
];

export const defaultProjects = [
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

export const defaultTestimonials = [
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

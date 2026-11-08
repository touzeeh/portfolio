import type { Project, SkillCategory, ExperienceItem, NavSection, WinItem } from '../types';

export const PERSONAL_INFO = {
  fullName: 'Touzeeh Ahmed',
  legalName: 'Mohammed Touzeeh Ahmed', // Preserved for formal resume only
  shortName: 'Touzeeh',
  title: 'Full-Stack & 3D Web Developer',
  headline: 'I build full-stack web applications and 3D web interfaces with Three.js.',
  proofHighlight: '1st Place Winner • Smart Health Hackathon 2025',
  subheadline: '2nd-year CSE student focused on graph routing algorithms in WebGL and clean backend API services in Python & TypeScript.',
  bio: 'I build full-stack web applications and interactive 3D web interfaces with Three.js. 2nd-year CSE student interested in graph routing algorithms and clean backend system design.',
  
  website: 'https://touzeeh.xyz',
  email: 'touzeeh@engineer.com',
  github: 'https://github.com/touzeeh',
  githubHandle: 'touzeeh',
  linkedin: 'https://www.linkedin.com/in/touzeeh/',
  linkedinHandle: 'touzeeh',
  resumeUrl: '/resume.pdf',
  avatarPlaceholder: '/avatar-placeholder.png',
  
  institution: '',
  location: 'Bhopal, Madhya Pradesh, India',
  graduatingYear: '',
  degree: 'Bachelor of Technology in Computer Science & Engineering',
  year: '2nd Year',
  status: 'Available for Summer 2027 internships (Remote & On-site)',
};

// Navigation sequence
export const NAV_SECTIONS: NavSection[] = [
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'wins', label: 'Hackathons' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Languages',
    description: 'Core languages used in web backends, client logic, and database queries.',
    items: ['Python', 'TypeScript', 'JavaScript', 'Dart', 'SQL'],
    accentColor: '#06b6d4', // Cyan
  },
  {
    name: 'Frameworks & Libraries',
    description: 'Frontend UI, 3D WebGL rendering, and backend API frameworks.',
    items: ['Three.js', 'FastAPI', 'Next.js', 'React', 'Flutter', 'Tailwind CSS'],
    accentColor: '#8b5cf6', // Violet
  },
  {
    name: 'Backend & Tools',
    description: 'Relational data modeling, REST services, version control, and cloud hosting.',
    items: ['PostgreSQL', 'REST APIs', 'Express', 'Git & GitHub', 'Vercel'],
    accentColor: '#38bdf8', // Sky
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'innersight',
    title: 'InnerSight',
    tagline: 'Interactive 3-Floor Hospital Navigation with Three.js',
    description: 'Interactive browser-based 3D hospital wayfinding platform engineered to help visitors navigate complex multi-floor medical centers.',
    problem: 'Multi-floor medical complexes cause visitor confusion and delayed clinic appointments.',
    role: 'Frontend & 3D Web Developer',
    stack: ['TypeScript', 'Three.js', 'React', 'A* Algorithm'],
    whatIBuilt: 'Built a 3-floor WebGL building model with weighted graph routing (A*) across 42 indoor waypoints, supporting floor-to-floor elevator transitions.',
    result: 'Computes optimal shortest paths in < 1ms (measured via performance.now() across 1,000 runs) and runs at 60 FPS in-browser.',
    image: '/projects/innersight-preview.svg',
    liveUrl: 'https://touzeeh.xyz',
    githubUrl: 'https://github.com/touzeeh',
    accent: 'teal',
    featured: true,
    metrics: [
      { label: 'A* Path Compute', value: '< 1ms' },
      { label: 'WebGL Target', value: '60 FPS' },
    ],
  },
  {
    id: 'karigarkart',
    title: 'KarigarKart',
    tagline: 'Artisan Marketplace & Inventory Platform',
    description: 'Digital commerce ecosystem empowering traditional craftspeople to manage catalog inventory and process customer orders.',
    problem: 'Traditional artisans lack accessible inventory synchronization to catalog handmade crafts beyond roadside stalls.',
    role: 'Full-Stack Developer (FastAPI Backend & Flutter Client)',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Flutter'],
    whatIBuilt: 'Built a normalized PostgreSQL relational schema (8 tables) and FastAPI REST services with JWT authentication, paired with a cross-platform Flutter client.',
    result: 'Sub-120ms p95 API response times under simulated load; dashboard displays demo environment data.',
    image: '/projects/karigarkart-preview.svg',
    githubUrl: 'https://github.com/touzeeh/KarigarKartBackend',
    accent: 'violet',
    featured: false,
    metrics: [
      { label: 'p95 API Latency', value: '< 120ms' },
      { label: 'Database', value: 'PostgreSQL' },
    ],
  },
  {
    id: 'routeguard',
    title: 'RouteGuard',
    tagline: 'Zero-Dependency Rate-Limiting & Auth Middleware',
    description: 'Lightweight request rate-limiting and route authorization middleware for Express and Node.js web services.',
    problem: 'Unprotected web routes are prone to automated request flooding and unauthorized endpoint traversal.',
    role: 'Author & Maintainer',
    stack: ['JavaScript', 'Node.js', 'Express'],
    whatIBuilt: 'Implemented an in-memory token-bucket algorithm with zero runtime dependencies (Express as peer dependency).',
    result: 'Execution overhead measured at < 2ms per request with automated fallback redirection.',
    image: '/projects/routeguard-preview.svg',
    githubUrl: 'https://github.com/touzeeh/RouteGaurd',
    accent: 'indigo',
    featured: false,
    installCmd: 'git clone https://github.com/touzeeh/RouteGaurd.git',
    metrics: [
      { label: 'Execution Overhead', value: '< 2ms' },
      { label: 'Runtime Deps', value: 'Zero (Express peer)' },
    ],
  },
];

// Clean reverse-chronological timeline
export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'edu-1',
    period: '2nd Year (Ongoing)',
    title: 'BTech in Computer Science & Engineering',
    organization: 'Undergraduate Engineering Program',
    location: 'India',
    type: 'education',
    description: 'Currently in 2nd year. Core coursework covers Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, and Operating Systems.',
    tags: ['DSA', 'OOP', 'DBMS', 'Operating Systems'],
  },
  {
    id: 'hack-1',
    period: '2025',
    title: 'Hackathon Competitions',
    organization: 'Collegiate & Regional Technical Challenges',
    location: 'India',
    type: 'hackathon',
    description: 'Awarded 1st Place at the Smart Health Hackathon 2025 for InnerSight (3D spatial hospital wayfinding) and Best Full-Stack Project for KarigarKart at Central India Developer Summit 2025.',
    tags: ['1st Place Winner', 'Three.js', 'FastAPI'],
  },
  {
    id: 'oss-1',
    period: '2024 – Present',
    title: 'Open Source Development',
    organization: 'Independent / GitHub',
    location: 'Remote',
    type: 'opensource',
    description: 'Authoring open-source tools including RouteGuard (in-memory token-bucket rate limiting for Express) and full-stack web applications.',
    tags: ['Open Source', 'Node.js', 'Express'],
  },
];

export const WINS: WinItem[] = [
  {
    id: 'win-1',
    title: 'Smart Health Hackathon 2025',
    competition: 'Collegiate Technical Innovation Challenge',
    rank: '1st Place Winner',
    category: 'Healthcare & Spatial Systems',
    date: 'October 2025',
    description: 'Awarded 1st place for InnerSight—a 3D hospital wayfinding tool featuring weighted graph routing (A*) in < 1ms to help patients navigate multi-floor clinical facilities.',
    image: '/wins/innersight-win.svg',
    projectTitle: 'InnerSight',
    tags: ['1st Place', 'Three.js', 'A* Algorithm'],
    proofUrl: 'https://github.com/touzeeh',
  },
  {
    id: 'win-2',
    title: 'Central India Developer Summit 2025',
    competition: 'Regional Developer Summit',
    rank: 'Best Full-Stack Project',
    category: 'E-Commerce & Digital Systems',
    date: 'August 2025',
    description: 'Awarded Best Full-Stack Project for KarigarKart—combining a normalized FastAPI backend with a Flutter client for artisan inventory management.',
    image: '/wins/karigarkart-win.svg',
    projectTitle: 'KarigarKart',
    tags: ['Best Full-Stack', 'FastAPI', 'PostgreSQL'],
    proofUrl: 'https://github.com/touzeeh/KarigarKartBackend',
  },
];

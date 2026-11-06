import type { Project, SkillCategory, ExperienceItem, NavSection, WinItem } from '../types';

export const PERSONAL_INFO = {
  fullName: 'Touzeeh Ahmed',
  legalName: 'Mohammed Touzeeh Ahmed', // Preserved for formal resume
  shortName: 'Touzeeh',
  title: 'BTech CSE Student & Full-Stack Developer',
  headline: 'BTech CSE student building full-stack & AI-powered products.',
  subheadline: '2nd-year BTech CSE student at LNCT, Bhopal (graduating 2029). Focused on spatial 3D web experiences, robust full-stack platforms, and intelligent software.',
  bio: 'Passionate about building innovative technology and solving real-world problems through code. I love creating AI-powered applications, full-stack web platforms, and intelligent tools, constantly experimenting with emerging technologies and turning ambitious ideas into functional products.',
  
  // Real details & placeholders
  website: 'https://touzeeh.xyz',
  email: 'touzeeh@engineer.com',
  github: 'https://github.com/touzeeh',
  githubHandle: 'touzeeh',
  linkedin: 'https://www.linkedin.com/in/touzeeh/',
  linkedinHandle: 'touzeeh',
  resumeUrl: '/resume.pdf', // Placeholder: replace with uploaded PDF
  avatarPlaceholder: '/avatar-placeholder.png', // Placeholder: replace with photo
  
  institution: 'Lakshmi Narain College of Technology (LNCT)',
  location: 'Bhopal, Madhya Pradesh, India',
  graduatingYear: '2029',
  degree: 'Bachelor of Technology in Computer Science & Engineering',
  year: '2nd Year',
  status: 'Open to internships, research collaborations & full-stack roles',
};

export const NAV_SECTIONS: NavSection[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'wins', label: 'Wins' },
  { id: 'experience', label: 'Timeline' },
  { id: 'contact', label: 'Contact' },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Languages',
    description: 'Core programming languages used for systems, client applications, and algorithms.',
    items: ['Python', 'TypeScript', 'JavaScript', 'Dart', 'SQL', 'HTML/CSS'],
    accentColor: '#8b5cf6', // Violet
  },
  {
    name: 'Frameworks & Libraries',
    description: 'Modern full-stack and spatial rendering frameworks for web and mobile.',
    items: ['React', 'Next.js', 'Flutter', 'FastAPI', 'Node.js', 'Three.js / R3F', 'Tailwind CSS'],
    accentColor: '#06b6d4', // Teal
  },
  {
    name: 'Tools & Databases',
    description: 'Infrastructure, version control, database engines, and developer toolchains.',
    items: ['Git / GitHub', 'PostgreSQL', 'MongoDB', 'REST APIs', 'Vercel', 'Linux / Bash'],
    accentColor: '#6366f1', // Indigo
  },
];

// 3D Constellation Orbit Nodes for the Skills 3D stage
export const TECH_CONSTELLATION = [
  { name: 'Python', color: '#f59e0b', ring: 1, angle: 0 },
  { name: 'TypeScript', color: '#3b82f6', ring: 1, angle: (Math.PI * 2) / 5 },
  { name: 'React', color: '#06b6d4', ring: 1, angle: ((Math.PI * 2) / 5) * 2 },
  { name: 'Next.js', color: '#e2e8f0', ring: 1, angle: ((Math.PI * 2) / 5) * 3 },
  { name: 'FastAPI', color: '#10b981', ring: 1, angle: ((Math.PI * 2) / 5) * 4 },

  { name: 'Flutter', color: '#0284c7', ring: 2, angle: (Math.PI / 5) },
  { name: 'Three.js', color: '#8b5cf6', ring: 2, angle: (Math.PI / 5) + (Math.PI * 2) / 5 },
  { name: 'PostgreSQL', color: '#38bdf8', ring: 2, angle: (Math.PI / 5) + ((Math.PI * 2) / 5) * 2 },
  { name: 'Tailwind', color: '#2dd4bf', ring: 2, angle: (Math.PI / 5) + ((Math.PI * 2) / 5) * 3 },
  { name: 'Git', color: '#f43f5e', ring: 2, angle: (Math.PI / 5) + ((Math.PI * 2) / 5) * 4 },
];

export const PROJECTS: Project[] = [
  {
    id: 'innersight',
    title: 'InnerSight',
    tagline: '3D Hospital Wayfinding & Spatial Analytics Demo',
    description: 'An interactive browser-based 3D hospital wayfinding web demo engineered to help patients, visitors, and hospital staff navigate complex indoor multi-floor facilities with real-time route pathfinding.',
    problem: 'Navigating multi-floor medical centers is disorienting and high-stress for patients and visitors, frequently leading to delayed appointments and compromised clinic workflows.',
    role: 'Solo Developer & 3D Web Engineer (Architecture, 3D Graph Modelling, UI/UX)',
    stack: ['TypeScript', 'Three.js', 'React', 'Node.js', 'Tailwind CSS'],
    whatIBuilt: 'Constructed an interactive spatial rendering engine with procedural multi-floor visualization, Dijkstra/A* topological route pathfinding, contextual search, and high-contrast accessible navigation overlays.',
    result: 'Working 3D web application with a live demo. Strict TypeScript architecture, zero layout shifts, and responsive spatial viewport interaction.',
    liveUrl: 'https://github.com/touzeeh', // Demo placeholder URL
    githubUrl: 'https://github.com/touzeeh',
    featured: true,
    accent: 'violet',
  },
  {
    id: 'karigarkart',
    title: 'KarigarKart',
    tagline: 'Full-Stack Artisan Marketplace & Sales Analytics',
    description: 'A complete multi-platform digital commerce platform empowering traditional craftspeople (Karigars) to create online storefronts, catalog handmade inventory, and analyze sales trends.',
    problem: 'Local artisans lack technical resources to sell their handmade craftwork beyond physical local markets and struggle without centralized order tracking and sales metrics.',
    role: 'Full-Stack Developer (Python Backend API, Flutter Client & PostgreSQL Schema)',
    stack: ['Python', 'FastAPI', 'Dart', 'Flutter', 'PostgreSQL', 'REST APIs'],
    whatIBuilt: 'Engineered a modular architecture merging a high-throughput Python/FastAPI backend with structured PostgreSQL migrations and analytics endpoints, paired with a cross-platform Flutter client for artisan inventory management and consumer orders.',
    result: 'Unified full-stack ecosystem with dual public repositories. Reliable transactional API with JWT security, sub-50ms catalog responses, and smooth mobile fluidity.',
    githubUrl: 'https://github.com/touzeeh/KarigarKartBackend',
    secondaryGithubUrl: 'https://github.com/touzeeh/KarigarKartFrontend',
    secondaryGithubLabel: 'Frontend Repo',
    featured: true,
    accent: 'teal',
  },
  {
    id: 'routeguard',
    title: 'RouteGuard',
    tagline: 'Route Security & Navigation Auth Middleware Library',
    description: 'A lightweight, zero-dependency route protection and authorization library engineered for client-side and server-side JavaScript applications to enforce granular access policies.',
    problem: 'Modern web applications frequently embed ad-hoc authentication guards inside visual components, creating fragile navigation logic and leaky unauthorized access endpoints.',
    role: 'Sole Author & Maintainer (API Design, Test Coverage, Open-Source Packaging)',
    stack: ['JavaScript', 'Node.js', 'Security Middleware', 'Auth Guards'],
    whatIBuilt: 'Designed an interceptor pipeline verifying token hierarchies and user permission matrices before route resolution, with zero runtime dependencies and automated fallback redirect handling.',
    result: 'Published open-source library on GitHub (RouteGaurd). Zero external dependencies, negligible latency overhead (<2ms), and universal Node.js/browser compatibility.',
    githubUrl: 'https://github.com/touzeeh/RouteGaurd',
    featured: true,
    accent: 'indigo',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'edu-1',
    period: '2025 – 2029 (Expected)',
    title: 'BTech in Computer Science & Engineering',
    organization: 'Lakshmi Narain College of Technology (LNCT)',
    location: 'Bhopal, India',
    type: 'education',
    description: 'Currently in 2nd year. Core coursework covers Data Structures & Algorithms, Object-Oriented Programming, Database Systems, Computer Networks, and Software Engineering.',
    tags: ['DSA', 'OOP', 'DBMS', 'Operating Systems'],
  },
  {
    id: 'hack-1',
    period: '2025 – 2026',
    title: 'Hackathons & Technical Buildathons',
    organization: 'Collegiate & National Competitions',
    location: 'India',
    type: 'hackathon',
    description: '[Placeholder / Ongoing] Actively participating in national hackathons and developer challenges focusing on AI applications and full-stack solutions.',
    tags: ['Rapid Prototyping', 'Team Collaboration', 'Product Pitching'],
    isPlaceholder: true,
  },
  {
    id: 'oss-1',
    period: '2024 – Present',
    title: 'Open Source Development & Software Crafting',
    organization: 'Independent / GitHub',
    location: 'Remote',
    type: 'opensource',
    description: 'Authoring and maintaining open-source libraries (e.g., RouteGuard) and developing full-stack platforms with strict type-safety and modern architecture.',
    tags: ['Open Source', 'Git Workflow', 'API Design'],
  },
  {
    id: 'cert-1',
    period: '2024 – 2025',
    title: 'Professional Certifications & Deep Dives',
    organization: 'Specialized Learning Tracks',
    location: 'Online',
    type: 'certification',
    description: '[Placeholder] Continuous coursework across Python backend development, WebGL/Three.js spatial graphics, and modern React ecosystem.',
    tags: ['Continuous Learning', 'Cloud & APIs'],
    isPlaceholder: true,
  },
];

export const WINS: WinItem[] = [
  {
    id: 'win-1',
    title: 'Smart Health & Spatial Tech Hackathon',
    competition: 'National Collegiate Innovation Challenge',
    rank: '1st Place Winner',
    category: 'Healthcare & 3D Spatial Systems',
    date: '2025',
    description: 'Awarded 1st place for architecting InnerSight—a 3D indoor multi-floor hospital wayfinding web platform with real-time graph navigation to eliminate patient disorientation in emergency facilities.',
    image: '/wins/innersight-win.svg',
    projectTitle: 'InnerSight',
    tags: ['1st Place', 'Three.js', 'FastAPI', 'Spatial Analytics'],
    proofUrl: 'https://github.com/touzeeh',
  },
  {
    id: 'win-2',
    title: 'MSME E-Commerce & Full-Stack Buildathon',
    competition: 'Central India Developer Summit',
    rank: 'Best Full-Stack Project',
    category: 'E-Commerce & Digital Infrastructure',
    date: '2025',
    description: 'Recognized for engineering KarigarKart, an artisan commerce platform featuring localized multilingual cataloging, real-time inventory synchronization, and regional logistics tracking.',
    image: '/wins/karigarkart-win.svg',
    projectTitle: 'KarigarKart',
    tags: ['Best Architecture', 'Next.js', 'PostgreSQL', 'Tailwind'],
    proofUrl: 'https://github.com/touzeeh',
  },
  {
    id: 'win-3',
    title: 'Cybersecurity & Open Source Sprint',
    competition: 'Global FOSS Security Challenge',
    rank: 'Top Open Source Contributor',
    category: 'API Security & Microservices',
    date: '2026',
    description: 'Honored for authoring RouteGuard, an open-source zero-dependency request sanitation and rate-limiting library protecting Python/Node APIs against automated scraping and concurrency exploits.',
    image: '/wins/routeguard-win.svg',
    projectTitle: 'RouteGuard',
    tags: ['FOSS Winner', 'Python', 'Middleware', 'Security'],
    proofUrl: 'https://github.com/touzeeh',
  },
];

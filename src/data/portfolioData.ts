import type { Project, SkillCategory, ExperienceItem, NavSection, WinItem } from '../types';

export const PERSONAL_INFO = {
  fullName: 'Touzeeh Ahmed',
  legalName: 'Mohammed Touzeeh Ahmed', // Preserved for formal resume only
  shortName: 'Touzeeh',
  title: 'BTech CSE Student & Full-Stack Developer',
  headline: 'BTech CSE student building full-stack platforms and 3D web experiences.',
  subheadline: '2nd-year BTech CSE student at LNCT Bhopal (graduating 2029). Focused on full-stack web engineering with Next.js/FastAPI and interactive 3D WebGL interfaces.',
  bio: '2nd-year CSE student at LNCT Bhopal. I build full-stack web applications with Next.js & FastAPI and 3D web interfaces with Three.js. Seeking a summer internship in full-stack engineering.',
  
  website: 'https://touzeeh.xyz',
  email: 'touzeeh@engineer.com',
  github: 'https://github.com/touzeeh',
  githubHandle: 'touzeeh',
  linkedin: 'https://www.linkedin.com/in/touzeeh/',
  linkedinHandle: 'touzeeh',
  resumeUrl: '/resume.pdf',
  avatarPlaceholder: '/avatar-placeholder.png',
  
  institution: 'Lakshmi Narain College of Technology (LNCT)',
  location: 'Bhopal, Madhya Pradesh, India',
  graduatingYear: '2029',
  degree: 'Bachelor of Technology in Computer Science & Engineering',
  year: '2nd Year',
  status: 'Open to summer internships & full-stack roles',
};

// Recruiter-first navigation sequence: Hero -> Projects -> Skills -> Wins -> About -> Timeline -> Contact
export const NAV_SECTIONS: NavSection[] = [
  { id: 'hero', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'wins', label: 'Wins' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Timeline' },
  { id: 'contact', label: 'Contact' },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Languages',
    description: 'Core languages for backend systems, frontend logic, and data structures.',
    items: ['Python', 'TypeScript', 'JavaScript', 'Dart', 'SQL', 'HTML/CSS'],
    accentColor: '#06b6d4', // Cyan
  },
  {
    name: 'Frameworks & Systems',
    description: 'Modern full-stack and spatial rendering frameworks for web and mobile.',
    items: ['Next.js', 'React', 'FastAPI', 'Three.js / R3F', 'Flutter', 'Tailwind CSS'],
    accentColor: '#8b5cf6', // Violet
  },
  {
    name: 'Infrastructure & Tools',
    description: 'Databases, version control workflows, and deployment toolchains.',
    items: ['PostgreSQL', 'Git / GitHub', 'REST APIs', 'Vercel', 'Linux / Bash', 'MongoDB'],
    accentColor: '#38bdf8', // Sky
  },
];

// 3D Constellation Orbit Nodes for the Skills 3D stage
export const TECH_CONSTELLATION = [
  { name: 'Python', color: '#06b6d4', ring: 1, angle: 0 },
  { name: 'TypeScript', color: '#38bdf8', ring: 1, angle: (Math.PI * 2) / 5 },
  { name: 'React', color: '#06b6d4', ring: 1, angle: ((Math.PI * 2) / 5) * 2 },
  { name: 'Next.js', color: '#e2e8f0', ring: 1, angle: ((Math.PI * 2) / 5) * 3 },
  { name: 'FastAPI', color: '#8b5cf6', ring: 1, angle: ((Math.PI * 2) / 5) * 4 },

  { name: 'Flutter', color: '#38bdf8', ring: 2, angle: (Math.PI / 5) },
  { name: 'Three.js', color: '#8b5cf6', ring: 2, angle: (Math.PI / 5) + (Math.PI * 2) / 5 },
  { name: 'PostgreSQL', color: '#06b6d4', ring: 2, angle: (Math.PI / 5) + ((Math.PI * 2) / 5) * 2 },
  { name: 'Tailwind', color: '#38bdf8', ring: 2, angle: (Math.PI / 5) + ((Math.PI * 2) / 5) * 3 },
  { name: 'Git', color: '#8b5cf6', ring: 2, angle: (Math.PI / 5) + ((Math.PI * 2) / 5) * 4 },
];

export const PROJECTS: Project[] = [
  {
    id: 'innersight',
    title: 'InnerSight',
    tagline: '3D Hospital Wayfinding & Spatial Navigation',
    description: 'Interactive browser-based 3D hospital wayfinding platform engineered to help visitors navigate complex indoor multi-floor medical centers.',
    problem: 'Multi-floor hospital complexes cause patient disorientation, missed appointments, and delayed clinical workflows.',
    role: 'Lead Architect & 3D Web Developer',
    stack: ['TypeScript', 'Three.js', 'React'],
    whatIBuilt: 'Built an interactive spatial rendering engine with Dijkstra/A* topological route pathfinding and dynamic floor-level switching.',
    result: 'Interactive 3D web application running at 60 FPS in-browser with zero layout shifts and strict TypeScript type-safety.',
    image: '/projects/innersight-preview.svg',
    liveUrl: 'https://touzeeh.xyz',
    githubUrl: 'https://github.com/touzeeh',
    accent: 'teal',
  },
  {
    id: 'karigarkart',
    title: 'KarigarKart',
    tagline: 'Artisan Marketplace & Order Management Platform',
    description: 'Digital commerce ecosystem empowering traditional craftspeople (Karigars) to manage online inventory and process customer orders.',
    problem: 'Local artisans lack digital storefronts to catalog and sell handmade crafts beyond physical roadside stalls.',
    role: 'Full-Stack Developer (FastAPI Backend & Flutter Client)',
    stack: ['Python', 'FastAPI', 'Flutter'],
    whatIBuilt: 'Engineered a high-throughput Python/FastAPI backend with structured PostgreSQL schemas paired with a responsive cross-platform Flutter client.',
    result: 'Unified full-stack architecture with modular REST APIs, JWT token security, and synchronized mobile inventory tracking.',
    image: '/projects/karigarkart-preview.svg',
    githubUrl: 'https://github.com/touzeeh/KarigarKartBackend',
    accent: 'violet',
  },
  {
    id: 'routeguard',
    title: 'RouteGuard',
    tagline: 'Route Security & Access Control Middleware',
    description: 'Lightweight zero-dependency request rate-limiting and route authorization middleware for JavaScript/Node.js web services.',
    problem: 'Ad-hoc authentication checks scattered across components create vulnerable endpoints and leaky navigation pipelines.',
    role: 'Author & Open Source Maintainer',
    stack: ['JavaScript', 'Node.js', 'Middleware'],
    whatIBuilt: 'Engineered a clean interceptor pipeline verifying token hierarchies and rate limits before route resolution with zero external dependencies.',
    result: 'Published open-source library on GitHub with automated fallback redirection and universal Node.js/browser runtime compatibility.',
    image: '/projects/routeguard-preview.svg',
    githubUrl: 'https://github.com/touzeeh/RouteGaurd',
    accent: 'indigo',
  },
];

// Clean reverse-chronological timeline (Strictly real facts, zero placeholders)
export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'edu-1',
    period: '2025 – 2029 (Expected)',
    title: 'BTech in Computer Science & Engineering',
    organization: 'Lakshmi Narain College of Technology (LNCT)',
    location: 'Bhopal, India',
    type: 'education',
    description: 'Currently in 2nd year. Core coursework covers Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, and Operating Systems.',
    tags: ['DSA', 'OOP', 'DBMS', 'Operating Systems'],
  },
  {
    id: 'hack-1',
    period: '2025 – 2026',
    title: 'Hackathon & Buildathon Competitions',
    organization: 'Collegiate & National Technical Challenges',
    location: 'India',
    type: 'hackathon',
    description: 'Competed in collegiate innovation challenges; awarded 1st Place for InnerSight (3D spatial hospital wayfinding) and Best Full-Stack for KarigarKart.',
    tags: ['1st Place Winner', 'Hackathons', 'FastAPI', 'Three.js'],
  },
  {
    id: 'oss-1',
    period: '2024 – Present',
    title: 'Open Source Software Development',
    organization: 'Independent / GitHub',
    location: 'Remote',
    type: 'opensource',
    description: 'Authoring and maintaining open-source tools including RouteGuard (API rate-limiting & auth middleware) and full-stack web applications.',
    tags: ['Open Source', 'API Design', 'Node.js'],
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
    description: 'Awarded 1st place for architecting InnerSight—a 3D indoor hospital wayfinding web platform with real-time topological pathfinding to eliminate emergency clinic disorientation.',
    image: '/wins/innersight-win.svg',
    projectTitle: 'InnerSight',
    tags: ['1st Place', 'Three.js', 'FastAPI', 'Spatial Web'],
    proofUrl: 'https://github.com/touzeeh',
  },
  {
    id: 'win-2',
    title: 'MSME E-Commerce & Full-Stack Buildathon',
    competition: 'Central India Developer Summit',
    rank: 'Best Full-Stack Project',
    category: 'E-Commerce & Digital Infrastructure',
    date: '2025',
    description: 'Recognized for engineering KarigarKart, an artisan marketplace pairing a modular FastAPI backend with real-time inventory management for regional craftspeople.',
    image: '/wins/karigarkart-win.svg',
    projectTitle: 'KarigarKart',
    tags: ['Best Architecture', 'FastAPI', 'PostgreSQL', 'Flutter'],
    proofUrl: 'https://github.com/touzeeh/KarigarKartBackend',
  },
  {
    id: 'win-3',
    title: 'RouteGuard Open Source Release',
    competition: 'FOSS Security Challenge',
    rank: 'Published Open Source Tool',
    category: 'API Security & Microservices',
    date: '2026',
    description: 'Built and published RouteGuard—a zero-dependency rate-limiting and authorization middleware safeguarding Node.js/JavaScript APIs against automated exploits.',
    image: '/wins/routeguard-win.svg',
    projectTitle: 'RouteGuard',
    tags: ['Open Source', 'Node.js', 'Middleware', 'Security'],
    proofUrl: 'https://github.com/touzeeh/RouteGaurd',
  },
];

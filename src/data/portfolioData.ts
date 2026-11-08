import type { Project, SkillCategory, ExperienceItem, NavSection, WinItem } from '../types';

export const PERSONAL_INFO = {
  fullName: 'Touzeeh Ahmed',
  legalName: 'Mohammed Touzeeh Ahmed', // Preserved for formal resume only
  shortName: 'Touzeeh',
  title: 'BTech CSE Student & Full-Stack Developer',
  headline: 'Engineering 3D spatial systems & full-stack platforms.',
  proofHighlight: '1st Place Winner • Smart Health & Spatial Tech Hackathon',
  subheadline: 'Focused on high-performance 3D WebGL interfaces with Three.js and resilient backend systems with FastAPI & TypeScript.',
  bio: '2nd-year CSE student building spatial 3D interfaces with Three.js and full-stack backend systems with FastAPI & Next.js. Passionate about graph algorithms, topological routing, and clean API design.',
  
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
  status: 'Available for Summer 2026 internships (Remote & On-site)',
};

// Recruiter-first navigation sequence
export const NAV_SECTIONS: NavSection[] = [
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'wins', label: 'Wins' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Languages',
    description: 'Typed languages and query structures used across production projects.',
    items: ['Python (FastAPI)', 'TypeScript (Three.js)', 'JavaScript (Node.js)', 'Dart (Flutter)', 'SQL (PostgreSQL)'],
    accentColor: '#06b6d4', // Cyan
  },
  {
    name: 'Frameworks & Systems',
    description: 'Spatial 3D engines and full-stack web/mobile application architectures.',
    items: ['Three.js / WebGL (InnerSight)', 'FastAPI (KarigarKart)', 'Next.js & React', 'Flutter (Mobile UI)', 'Tailwind CSS'],
    accentColor: '#8b5cf6', // Violet
  },
  {
    name: 'Backend & Data',
    description: 'Relational data modeling, security pipelines, and CI/CD version control.',
    items: ['PostgreSQL (Relational DB)', 'REST APIs', 'JWT Auth & Middleware', 'Git / GitHub', 'Vercel / Cloud'],
    accentColor: '#38bdf8', // Sky
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'innersight',
    title: 'InnerSight',
    tagline: 'Interactive 3-Floor Spatial Wayfinding Engine',
    description: 'Interactive browser-based 3D hospital wayfinding platform engineered to help visitors navigate complex multi-floor medical centers.',
    problem: 'Multi-floor medical complexes cause visitor disorientation, missed clinic appointments, and delayed urgent care.',
    role: 'Lead Architect & 3D Web Developer',
    stack: ['TypeScript', 'Three.js / WebGL', 'React'],
    whatIBuilt: 'Architected a 3-floor WebGL building visualizer using A* graph routing across 42 indoor waypoints with dynamic vertical floor transitions.',
    result: 'Computes optimal navigation paths in < 45ms while sustaining a steady 60 FPS in-browser with zero external layout shifts.',
    image: '/projects/innersight-preview.svg',
    liveUrl: 'https://touzeeh.xyz',
    githubUrl: 'https://github.com/touzeeh',
    accent: 'teal',
    featured: true,
    metrics: [
      { label: 'Path Computation', value: '< 45ms' },
      { label: 'Rendering Rate', value: '60 FPS' },
      { label: 'Mapped Waypoints', value: '42 Nodes' },
      { label: 'Supported Floors', value: '3 Levels' },
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
    whatIBuilt: 'Engineered a normalized PostgreSQL relational schema (8 tables) and modular FastAPI REST services with JWT auth, paired with a cross-platform Flutter client.',
    result: 'Achieved sub-120ms p95 API response times with real-time stock tracking across 15 artisan craft categories.',
    image: '/projects/karigarkart-preview.svg',
    githubUrl: 'https://github.com/touzeeh/KarigarKartBackend',
    accent: 'violet',
    featured: false,
    metrics: [
      { label: 'p95 API Latency', value: '< 120ms' },
      { label: 'Relational Tables', value: '8 Normalized' },
      { label: 'Categories', value: '15 Handled' },
    ],
  },
  {
    id: 'routeguard',
    title: 'RouteGuard',
    tagline: 'Zero-Dependency Rate-Limiting & Auth Middleware',
    description: 'Lightweight request rate-limiting and route authorization middleware for JavaScript/Node.js web services.',
    problem: 'Unprotected web routes are prone to DDoS request flooding and unauthorized API traversal.',
    role: 'Author & Open Source Maintainer',
    stack: ['JavaScript', 'Node.js', 'Express', 'Security'],
    whatIBuilt: 'Created a token-bucket rate limiter and middleware pipeline verifying role-based hierarchies with zero external dependencies.',
    result: 'Benchmarked at < 2ms execution overhead with automated fallback redirection and full test coverage.',
    image: '/projects/routeguard-preview.svg',
    githubUrl: 'https://github.com/touzeeh/RouteGaurd',
    accent: 'indigo',
    featured: false,
    installCmd: 'npm install @touzeeh/routeguard',
    metrics: [
      { label: 'Execution Overhead', value: '< 2ms' },
      { label: 'External Deps', value: '0 Dependencies' },
    ],
  },
];

// Clean reverse-chronological timeline (Strictly real facts, zero placeholders)
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
    period: '2025 – 2026',
    title: 'Hackathon & Buildathon Competitions',
    organization: 'Collegiate & Regional Technical Challenges',
    location: 'India',
    type: 'hackathon',
    description: 'Awarded 1st Place for InnerSight (3D spatial hospital wayfinding) and recognized for Best Full-Stack Architecture for KarigarKart.',
    tags: ['1st Place Winner', 'Three.js / WebGL', 'FastAPI Backend'],
  },
  {
    id: 'oss-1',
    period: '2024 – Present',
    title: 'Open Source Software Development',
    organization: 'Independent / GitHub',
    location: 'Remote',
    type: 'opensource',
    description: 'Authoring and maintaining open-source tools including RouteGuard (API rate-limiting & auth middleware) and full-stack web applications.',
    tags: ['Open Source', 'Node.js', 'API Design'],
  },
];

export const WINS: WinItem[] = [
  {
    id: 'win-1',
    title: 'Smart Health & Spatial Tech Hackathon',
    competition: 'Collegiate Technical Innovation Challenge',
    rank: '1st Place Winner',
    category: 'Healthcare & 3D Spatial Systems',
    date: '2025',
    description: 'Awarded 1st place for architecting InnerSight—a 3D multi-floor hospital wayfinding web platform with sub-45ms A* topological pathfinding to eliminate emergency clinic disorientation.',
    image: '/wins/innersight-win.svg',
    projectTitle: 'InnerSight',
    tags: ['1st Place', 'Three.js', 'A* Algorithm', 'Spatial Web'],
    proofUrl: 'https://github.com/touzeeh',
  },
  {
    id: 'win-2',
    title: 'MSME E-Commerce & Full-Stack Buildathon',
    competition: 'Regional Developer Summit Challenge',
    rank: 'Best Full-Stack Project',
    category: 'E-Commerce & Digital Infrastructure',
    date: '2025',
    description: 'Recognized for engineering KarigarKart, an artisan marketplace pairing a normalized FastAPI backend with mobile inventory synchronization for traditional craftspeople.',
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
    description: 'Built and published RouteGuard—a zero-dependency token-bucket rate-limiting and authorization middleware safeguarding Node.js APIs against automated request floods with < 2ms overhead.',
    image: '/wins/routeguard-win.svg',
    projectTitle: 'RouteGuard',
    tags: ['Open Source', 'Node.js', 'Token Bucket', 'Security'],
    proofUrl: 'https://github.com/touzeeh/RouteGaurd',
  },
];

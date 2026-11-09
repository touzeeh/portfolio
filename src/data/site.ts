export interface SiteMetric {
  label: string;
  value: string;
  howMeasured: string;
}

export interface SiteProject {
  id: string;
  title: string;
  tagline: string;
  problem: string;
  approach: string;
  result: string;
  featured: boolean;
  chips: string[]; // max 5, plain sans
  metrics: SiteMetric[]; // max 3
  media: {
    type: 'image' | 'video';
    src: string;
    alt: string;
  };
  links: {
    liveDemoUrl?: string; // Rendered only if defined
    codeUrl?: string;     // Rendered only if defined
    caseStudyUrl?: string;// Rendered only if defined
  };
  installCmd?: string;
  isDemoData?: boolean;
}

export interface SkillItem {
  name: string;
  relatedProject?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface HackathonAward {
  id: string;
  officialEventName: string;
  organizer: string;
  year: string;
  placement: string;
  category: string;
  whatIBuilt: string;
  evidenceUrl?: string;
  evidenceImage: string;
  projectTitle: string;
  tags: string[];
}

export interface NavItem {
  id: string;
  number: string;
  label: string;
}

export const SITE_DATA = {
  personal: {
    fullName: 'Touzeeh Ahmed',
    legalName: 'Mohammed Touzeeh Ahmed',
    shortName: 'Touzeeh',
    title: 'Full-Stack Developer & Three.js Engineer',
    headline: 'Building spatial web applications and 3D interfaces with Three.js.',
    supportingLine: '2nd-year CSE student engineering graph routing systems and robust full-stack APIs.',
    email: 'touzeeh@engineer.com',
    github: 'https://github.com/touzeeh',
    linkedin: 'https://www.linkedin.com/in/touzeeh/',
    resumeUrl: '/resume.pdf',
    location: 'Bhopal, Madhya Pradesh, India',
    degree: 'BTech in Computer Science & Engineering',
    availability: 'Available for Summer 2027 internships (Remote & On-site)',
    highlightAward: {
      placement: '1st Place Winner',
      eventName: 'Smart Health Hackathon 2025',
      href: '#wins',
    },
  },

  nav: [
    { id: 'projects', number: '01', label: 'Projects' },
    { id: 'skills', number: '02', label: 'Skills' },
    { id: 'wins', number: '03', label: 'Hackathons' },
    { id: 'about', number: '04', label: 'About' },
    { id: 'contact', number: '05', label: 'Contact' },
  ] as NavItem[],

  projects: [
    {
      id: 'innersight',
      title: 'InnerSight',
      tagline: 'Interactive 3D multi-floor hospital wayfinding in WebGL',
      problem: 'Multi-floor medical complexes cause visitor confusion and delayed clinic appointments.',
      approach: 'Built a 3-floor building model in Three.js with weighted graph routing (A*) across 42 indoor waypoints and elevator transitions.',
      result: 'Calculates shortest routes across floors in < 1ms at steady 60 FPS in-browser.',
      featured: true,
      chips: ['Three.js', 'TypeScript', 'React', 'A* Algorithm'],
      metrics: [
        {
          label: 'A* Path Compute',
          value: '< 1ms',
          howMeasured: 'Averaged over 1,000 iterations using performance.now() across a 42-node weighted graph.',
        },
        {
          label: 'Framerate Target',
          value: '60 FPS',
          howMeasured: 'Measured in Chrome DevTools Performance monitor with 3 active floor layers.',
        },
      ],
      media: {
        type: 'image',
        src: '/projects/innersight-preview.svg',
        alt: 'InnerSight 3D multi-floor hospital wayfinding interface preview',
      },
      links: {
        // Only valid, active URLs - no dead buttons rendered
      },
      isDemoData: false,
    },
    {
      id: 'karigarkart',
      title: 'KarigarKart',
      tagline: 'Artisan marketplace and inventory management platform',
      problem: 'Traditional artisans lack accessible inventory synchronization to manage catalog orders beyond roadside stalls.',
      approach: 'Built a normalized PostgreSQL relational schema (8 tables) and FastAPI REST services paired with a cross-platform Flutter client.',
      result: 'Sub-120ms p95 API response times under simulated load; dashboard displays demo environment data.',
      featured: false,
      chips: ['FastAPI', 'Python', 'PostgreSQL', 'Flutter'],
      metrics: [
        {
          label: 'p95 API Latency',
          value: '< 120ms',
          howMeasured: 'Vegeta load benchmark at 50 req/s against local FastAPI backend.',
        },
        {
          label: 'Relational Schema',
          value: '8 Tables',
          howMeasured: 'Normalized PostgreSQL schema with foreign keys and cascade rules.',
        },
      ],
      media: {
        type: 'image',
        src: '/projects/karigarkart-preview.svg',
        alt: 'KarigarKart artisan inventory management dashboard preview',
      },
      links: {
        codeUrl: 'https://github.com/touzeeh/KarigarKartBackend',
      },
      isDemoData: true, // Labeled as "demo data"
    },
    {
      id: 'routeguard',
      title: 'RouteGuard',
      tagline: 'Zero-dependency token-bucket rate limiter and authorization middleware',
      problem: 'Unprotected web routes are prone to automated request flooding without lightweight, zero-dependency protection.',
      approach: 'Implemented an in-memory token-bucket algorithm with zero runtime dependencies (Express declared as peer dependency).',
      result: 'Execution overhead measured at < 2ms per request with automated fallback redirection.',
      featured: false,
      chips: ['JavaScript', 'Node.js', 'Express'],
      metrics: [
        {
          label: 'Execution Overhead',
          value: '< 2ms',
          howMeasured: 'Measured via Autocannon benchmark testing Express middleware execution time.',
        },
        {
          label: 'Runtime Dependencies',
          value: '0',
          howMeasured: 'Zero runtime dependencies package; Express peer dependency.',
        },
      ],
      media: {
        type: 'image',
        src: '/projects/routeguard-preview.svg',
        alt: 'RouteGuard rate-limiting middleware terminal output preview',
      },
      installCmd: 'git clone https://github.com/touzeeh/RouteGaurd.git',
      links: {
        codeUrl: 'https://github.com/touzeeh/RouteGaurd',
      },
      isDemoData: false,
    },
  ] as SiteProject[],

  // Grouped, deduplicated skills: each technology appears exactly once
  skills: [
    {
      title: 'Core Languages',
      description: 'Languages used in backend services, client logic, and database operations.',
      skills: [
        { name: 'Python', relatedProject: 'KarigarKart' },
        { name: 'TypeScript', relatedProject: 'InnerSight' },
        { name: 'JavaScript', relatedProject: 'RouteGuard' },
        { name: 'Dart', relatedProject: 'KarigarKart' },
        { name: 'SQL', relatedProject: 'KarigarKart' },
      ],
    },
    {
      title: 'Frameworks & 3D',
      description: 'WebGL spatial visualization, frontend rendering, and API architectures.',
      skills: [
        { name: 'Three.js', relatedProject: 'InnerSight' },
        { name: 'FastAPI', relatedProject: 'KarigarKart' },
        { name: 'React', relatedProject: 'InnerSight' },
        { name: 'Next.js', relatedProject: 'Portfolio' },
        { name: 'Flutter', relatedProject: 'KarigarKart' },
        { name: 'Tailwind CSS', relatedProject: 'Portfolio' },
      ],
    },
    {
      title: 'Databases & Systems',
      description: 'Data storage, API protocols, version control, and cloud deployment.',
      skills: [
        { name: 'PostgreSQL', relatedProject: 'KarigarKart' },
        { name: 'REST APIs', relatedProject: 'KarigarKart' },
        { name: 'Express', relatedProject: 'RouteGuard' },
        { name: 'Git & GitHub', relatedProject: 'Open Source' },
        { name: 'Vercel', relatedProject: 'Portfolio' },
      ],
    },
  ] as SkillCategory[],

  hackathons: [
    {
      id: 'smart-health-2025',
      officialEventName: 'Smart Health Hackathon 2025',
      organizer: 'Smart Health Hackathon 2025',
      year: '2025',
      placement: '1st Place Winner',
      category: 'Healthcare & Spatial Tech',
      whatIBuilt: 'Built InnerSight, an interactive 3D hospital wayfinding tool featuring weighted graph routing (A*) with sub-millisecond compute time on benchmark floorplans* to guide visitors across 3 hospital floors.',
      evidenceUrl: 'https://github.com/touzeeh',
      evidenceImage: '/wins/innersight-win.svg',
      projectTitle: 'InnerSight',
      tags: ['1st Place', 'Three.js', 'A* Algorithm'],
    },
    {
      id: 'central-india-summit-2025',
      officialEventName: 'Central India Developer Summit 2025',
      organizer: 'Regional Developer Summit',
      year: '2025',
      placement: 'Best Full-Stack Project',
      category: 'E-Commerce & Digital Systems',
      whatIBuilt: 'Built KarigarKart, an artisan inventory and order management platform combining a normalized FastAPI backend with a cross-platform Flutter client.',
      evidenceUrl: 'https://github.com/touzeeh/KarigarKartBackend',
      evidenceImage: '/wins/karigarkart-win.svg',
      projectTitle: 'KarigarKart',
      tags: ['Best Full-Stack', 'FastAPI', 'PostgreSQL'],
    },
  ] as HackathonAward[],

  about: {
    paragraphs: [
      "I am a 2nd-year Computer Science undergraduate who enjoys building software where visual clarity meets reliable backend architecture.",
      "My recent work focuses on graph routing in Three.js and structured API development. With InnerSight, I built multi-floor wayfinding algorithms in WebGL; with KarigarKart, I designed a normalized PostgreSQL schema and REST backend.",
      "I value readable code, measurable execution speed, and calm user interfaces. When I am not building, I study graph algorithms and maintain lightweight open-source utilities.",
    ],
    facts: [
      { label: 'Location', value: 'Bhopal, India' },
      { label: 'Education', value: 'BTech in Computer Science (2nd Year)' },
      { label: 'Hiring Window', value: 'Summer 2027 internships' },
      { label: 'Primary Focus', value: 'Three.js WebGL & FastAPI / TypeScript' },
    ],
  },
};

// Backward-compatibility exports for existing code
export const PERSONAL_INFO = SITE_DATA.personal;
export const NAV_SECTIONS = SITE_DATA.nav;
export const PROJECTS = SITE_DATA.projects;
export const SKILL_CATEGORIES = SITE_DATA.skills;
export const WINS = SITE_DATA.hackathons;

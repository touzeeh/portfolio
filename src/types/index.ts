export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  role: string;
  stack: string[];
  whatIBuilt: string;
  result: string;
  liveUrl?: string;
  githubUrl: string;
  secondaryGithubUrl?: string;
  secondaryGithubLabel?: string;
  featured?: boolean;
  accent: 'violet' | 'teal' | 'indigo';
}

export interface SkillCategory {
  name: string;
  description: string;
  items: string[];
  accentColor: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  title: string;
  organization: string;
  location: string;
  type: 'education' | 'hackathon' | 'certification' | 'opensource';
  description: string;
  tags?: string[];
  isPlaceholder?: boolean;
}

export interface NavSection {
  id: string;
  label: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  website_hp?: string; // Honeypot field
}

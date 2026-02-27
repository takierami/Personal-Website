export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: ProjectCategory;
  image: string;
  github?: string;
  demo?: string;
  stars?: number;
  forks?: number;
  commits?: number;
  featured: boolean;
  year: number;
  technologies: string[];
  achievements: string[];
}

export type ProjectCategory = "all" | "web" | "mobile" | "ai" | "blockchain" | "devtools";

export interface Experience {
  id: string;
  company: string;
  role: string;
  type: "work" | "education" | "certification";
  period: {
    start: string;
    end: string | "Present";
  };
  location: string;
  description: string[];
  achievements: string[];
  technologies?: string[];
  logo?: string;
  link?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number;
  yearsOfExperience: number;
  projects: number;
}

export type SkillCategory = 
  | "frontend" 
  | "backend" 
  | "devops" 
  | "database" 
  | "mobile" 
  | "ai" 
  | "blockchain" 
  | "tools";

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  color: string;
  handle?: string;
}

export interface GitHubContribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  linkedin?: string;
  rating: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget?: string;
  timeline?: string;
}

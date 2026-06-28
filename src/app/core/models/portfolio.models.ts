export interface Skill {
  id?: string;
  name: string;
  category: 'Languages & Frameworks' | 'AI-Assisted Development' | 'Libraries & Tools' | 'Core Competencies' | 'Cloud & DevOps';
  iconClass: string;
  proficiency: number;
}

export interface Experience {
  id?: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string[];
  skills?: string[];
}

export interface Education {
  id?: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  score: string;
}

export interface Project {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  techStack: string[];
  longDescription?: string; // Optional detailed description for expanded view
}

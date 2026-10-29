export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  category: 'web-dev' | 'ml-ai' | 'iot' | 'software';
  categoryLabel: string;
  description: string;
  fullOverview: string;
  architectureDetails: string[];
  features: string[];
  techStack: string[];
  award?: string;
  isSpecialSelection?: boolean;
  githubUrl: string;
  liveDemoUrl?: string;
  icon: string;
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
  };
  fileTree?: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  command: string;
  icon: string;
  skills: {
    name: string;
    level: number;
    description?: string;
  }[];
  chips?: string[];
}

export interface TimelineItem {
  id: string;
  type: 'education' | 'experience';
  period: string;
  title: string;
  organization: string;
  location: string;
  badge?: string;
  commitHash: string;
  commitMessage: string;
  description: string;
  highlights: string[];
  techUsed?: string[];
}

export interface Certificate {
  id: string;
  title: string;
  institution: string;
  year: string;
  category: string;
  image: string;
  icon: string;
  verified: boolean;
  awardBadge?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  avatarText: string;
}

export interface CounterStat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    headline: string;
    roles: string[];
    bioShort: string;
    bioLong: string[];
    location: string;
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    resumePdf: string;
    profilePhoto: string;
    availability: string;
  };
  stats: CounterStat[];
  skillsCategories: SkillCategory[];
  timeline: TimelineItem[];
  projects: Project[];
  certificates: Certificate[];
  testimonials: Testimonial[];
  faqChatbot: {
    question: string;
    answer: string;
    category: string;
  }[];
  emailConfig: {
    serviceId: string;
    templateId: string;
    publicKey: string;
    recipientEmail: string;
    autoReplyMessage?: string;
    web3FormsAccessKey?: string;
  };
}

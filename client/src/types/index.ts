// Candidate types
export interface Candidate {
  _id?: string;
  candidateType: 'Fresher' | 'Experienced';
  firstName: string;
  lastName: string;
  fullNameAadhar: string;
  email: string;
  phone: string;
  address?: string;
  
  // Skills
  skills: string[];
  skillCategory?: 'IT' | 'Non-IT';
  
  // Education
  education?: {
    highestQualification?: string;
    institution?: string;
    graduationYear?: number;
    degree?: string;
    fieldOfStudy?: string;
  };
  
  // For Experienced Only
  totalExperience?: number;
  currentCompany?: string;
  currentDesignation?: string;
  joiningDate?: string;
  relievingDate?: string;
  currentSalary?: number;
  noticePeriod?: string;
  currentCTC?: number;
  expectedCTC?: number;
  currentJobTitle?: string;
  
  // Resume
  resumeUrl?: string;
  resumeFileName?: string;
  latestResumeUrl?: string;
  latestResumeFileName?: string;
  
  // Optional
  linkedinProfile?: string;
  portfolioUrl?: string;
  experienceSummary?: string;
  preferredLocations?: string[];
  openToRelocation?: boolean;
  
  // System
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Job types
export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';
  category: 'IT' | 'Non-IT';
  experience: {
    min: number;
    max: number;
  };
  salary?: {
    min?: number;
    max?: number;
    currency?: string;
    isNegotiable?: boolean;
  };
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  benefits?: string[];
  openings?: number;
  status: 'Active' | 'Closed' | 'On Hold' | 'Filled';
  applicationDeadline?: string;
  views?: number;
  applicationCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Inquiry types
export interface Inquiry {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  inquiryType: 'General' | 'Recruitment' | 'Partnership' | 'Support' | 'Other';
  status?: string;
  createdAt?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    pages: number;
    currentPage: number;
    perPage: number;
  };
}

// Form step types for multi-step form
export interface FormStep {
  id: string;
  title: string;
  description: string;
  fields: string[];
}

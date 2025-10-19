// API endpoints configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Candidate endpoints
  CANDIDATE_REGISTER: `${API_BASE_URL}/candidates/register`,
  CANDIDATES_LIST: `${API_BASE_URL}/candidates`,
  CANDIDATE_BY_ID: (id) => `${API_BASE_URL}/candidates/${id}`,
  CANDIDATE_UPDATE_STATUS: (id) => `${API_BASE_URL}/candidates/${id}/status`,
  CANDIDATE_ADD_NOTE: (id) => `${API_BASE_URL}/candidates/${id}/notes`,
  CANDIDATES_SEARCH: `${API_BASE_URL}/candidates/search/query`,
  CANDIDATES_BY_SKILL: (skill) => `${API_BASE_URL}/candidates/skills/${skill}`,
  
  // Job endpoints
  JOBS_CREATE: `${API_BASE_URL}/jobs`,
  JOBS_LIST: `${API_BASE_URL}/jobs/list`,
  JOBS_ACTIVE: `${API_BASE_URL}/jobs/active`,
  JOB_BY_ID: (id) => `${API_BASE_URL}/jobs/${id}`,
  JOB_UPDATE: (id) => `${API_BASE_URL}/jobs/${id}`,
  JOB_DELETE: (id) => `${API_BASE_URL}/jobs/${id}`,
  JOB_APPLY: (id) => `${API_BASE_URL}/jobs/${id}/apply`,
  JOB_VIEW: (id) => `${API_BASE_URL}/jobs/${id}/view`,
  JOBS_SEARCH: `${API_BASE_URL}/jobs/search/query`,
  
  // Contact endpoints
  CONTACT_SUBMIT: `${API_BASE_URL}/contact/inquiry`,
  INQUIRIES_LIST: `${API_BASE_URL}/contact/inquiries`,
  INQUIRY_BY_ID: (id) => `${API_BASE_URL}/contact/inquiries/${id}`,
  INQUIRY_UPDATE_STATUS: (id) => `${API_BASE_URL}/contact/inquiries/${id}/status`,
  INQUIRY_RESPOND: (id) => `${API_BASE_URL}/contact/inquiries/${id}/respond`,
  
  // Health check
  HEALTH_CHECK: `${API_BASE_URL}/health`
};

// Form field options
export const FORM_OPTIONS = {
  NOTICE_PERIODS: [
    { value: 'Immediate', label: 'Immediate' },
    { value: '15 days', label: '15 days' },
    { value: '30 days', label: '30 days' },
    { value: '60 days', label: '60 days' },
    { value: '90 days', label: '90 days' },
    { value: 'More than 90 days', label: 'More than 90 days' }
  ],
  
  JOB_TYPES: [
    { value: 'Full-time', label: 'Full-time' },
    { value: 'Part-time', label: 'Part-time' },
    { value: 'Contract', label: 'Contract' },
    { value: 'Freelance', label: 'Freelance' },
    { value: 'Internship', label: 'Internship' }
  ],
  
  SKILL_CATEGORIES: [
    { value: 'IT', label: 'IT' },
    { value: 'Non-IT', label: 'Non-IT' }
  ],
  
  INQUIRY_TYPES: [
    { value: 'General', label: 'General Inquiry' },
    { value: 'Recruitment', label: 'Recruitment Services' },
    { value: 'Partnership', label: 'Partnership Opportunity' },
    { value: 'Support', label: 'Support' },
    { value: 'Other', label: 'Other' }
  ],
  
  CANDIDATE_STATUS: [
    { value: 'New', label: 'New' },
    { value: 'Shortlisted', label: 'Shortlisted' },
    { value: 'Interview Scheduled', label: 'Interview Scheduled' },
    { value: 'Rejected', label: 'Rejected' },
    { value: 'Selected', label: 'Selected' },
    { value: 'On Hold', label: 'On Hold' }
  ],
  
  JOB_STATUS: [
    { value: 'Active', label: 'Active' },
    { value: 'Closed', label: 'Closed' },
    { value: 'On Hold', label: 'On Hold' },
    { value: 'Filled', label: 'Filled' }
  ],
  
  INQUIRY_STATUS: [
    { value: 'New', label: 'New' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Resolved', label: 'Resolved' },
    { value: 'Closed', label: 'Closed' }
  ]
};

// IT Skills list
export const IT_SKILLS = [
  // Programming Languages
  'JavaScript', 'Python', 'Java', 'C#', 'C++', 'PHP', 'Ruby', 'Go', 'Swift', 'Kotlin', 'TypeScript', 'Rust', 'Scala',
  
  // Frontend
  'React', 'Angular', 'Vue.js', 'HTML5', 'CSS3', 'SASS', 'Bootstrap', 'Material-UI', 'Tailwind CSS', 'jQuery',
  
  // Backend
  'Node.js', 'Express.js', 'Django', 'Flask', 'Spring Boot', '.NET Core', 'Ruby on Rails', 'Laravel',
  
  // Databases
  'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Oracle', 'SQL Server', 'Cassandra', 'DynamoDB',
  
  // Cloud & DevOps
  'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Jenkins', 'CI/CD', 'Terraform', 'Ansible',
  
  // Mobile
  'React Native', 'Flutter', 'iOS Development', 'Android Development', 'Xamarin',
  
  // Other
  'Git', 'REST API', 'GraphQL', 'Microservices', 'Machine Learning', 'AI', 'Blockchain', 'Cybersecurity'
];

// Non-IT Skills list
export const NON_IT_SKILLS = [
  // BPO/KPO
  'Customer Service', 'Technical Support', 'Chat Support', 'Email Support', 'Voice Process', 'Non-Voice Process',
  
  // Sales & Marketing
  'Sales', 'Digital Marketing', 'Content Writing', 'SEO', 'Social Media Marketing', 'Business Development',
  
  // HR & Admin
  'Human Resources', 'Recruitment', 'Payroll', 'Administration', 'Office Management',
  
  // Finance & Accounting
  'Accounting', 'Finance', 'Taxation', 'Audit', 'Financial Analysis',
  
  // Operations
  'Operations Management', 'Supply Chain', 'Logistics', 'Quality Assurance', 'Process Improvement'
];

// Indian cities for location preferences
export const INDIAN_CITIES = [
  'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Gurgaon', 'Noida',
  'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal',
  'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Coimbatore', 'Kochi', 'Chandigarh'
];

export default API_ENDPOINTS;

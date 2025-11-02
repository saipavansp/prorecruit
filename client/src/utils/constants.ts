// API Base URL [[memory:8007179]]
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Company Information
export const COMPANY_INFO = {
  name: 'Pro Recruit Technologies',
  tagline: 'Making dreams and aspirations come true',
  established: 'January 2024',
  location: 'Bangalore',
  address: '#91/3 Ground Floor, Right Side, 5th Cross, Opp. Anjan Cinemas, Lakshminarayanapuram, Binnipete, Magadi Road, Bengaluru, Karnataka 560023',
  email: 'info@prorecruittechnologies.com',
  phone: '+91 9113610407',
  employeeCount: '10-30'
};

// Color Scheme
export const COLORS = {
  primary: '#5DADE2', // Light blue
  secondary: '#95A5A6', // Grey
  white: '#FFFFFF',
  dark: '#2C3E50',
  success: '#27AE60',
  error: '#E74C3C',
  warning: '#F39C12',
  lightGray: '#ECF0F1',
  darkGray: '#34495E'
};

// Client Logos
export const CLIENTS = [
  { name: 'Sagility', logo: '/images/clients/sagility.png' },
  { name: 'Startek', logo: '/images/clients/starktek.png' }, // Note: using your filename
  { name: 'iSON', logo: '/images/clients/ison.png' },
  { name: 'Altruist', logo: '/images/clients/altruist.png' } // Will use placeholder if not added
];

// Form Options
export const NOTICE_PERIODS = [
  'Immediate',
  '15 days',
  '30 days',
  '60 days',
  '90 days',
  'More than 90 days'
];

export const JOB_TYPES = [
  'Full-time',
  'Part-time',
  'Contract',
  'Freelance',
  'Internship'
];

export const SKILL_CATEGORIES = ['IT', 'Non-IT'];

export const INQUIRY_TYPES = [
  'General',
  'Recruitment',
  'Partnership',
  'Support',
  'Other'
];

// IT Skills
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

// Non-IT Skills
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

// Indian Cities
export const INDIAN_CITIES = [
  'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Gurgaon', 'Noida',
  'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal',
  'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Coimbatore', 'Kochi', 'Chandigarh'
];

// Statistics for homepage
export const COMPANY_STATS = [
  { label: 'Candidates Placed', value: 500, suffix: '+' },
  { label: 'Client Companies', value: 50, suffix: '+' },
  { label: 'Years of Experience', value: 1.9, suffix: '' },
  { label: 'Success Rate', value: 95, suffix: '%' }
];

// Services - Sector-based Staffing
export const SERVICES = {
  CONSUMER: {
    title: 'Consumer Sector Staffing',
    items: [
      'Contractual or temporary staffing',
      'Payroll support services',
      'HR administrative solutions',
      'Consumer Goods and Durables / Home Appliances',
      'Consumer Products / FMCG',
      'Healthcare / Para-Medical Services'
    ]
  },
  INDUSTRIAL: {
    title: 'Industrial Sector Staffing',
    items: [
      'Contractual or temporary staffing',
      'Payroll support services',
      'HR administrative solutions',
      'Automobile/Automotive/Auto Components',
      'Engineering / Procurement & Construction',
      'Infrastructure / Utilities'
    ]
  },
  RETAIL: {
    title: 'Retail & Ecommerce Sector Staffing',
    items: [
      'Contractual or temporary staffing',
      'Payroll support services',
      'HR administrative solutions',
      'Retail and E - Commerce',
      'Hospitality-Hotel / Resorts / Restaurants',
      'Transportation (Surface / Air / Marine)'
    ]
  },
  EMERGING: {
    title: 'Emerging Sector Staffing',
    items: [
      'Contractual or temporary staffing',
      'Payroll support services',
      'HR administrative solutions',
      'Agriculture / Forestry',
      'Dairy / Poultry / Fishery'
    ]
  },
  IT_SECTOR: {
    title: 'IT Sector Staffing',
    items: [
      'Temporary & permanent staffing',
      'Consulting',
      'IT infrastructure management',
      'Offshore Development and Quality Assurance'
    ]
  },
  TELECOM: {
    title: 'Telecom Sector Staffing',
    items: [
      'IT telecom recruitment',
      'Consulting and training',
      'NOC & global NOC',
      'Telecom integration & radio frequency',
      'Telecom & ISP'
    ]
  }
};

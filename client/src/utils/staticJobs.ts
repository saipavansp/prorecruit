import { Job } from '../types';

// Static featured jobs - manually curated
// For Version 1, these are hardcoded. In future, admin can add via backend.
export const FEATURED_JOBS: Job[] = [
  {
    _id: '1',
    title: 'Senior Software Engineer',
    company: 'Sagility',
    location: 'Bangalore',
    jobType: 'Full-time',
    category: 'IT',
    experience: { min: 3, max: 6 },
    salary: { min: 12, max: 18, currency: 'INR', isNegotiable: true },
    description: 'We are looking for an experienced Software Engineer to join our growing team. You will work on cutting-edge technologies and contribute to scalable applications.',
    requirements: [
      '3-6 years of software development experience',
      'Strong knowledge of JavaScript/TypeScript',
      'Experience with React and Node.js',
      'Good understanding of databases (SQL/NoSQL)',
      'Excellent problem-solving skills'
    ],
    responsibilities: [
      'Design and develop scalable web applications',
      'Collaborate with cross-functional teams',
      'Write clean, maintainable code',
      'Participate in code reviews',
      'Mentor junior developers'
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'TypeScript', 'Git'],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Work from home options',
      'Learning and development opportunities'
    ],
    openings: 3,
    status: 'Active',
    views: 245,
    createdAt: '2024-01-15'
  },
  {
    _id: '2',
    title: 'Team Lead - BPO Operations',
    company: 'Startek',
    location: 'Hyderabad',
    jobType: 'Full-time',
    category: 'Non-IT',
    experience: { min: 5, max: 8 },
    salary: { min: 8, max: 12, currency: 'INR', isNegotiable: true },
    description: 'Leading BPO company looking for an experienced Team Lead to manage customer service operations and drive team performance.',
    requirements: [
      '5-8 years in BPO/KPO operations',
      'Proven leadership experience',
      'Excellent communication skills',
      'Experience with US/UK clients',
      'Performance management expertise'
    ],
    responsibilities: [
      'Manage team of 15-20 agents',
      'Monitor performance metrics',
      'Conduct training and coaching',
      'Handle escalations',
      'Report to operations manager'
    ],
    skills: ['Customer Service', 'Team Management', 'Voice Process', 'Quality Assurance', 'Communication'],
    benefits: [
      'Night shift allowance',
      'Performance bonuses',
      'Health insurance',
      'Career growth opportunities'
    ],
    openings: 2,
    status: 'Active',
    views: 189,
    createdAt: '2024-01-18'
  },
  {
    _id: '3',
    title: 'Full Stack Developer',
    company: 'iSON',
    location: 'Bangalore',
    jobType: 'Full-time',
    category: 'IT',
    experience: { min: 2, max: 5 },
    salary: { min: 10, max: 15, currency: 'INR', isNegotiable: true },
    description: 'Join our innovative team as a Full Stack Developer. Work on modern tech stack and build solutions that impact thousands of users.',
    requirements: [
      '2-5 years full stack development',
      'Proficiency in React and Node.js',
      'Experience with REST APIs',
      'Database design knowledge',
      'Git version control'
    ],
    responsibilities: [
      'Develop frontend and backend features',
      'Build RESTful APIs',
      'Database design and optimization',
      'Unit testing and debugging',
      'Collaborate with product team'
    ],
    skills: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'JavaScript', 'CSS'],
    benefits: [
      'Flexible working hours',
      'Modern tech stack',
      'Learning budget',
      'Team outings'
    ],
    openings: 4,
    status: 'Active',
    views: 312,
    createdAt: '2024-01-20'
  },
  {
    _id: '4',
    title: 'Customer Support Executive',
    company: 'Altruist',
    location: 'Chennai',
    jobType: 'Full-time',
    category: 'Non-IT',
    experience: { min: 1, max: 3 },
    salary: { min: 3, max: 5, currency: 'INR', isNegotiable: false },
    description: 'We are hiring Customer Support Executives for our growing team. Handle customer queries via phone, email, and chat.',
    requirements: [
      '1-3 years in customer support',
      'Excellent English communication',
      'Computer proficiency',
      'Problem-solving mindset',
      'Willing to work in shifts'
    ],
    responsibilities: [
      'Handle customer inquiries',
      'Resolve issues promptly',
      'Maintain customer satisfaction',
      'Document interactions',
      'Meet quality targets'
    ],
    skills: ['Customer Service', 'Communication', 'Email Support', 'Chat Support', 'MS Office'],
    benefits: [
      'Fixed shifts available',
      'Health insurance',
      'Performance incentives',
      'Training provided'
    ],
    openings: 10,
    status: 'Active',
    views: 478,
    createdAt: '2024-01-22'
  },
  {
    _id: '5',
    title: 'DevOps Engineer',
    company: 'Tech Innovators',
    location: 'Pune',
    jobType: 'Full-time',
    category: 'IT',
    experience: { min: 3, max: 6 },
    salary: { min: 14, max: 20, currency: 'INR', isNegotiable: true },
    description: 'Seeking a skilled DevOps Engineer to manage our cloud infrastructure and CI/CD pipelines.',
    requirements: [
      '3-6 years DevOps experience',
      'AWS/Azure cloud expertise',
      'Docker and Kubernetes knowledge',
      'CI/CD pipeline setup',
      'Linux administration skills'
    ],
    responsibilities: [
      'Manage cloud infrastructure',
      'Build and maintain CI/CD pipelines',
      'Monitor system performance',
      'Automate deployment processes',
      'Ensure system security'
    ],
    skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Linux', 'Python', 'Terraform'],
    benefits: [
      'Remote work option',
      'Latest tools and technologies',
      'Conference attendance',
      'Stock options'
    ],
    openings: 2,
    status: 'Active',
    views: 267,
    createdAt: '2024-01-25'
  },
  {
    _id: '6',
    title: 'Business Analyst',
    company: 'Analytics Pro',
    location: 'Mumbai',
    jobType: 'Full-time',
    category: 'Non-IT',
    experience: { min: 2, max: 5 },
    salary: { min: 6, max: 10, currency: 'INR', isNegotiable: true },
    description: 'Join our team as a Business Analyst to bridge the gap between business needs and technology solutions.',
    requirements: [
      '2-5 years as Business Analyst',
      'Strong analytical skills',
      'Excel and data analysis',
      'Requirement gathering experience',
      'Good presentation skills'
    ],
    responsibilities: [
      'Gather business requirements',
      'Create functional specifications',
      'Analyze data and trends',
      'Present insights to stakeholders',
      'Support implementation teams'
    ],
    skills: ['Business Analysis', 'Excel', 'SQL', 'Data Analysis', 'Communication', 'Documentation'],
    benefits: [
      'Professional development',
      'Work-life balance',
      'Health benefits',
      'Bonus structure'
    ],
    openings: 3,
    status: 'Active',
    views: 198,
    createdAt: '2024-01-28'
  },
  {
    _id: '7',
    title: 'React Developer',
    company: 'Digital Solutions Ltd',
    location: 'Bangalore',
    jobType: 'Contract',
    category: 'IT',
    experience: { min: 2, max: 4 },
    salary: { min: 8, max: 12, currency: 'INR', isNegotiable: true },
    description: 'Contract opportunity for React Developer to work on exciting e-commerce platform. 6-month contract with extension possibility.',
    requirements: [
      '2-4 years React development',
      'Strong JavaScript/ES6 knowledge',
      'State management (Redux/Context)',
      'Responsive design expertise',
      'RESTful API integration'
    ],
    responsibilities: [
      'Build reusable React components',
      'Implement responsive designs',
      'Optimize application performance',
      'Write unit tests',
      'Code reviews and documentation'
    ],
    skills: ['React', 'JavaScript', 'Redux', 'HTML5', 'CSS3', 'REST API'],
    openings: 2,
    status: 'Active',
    views: 334,
    createdAt: '2024-01-30'
  },
  {
    _id: '8',
    title: 'HR Recruiter',
    company: 'People Solutions',
    location: 'Delhi',
    jobType: 'Full-time',
    category: 'Non-IT',
    experience: { min: 1, max: 3 },
    salary: { min: 4, max: 7, currency: 'INR', isNegotiable: true },
    description: 'Growing recruitment firm looking for passionate HR Recruiter to help us place talented candidates.',
    requirements: [
      '1-3 years recruitment experience',
      'Knowledge of hiring processes',
      'Excellent interpersonal skills',
      'Target-oriented mindset',
      'Proficiency in LinkedIn recruiting'
    ],
    responsibilities: [
      'Source and screen candidates',
      'Conduct initial interviews',
      'Coordinate with clients',
      'Maintain candidate database',
      'Achieve placement targets'
    ],
    skills: ['Recruitment', 'HR', 'Communication', 'LinkedIn', 'Interviewing', 'Negotiation'],
    benefits: [
      'Performance incentives',
      'Career growth',
      'Training programs',
      'Flexible hours'
    ],
    openings: 5,
    status: 'Active',
    views: 156,
    createdAt: '2024-02-01'
  },
  {
    _id: '9',
    title: 'Python Developer',
    company: 'Data Systems Inc',
    location: 'Hyderabad',
    jobType: 'Full-time',
    category: 'IT',
    experience: { min: 3, max: 5 },
    salary: { min: 11, max: 16, currency: 'INR', isNegotiable: true },
    description: 'Exciting opportunity for Python Developer to work on data analytics and machine learning projects.',
    requirements: [
      '3-5 years Python development',
      'Experience with Django/Flask',
      'Data analysis skills',
      'Knowledge of SQL databases',
      'API development experience'
    ],
    responsibilities: [
      'Develop Python applications',
      'Build data pipelines',
      'Create REST APIs',
      'Optimize code performance',
      'Collaborate with data scientists'
    ],
    skills: ['Python', 'Django', 'Flask', 'PostgreSQL', 'REST API', 'Data Analysis'],
    benefits: [
      'Remote work option',
      'Latest technologies',
      'Learning opportunities',
      'Health insurance'
    ],
    openings: 3,
    status: 'Active',
    views: 289,
    createdAt: '2024-02-03'
  },
  {
    _id: '10',
    title: 'Sales Executive',
    company: 'Market Leaders',
    location: 'Bangalore',
    jobType: 'Full-time',
    category: 'Non-IT',
    experience: { min: 1, max: 4 },
    salary: { min: 4, max: 8, currency: 'INR', isNegotiable: true },
    description: 'Dynamic Sales Executive needed to drive business growth. Great opportunity for career advancement in sales.',
    requirements: [
      '1-4 years B2B sales experience',
      'Excellent negotiation skills',
      'Target-driven approach',
      'Good presentation skills',
      'Own vehicle preferred'
    ],
    responsibilities: [
      'Generate new business leads',
      'Meet sales targets',
      'Build client relationships',
      'Prepare sales reports',
      'Conduct product demonstrations'
    ],
    skills: ['Sales', 'Business Development', 'Negotiation', 'Communication', 'CRM'],
    benefits: [
      'High incentive structure',
      'Travel allowance',
      'Mobile reimbursement',
      'Career progression'
    ],
    openings: 6,
    status: 'Active',
    views: 421,
    createdAt: '2024-02-05'
  }
];

export default FEATURED_JOBS;

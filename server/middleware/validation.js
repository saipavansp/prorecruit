const { body, validationResult } = require('express-validator');

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

// Candidate validation rules
exports.validateCandidate = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 2 }).withMessage('First name must be at least 2 characters'),
  
  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ min: 2 }).withMessage('Last name must be at least 2 characters'),
  
  body('fullNameAadhar')
    .trim()
    .notEmpty().withMessage('Full name as per Aadhar is required')
    .isLength({ min: 3 }).withMessage('Full name must be at least 3 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[6-9]\d{9}$/).withMessage('Please provide a valid Indian phone number'),
  
  body('totalExperience')
    .optional()
    .isNumeric().withMessage('Experience must be a number')
    .isFloat({ min: 0 }).withMessage('Experience cannot be negative'),
  
  body('currentCTC')
    .optional()
    .isNumeric().withMessage('Current CTC must be a number')
    .isFloat({ min: 0 }).withMessage('Current CTC cannot be negative'),
  
  body('expectedCTC')
    .optional()
    .isNumeric().withMessage('Expected CTC must be a number')
    .isFloat({ min: 0 }).withMessage('Expected CTC cannot be negative'),
  
  body('currentJobTitle')
    .optional()
    .trim(),
  
  body('noticePeriod')
    .optional()
    .isIn(['Immediate', '15 days', '30 days', '60 days', '90 days', 'More than 90 days'])
    .withMessage('Invalid notice period'),
  
  body('candidateType')
    .optional()
    .isIn(['Fresher', 'Experienced']).withMessage('Candidate type must be Fresher or Experienced'),
  
  body('skillCategory')
    .optional(),
  
  body('skills')
    .optional(),
  
  body('preferredLocations')
    .optional(),
  
  // Address validation (optional but typed)
  body('address.street').optional().trim(),
  body('address.postalCode').optional().trim(),
  body('address.city').optional().trim(),
  body('address.province').optional().trim(),
  body('address.country').optional().trim(),
  
  // Education (optional)
  body('education.highestQualification').optional().trim(),
  body('education.institution').optional().trim(),
  body('education.graduationYear').optional().isInt({ min: 1900, max: 2100 }).withMessage('Invalid graduation year'),
  
  validate
];

// Job validation rules
exports.validateJob = [
  body('title')
    .trim()
    .notEmpty().withMessage('Job title is required')
    .isLength({ min: 3 }).withMessage('Job title must be at least 3 characters'),
  
  body('company')
    .trim()
    .notEmpty().withMessage('Company name is required'),
  
  body('location')
    .trim()
    .notEmpty().withMessage('Location is required'),
  
  body('jobType')
    .notEmpty().withMessage('Job type is required')
    .isIn(['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'])
    .withMessage('Invalid job type'),
  
  body('category')
    .notEmpty().withMessage('Category is required')
    .isIn(['IT', 'Non-IT']).withMessage('Category must be IT or Non-IT'),
  
  body('experience.min')
    .notEmpty().withMessage('Minimum experience is required')
    .isNumeric().withMessage('Minimum experience must be a number')
    .isFloat({ min: 0 }).withMessage('Minimum experience cannot be negative'),
  
  body('experience.max')
    .notEmpty().withMessage('Maximum experience is required')
    .isNumeric().withMessage('Maximum experience must be a number')
    .custom((value, { req }) => {
      if (parseFloat(value) < parseFloat(req.body.experience.min)) {
        throw new Error('Maximum experience must be greater than minimum experience');
      }
      return true;
    }),
  
  body('description')
    .trim()
    .notEmpty().withMessage('Job description is required')
    .isLength({ min: 50 }).withMessage('Job description must be at least 50 characters'),
  
  body('skills')
    .custom((value) => {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        throw new Error('At least one skill is required');
      }
      return true;
    }),
  
  body('openings')
    .optional()
    .isInt({ min: 1 }).withMessage('Number of openings must be at least 1'),
  
  validate
];

// Inquiry validation rules
exports.validateInquiry = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^[6-9]\d{9}$/).withMessage('Please provide a valid Indian phone number'),
  
  body('subject')
    .trim()
    .notEmpty().withMessage('Subject is required')
    .isLength({ min: 5 }).withMessage('Subject must be at least 5 characters'),
  
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
  
  body('inquiryType')
    .optional()
    .isIn(['General', 'Recruitment', 'Partnership', 'Support', 'Other'])
    .withMessage('Invalid inquiry type'),
  
  validate
];

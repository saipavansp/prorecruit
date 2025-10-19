const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  // Personal Details
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  fullNameAadhar: {
    type: String,
    required: [true, 'Full name as per Aadhar is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[6-9]\d{9}$/, 'Please provide a valid Indian phone number']
  },
  
  // Professional Information
  totalExperience: {
    type: Number,
    required: [true, 'Total experience is required'],
    min: 0
  },
  currentCTC: {
    type: Number,
    required: [true, 'Current CTC is required'],
    min: 0
  },
  expectedCTC: {
    type: Number,
    required: [true, 'Expected CTC is required'],
    min: 0
  },
  noticePeriod: {
    type: String,
    required: [true, 'Notice period is required'],
    enum: ['Immediate', '15 days', '30 days', '60 days', '90 days', 'More than 90 days']
  },
  currentCompany: {
    type: String,
    trim: true
  },
  currentDesignation: {
    type: String,
    trim: true
  },
  currentJobTitle: {
    type: String,
    trim: true
  },
  
  // Skills
  skills: [{
    type: String,
    trim: true
  }],
  skillCategory: {
    type: String,
    required: true,
    enum: ['IT', 'Non-IT']
  },
  
  // Job Preferences
  preferredLocations: [{
    type: String,
    trim: true
  }],
  openToRelocation: {
    type: Boolean,
    default: false
  },
  
  // Resume
  resumeUrl: {
    type: String,
    required: [true, 'Resume is required']
  },
  resumeFileName: {
    type: String
  },
  latestResumeUrl: {
    type: String
  },
  latestResumeFileName: {
    type: String
  },
  
  // Additional Information
  linkedinProfile: {
    type: String,
    trim: true
  },
  portfolioUrl: {
    type: String,
    trim: true
  },
  experienceSummary: {
    type: String,
    trim: true
  },
  education: {
    highestQualification: { type: String, trim: true },
    institution: { type: String, trim: true },
    graduationYear: { type: Number }
  },
  address: {
    street: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    city: { type: String, trim: true },
    province: { type: String, trim: true },
    country: { type: String, trim: true }
  },
  
  // Status
  status: {
    type: String,
    enum: ['New', 'Shortlisted', 'Interview Scheduled', 'Rejected', 'Selected', 'On Hold'],
    default: 'New'
  },
  
  // Source
  source: {
    type: String,
    default: 'Website'
  },
  
  // Notes
  notes: [{
    text: String,
    addedBy: String,
    addedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Index for search
candidateSchema.index({ 
  firstName: 'text', 
  lastName: 'text', 
  email: 'text', 
  skills: 'text' 
});

// Virtual for full name
candidateSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Method to add note
candidateSchema.methods.addNote = function(noteText, addedBy) {
  this.notes.push({
    text: noteText,
    addedBy: addedBy
  });
  return this.save();
};

module.exports = mongoose.model('Candidate', candidateSchema);

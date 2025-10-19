const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  jobType: {
    type: String,
    required: true,
    enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship']
  },
  category: {
    type: String,
    required: true,
    enum: ['IT', 'Non-IT']
  },
  experience: {
    min: {
      type: Number,
      required: true,
      min: 0
    },
    max: {
      type: Number,
      required: true
    }
  },
  salary: {
    min: {
      type: Number,
      min: 0
    },
    max: {
      type: Number
    },
    currency: {
      type: String,
      default: 'INR'
    },
    isNegotiable: {
      type: Boolean,
      default: true
    }
  },
  description: {
    type: String,
    required: [true, 'Job description is required']
  },
  requirements: [{
    type: String
  }],
  responsibilities: [{
    type: String
  }],
  skills: [{
    type: String,
    trim: true
  }],
  benefits: [{
    type: String
  }],
  openings: {
    type: Number,
    default: 1,
    min: 1
  },
  status: {
    type: String,
    enum: ['Active', 'Closed', 'On Hold', 'Filled'],
    default: 'Active'
  },
  applicationDeadline: {
    type: Date
  },
  postedBy: {
    type: String,
    default: 'Admin'
  },
  views: {
    type: Number,
    default: 0
  },
  applications: [{
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate'
    },
    appliedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['Applied', 'Under Review', 'Shortlisted', 'Rejected', 'Selected'],
      default: 'Applied'
    }
  }]
}, {
  timestamps: true
});

// Index for search
jobSchema.index({ 
  title: 'text', 
  company: 'text', 
  description: 'text', 
  skills: 'text' 
});

// Method to increment views
jobSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Method to add application
jobSchema.methods.addApplication = function(candidateId) {
  const existingApplication = this.applications.find(
    app => app.candidateId.toString() === candidateId.toString()
  );
  
  if (existingApplication) {
    throw new Error('Candidate has already applied for this job');
  }
  
  this.applications.push({ candidateId });
  return this.save();
};

// Virtual for application count
jobSchema.virtual('applicationCount').get(function() {
  return this.applications.length;
});

module.exports = mongoose.model('Job', jobSchema);

const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    match: [/^[6-9]\d{9}$/, 'Please provide a valid Indian phone number']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true
  },
  inquiryType: {
    type: String,
    enum: ['General', 'Recruitment', 'Partnership', 'Support', 'Other'],
    default: 'General'
  },
  status: {
    type: String,
    enum: ['New', 'In Progress', 'Resolved', 'Closed'],
    default: 'New'
  },
  assignedTo: {
    type: String
  },
  response: {
    message: String,
    respondedBy: String,
    respondedAt: Date
  },
  source: {
    type: String,
    default: 'Website Contact Form'
  }
}, {
  timestamps: true
});

// Method to add response
inquirySchema.methods.addResponse = function(message, respondedBy) {
  this.response = {
    message,
    respondedBy,
    respondedAt: new Date()
  };
  this.status = 'Resolved';
  return this.save();
};

module.exports = mongoose.model('Inquiry', inquirySchema);

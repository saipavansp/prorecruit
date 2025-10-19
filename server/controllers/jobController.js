const Job = require('../models/Job');
const Candidate = require('../models/Candidate');
const { sendEmail } = require('../utils/emailService');

// Create a new job
exports.createJob = async (req, res) => {
  try {
    const jobData = {
      ...req.body,
      skills: Array.isArray(req.body.skills) ? req.body.skills : req.body.skills.split(',').map(s => s.trim()),
      requirements: Array.isArray(req.body.requirements) ? req.body.requirements : req.body.requirements.split('\n').filter(r => r.trim()),
      responsibilities: Array.isArray(req.body.responsibilities) ? req.body.responsibilities : req.body.responsibilities.split('\n').filter(r => r.trim()),
      benefits: Array.isArray(req.body.benefits) ? req.body.benefits : req.body.benefits.split('\n').filter(b => b.trim())
    };
    
    const job = new Job(jobData);
    await job.save();
    
    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: job
    });
    
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create job',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all jobs with filters
exports.getAllJobs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      jobType,
      location,
      minSalary,
      maxSalary,
      minExperience,
      maxExperience,
      status = 'Active',
      sortBy = 'createdAt',
      order = 'desc'
    } = req.query;
    
    // Build filter
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (jobType) filter.jobType = jobType;
    if (location) filter.location = { $regex: new RegExp(location, 'i') };
    
    if (minSalary || maxSalary) {
      filter['salary.min'] = {};
      if (minSalary) filter['salary.min'].$gte = Number(minSalary);
      if (maxSalary) filter['salary.max'] = { $lte: Number(maxSalary) };
    }
    
    if (minExperience !== undefined) {
      filter['experience.min'] = { $lte: Number(minExperience) };
    }
    if (maxExperience !== undefined) {
      filter['experience.max'] = { $gte: Number(maxExperience) };
    }
    
    // Execute query
    const jobs = await Job.find(filter)
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-applications'); // Exclude applications from list view
    
    const total = await Job.countDocuments(filter);
    
    res.json({
      success: true,
      data: jobs,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: Number(page),
        perPage: Number(limit)
      }
    });
    
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch jobs',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get active jobs
exports.getActiveJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const jobs = await Job.find({ 
      status: 'Active',
      $or: [
        { applicationDeadline: { $gte: new Date() } },
        { applicationDeadline: null }
      ]
    })
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .select('-applications');
    
    const total = await Job.countDocuments({ status: 'Active' });
    
    res.json({
      success: true,
      data: jobs,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: Number(page),
        perPage: Number(limit)
      }
    });
    
  } catch (error) {
    console.error('Get active jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch active jobs',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('applications.candidateId', 'firstName lastName email phone');
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    res.json({
      success: true,
      data: job
    });
    
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch job',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update job
exports.updateJob = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      skills: Array.isArray(req.body.skills) ? req.body.skills : req.body.skills?.split(',').map(s => s.trim()),
      requirements: Array.isArray(req.body.requirements) ? req.body.requirements : req.body.requirements?.split('\n').filter(r => r.trim()),
      responsibilities: Array.isArray(req.body.responsibilities) ? req.body.responsibilities : req.body.responsibilities?.split('\n').filter(r => r.trim()),
      benefits: Array.isArray(req.body.benefits) ? req.body.benefits : req.body.benefits?.split('\n').filter(b => b.trim())
    };
    
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Job updated successfully',
      data: job
    });
    
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update job',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Delete job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
    
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete job',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Apply for job
exports.applyForJob = async (req, res) => {
  try {
    const { candidateId } = req.body;
    const jobId = req.params.id;
    
    // Verify candidate exists
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }
    
    // Find job and add application
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    if (job.status !== 'Active') {
      return res.status(400).json({
        success: false,
        message: 'This job is no longer accepting applications'
      });
    }
    
    try {
      await job.addApplication(candidateId);
      
      // Send confirmation email to candidate
      await sendEmail({
        to: candidate.email,
        subject: `Application Received - ${job.title}`,
        template: 'jobApplication',
        data: {
          candidateName: candidate.fullName,
          jobTitle: job.title,
          company: job.company
        }
      });
      
      res.json({
        success: true,
        message: 'Application submitted successfully'
      });
      
    } catch (error) {
      if (error.message === 'Candidate has already applied for this job') {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      throw error;
    }
    
  } catch (error) {
    console.error('Apply for job error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Increment job views
exports.incrementViews = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    await job.incrementViews();
    
    res.json({
      success: true,
      views: job.views
    });
    
  } catch (error) {
    console.error('Increment views error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update views',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Search jobs
exports.searchJobs = async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    const jobs = await Job.find(
      { 
        $text: { $search: q },
        status: 'Active'
      },
      { score: { $meta: 'textScore' } }
    )
    .sort({ score: { $meta: 'textScore' } })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .select('-applications');
    
    res.json({
      success: true,
      data: jobs,
      query: q
    });
    
  } catch (error) {
    console.error('Search jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Search failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

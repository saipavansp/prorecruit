const Candidate = require('../models/Candidate');
const { sendEmail } = require('../utils/emailService');
const { syncToGoogleForms } = require('../utils/googleFormsSync');
const path = require('path');
const fs = require('fs').promises;

// Register a new candidate
exports.registerCandidate = async (req, res) => {
  try {
    // Handle file upload with express-fileupload
    let resumeUrl = '';
    let resumeFileName = '';
    let latestResumeUrl = '';
    let latestResumeFileName = '';

    if (req.files && req.files.resume) {
      const resume = req.files.resume;
      
      // Validate file type
      const allowedTypes = ['.pdf', '.doc', '.docx'];
      const ext = path.extname(resume.name).toLowerCase();
      
      if (!allowedTypes.includes(ext)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid file type. Only PDF and DOC files are allowed.'
        });
      }
      
      if (resume.size > 5 * 1024 * 1024) {
        return res.status(400).json({
          success: false,
          message: 'File size too large. Maximum size is 5MB.'
        });
      }
      
      // Create uploads directory if it doesn't exist
      const uploadDir = path.join(__dirname, '../uploads');
      await fs.mkdir(uploadDir, { recursive: true });
      
      // Generate unique filename
      resumeFileName = `${Date.now()}-${resume.name}`;
      const uploadPath = path.join(uploadDir, resumeFileName);
      
      // Move file
      await resume.mv(uploadPath);
      resumeUrl = `/uploads/${resumeFileName}`;
    } else {
      return res.status(400).json({
        success: false,
        message: 'Resume is required. Please upload a PDF or DOC file (max 5MB).'
      });
    }

    // Handle optional latest resume
    if (req.files && req.files.latestResume) {
      const latestResume = req.files.latestResume;
      
      const allowedTypes = ['.pdf', '.doc', '.docx'];
      const ext = path.extname(latestResume.name).toLowerCase();
      
      if (allowedTypes.includes(ext) && latestResume.size <= 5 * 1024 * 1024) {
        const uploadDir = path.join(__dirname, '../uploads');
        latestResumeFileName = `${Date.now()}-latest-${latestResume.name}`;
        const uploadPath = path.join(uploadDir, latestResumeFileName);
        await latestResume.mv(uploadPath);
        latestResumeUrl = `/uploads/${latestResumeFileName}`;
      }
    }
    
    // Create candidate with resume info
    // Safely parse arrays that can arrive as comma-separated strings
    const skillsArray = Array.isArray(req.body.skills)
      ? req.body.skills
      : (typeof req.body.skills === 'string' && req.body.skills.trim().length > 0
          ? req.body.skills.split(',').map(s => s.trim()).filter(Boolean)
          : []);

    const preferredLocationsArray = Array.isArray(req.body.preferredLocations)
      ? req.body.preferredLocations
      : (typeof req.body.preferredLocations === 'string' && req.body.preferredLocations.trim().length > 0
          ? req.body.preferredLocations.split(',').map(s => s.trim()).filter(Boolean)
          : []);

    const candidateData = {
      ...req.body,
      resumeUrl,
      resumeFileName,
      latestResumeUrl,
      latestResumeFileName,
      currentJobTitle: req.body.currentJobTitle,
      fullNameAadhar: req.body.fullNameAadhar,
      address: {
        street: req.body['address.street'] || req.body.street || req.body?.address?.street,
        postalCode: req.body['address.postalCode'] || req.body.postalCode || req.body?.address?.postalCode,
        city: req.body['address.city'] || req.body.city || req.body?.address?.city,
        province: req.body['address.province'] || req.body.province || req.body?.address?.province,
        country: req.body['address.country'] || req.body.country || req.body?.address?.country
      },
      education: {
        highestQualification: req.body['education.highestQualification'] || req.body?.education?.highestQualification,
        institution: req.body['education.institution'] || req.body?.education?.institution,
        graduationYear: req.body['education.graduationYear'] || req.body?.education?.graduationYear
      },
      experienceSummary: req.body.experienceSummary,
      skills: skillsArray,
      preferredLocations: preferredLocationsArray
    };
    
    // Create candidate object (without saving to MongoDB for now)
    const candidate = {
      ...candidateData,
      _id: Date.now().toString(), // Temporary ID
      fullName: `${candidateData.firstName} ${candidateData.lastName}`,
      createdAt: new Date().toISOString()
    };
    
    console.log('Candidate registration received:', candidate.fullName);
    
    // Send confirmation email to CANDIDATE
    try {
      await sendEmail({
        to: candidate.email,
        subject: 'Registration Successful - Pro Recruit Technologies',
        template: 'candidateRegistration',
        data: {
          name: candidate.fullName,
          registrationId: candidate._id
        }
      });
      console.log('Candidate confirmation email sent to:', candidate.email);
    } catch (emailError) {
      console.log('Candidate email failed:', emailError.message);
    }
    
    // Send detailed notification to ADMIN with resume attachment
    try {
      // Prepare attachments array
      const attachments = [];
      
      // Add main resume if exists
      if (resumeFileName && resumeUrl) {
        const resumePath = path.join(__dirname, '../uploads', resumeFileName);
        attachments.push({
          filename: resumeFileName,
          path: resumePath
        });
      }
      
      // Add latest resume if exists and different from main resume
      if (latestResumeFileName && latestResumeUrl && latestResumeFileName !== resumeFileName) {
        const latestResumePath = path.join(__dirname, '../uploads', latestResumeFileName);
        attachments.push({
          filename: latestResumeFileName,
          path: latestResumePath
        });
      }
      
      await sendEmail({
        to: process.env.ADMIN_EMAIL || 'suryaraj1045@gmail.com',
        subject: `New ${candidate.candidateType} Registration - ${candidate.fullName}`,
        template: 'adminNotification',
        data: {
          candidateName: candidate.fullName,
          candidateType: candidate.candidateType || 'N/A',
          email: candidate.email,
          phone: candidate.phone,
          experience: candidate.totalExperience || 'Fresher',
          skills: Array.isArray(candidate.skills) ? candidate.skills.join(', ') : candidate.skills || 'Not provided',
          address: candidate.address || 'Not provided',
          registrationId: candidate._id,
          currentCompany: candidate.currentCompany || 'N/A',
          currentCTC: candidate.currentCTC ? `₹${candidate.currentCTC} LPA` : 'N/A',
          expectedCTC: candidate.expectedCTC ? `₹${candidate.expectedCTC} LPA` : 'N/A',
          noticePeriod: candidate.noticePeriod || 'N/A',
          highestEducation: candidate.highestEducation || 'Not provided',
          hasResume: attachments.length > 0
        },
        attachments: attachments.length > 0 ? attachments : undefined
      });
      console.log('Admin notification email sent to:', process.env.ADMIN_EMAIL, 'with', attachments.length, 'attachment(s)');
    } catch (emailError) {
      console.log('Admin email failed:', emailError.message);
    }
    
    // Sync to Google Sheets (async, don't wait)
    syncToGoogleForms(candidate).catch(err => 
      console.log('Google Sheets sync:', err.message)
    );
    
    res.status(201).json({
      success: true,
      message: 'Registration successful! We will contact you soon.',
      candidateId: candidate._id
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all candidates with filters
exports.getAllCandidates = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      skillCategory,
      minExperience,
      maxExperience,
      location,
      sortBy = 'createdAt',
      order = 'desc'
    } = req.query;
    
    // Build filter
    const filter = {};
    if (status) filter.status = status;
    if (skillCategory) filter.skillCategory = skillCategory;
    if (minExperience || maxExperience) {
      filter.totalExperience = {};
      if (minExperience) filter.totalExperience.$gte = Number(minExperience);
      if (maxExperience) filter.totalExperience.$lte = Number(maxExperience);
    }
    if (location) filter.preferredLocations = { $in: [location] };
    
    // Execute query
    const candidates = await Candidate.find(filter)
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-notes'); // Exclude notes from list view
    
    const total = await Candidate.countDocuments(filter);
    
    res.json({
      success: true,
      data: candidates,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: Number(page),
        perPage: Number(limit)
      }
    });
    
  } catch (error) {
    console.error('Get candidates error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch candidates',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get candidate by ID
exports.getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }
    
    res.json({
      success: true,
      data: candidate
    });
    
  } catch (error) {
    console.error('Get candidate error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch candidate',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update candidate status
exports.updateCandidateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Status updated successfully',
      data: candidate
    });
    
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Add note to candidate
exports.addNote = async (req, res) => {
  try {
    const { text, addedBy } = req.body;
    
    const candidate = await Candidate.findById(req.params.id);
    
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }
    
    await candidate.addNote(text, addedBy || 'Admin');
    
    res.json({
      success: true,
      message: 'Note added successfully',
      data: candidate
    });
    
  } catch (error) {
    console.error('Add note error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add note',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Search candidates
exports.searchCandidates = async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    const candidates = await Candidate.find(
      { $text: { $search: q } },
      { score: { $meta: 'textScore' } }
    )
    .sort({ score: { $meta: 'textScore' } })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .select('-notes');
    
    res.json({
      success: true,
      data: candidates,
      query: q
    });
    
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'Search failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get candidates by skill
exports.getCandidatesBySkill = async (req, res) => {
  try {
    const { skill } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const candidates = await Candidate.find({
      skills: { $regex: new RegExp(skill, 'i') }
    })
    .sort({ totalExperience: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .select('-notes');
    
    res.json({
      success: true,
      data: candidates,
      skill
    });
    
  } catch (error) {
    console.error('Get by skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch candidates',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

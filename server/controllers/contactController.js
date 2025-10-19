const Inquiry = require('../models/Inquiry');
const { sendEmail } = require('../utils/emailService');

// Submit inquiry
exports.submitInquiry = async (req, res) => {
  try {
    const inquiry = new Inquiry(req.body);
    await inquiry.save();
    
    // Send auto-response to user
    await sendEmail({
      to: inquiry.email,
      subject: 'Thank you for contacting Pro Recruit Technologies',
      template: 'inquiryAutoResponse',
      data: {
        name: inquiry.name,
        inquiryId: inquiry._id
      }
    });
    
    // Send notification to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New Inquiry: ${inquiry.subject}`,
      template: 'inquiryNotification',
      data: {
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone,
        subject: inquiry.subject,
        message: inquiry.message,
        inquiryType: inquiry.inquiryType
      }
    });
    
    res.status(201).json({
      success: true,
      message: 'Thank you for your inquiry. We will contact you soon.',
      inquiryId: inquiry._id
    });
    
  } catch (error) {
    console.error('Submit inquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit inquiry. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all inquiries
exports.getAllInquiries = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      inquiryType,
      sortBy = 'createdAt',
      order = 'desc'
    } = req.query;
    
    // Build filter
    const filter = {};
    if (status) filter.status = status;
    if (inquiryType) filter.inquiryType = inquiryType;
    
    // Execute query
    const inquiries = await Inquiry.find(filter)
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Inquiry.countDocuments(filter);
    
    res.json({
      success: true,
      data: inquiries,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: Number(page),
        perPage: Number(limit)
      }
    });
    
  } catch (error) {
    console.error('Get inquiries error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch inquiries',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get inquiry by ID
exports.getInquiryById = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }
    
    res.json({
      success: true,
      data: inquiry
    });
    
  } catch (error) {
    console.error('Get inquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch inquiry',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update inquiry status
exports.updateInquiryStatus = async (req, res) => {
  try {
    const { status, assignedTo } = req.body;
    
    const updateData = { status };
    if (assignedTo) updateData.assignedTo = assignedTo;
    
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Status updated successfully',
      data: inquiry
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

// Respond to inquiry
exports.respondToInquiry = async (req, res) => {
  try {
    const { message, respondedBy } = req.body;
    
    const inquiry = await Inquiry.findById(req.params.id);
    
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }
    
    await inquiry.addResponse(message, respondedBy || 'Admin');
    
    // Send response email to user
    await sendEmail({
      to: inquiry.email,
      subject: `Re: ${inquiry.subject}`,
      template: 'inquiryResponse',
      data: {
        name: inquiry.name,
        originalMessage: inquiry.message,
        response: message
      }
    });
    
    res.json({
      success: true,
      message: 'Response sent successfully',
      data: inquiry
    });
    
  } catch (error) {
    console.error('Respond to inquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send response',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

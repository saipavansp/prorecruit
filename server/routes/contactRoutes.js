const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { validateInquiry } = require('../middleware/validation');

// Submit inquiry
router.post('/inquiry', validateInquiry, contactController.submitInquiry);

// Get all inquiries
router.get('/inquiries', contactController.getAllInquiries);

// Get inquiry by ID
router.get('/inquiries/:id', contactController.getInquiryById);

// Update inquiry status
router.patch('/inquiries/:id/status', contactController.updateInquiryStatus);

// Respond to inquiry
router.post('/inquiries/:id/respond', contactController.respondToInquiry);

module.exports = router;

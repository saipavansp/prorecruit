const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { validateJob } = require('../middleware/validation');

// Create a new job
router.post('/', validateJob, jobController.createJob);

// Get all jobs (with filters)
router.get('/list', jobController.getAllJobs);

// Get active jobs
router.get('/active', jobController.getActiveJobs);

// Get job by ID
router.get('/:id', jobController.getJobById);

// Update job
router.put('/:id', validateJob, jobController.updateJob);

// Delete job
router.delete('/:id', jobController.deleteJob);

// Apply for job
router.post('/:id/apply', jobController.applyForJob);

// Increment job views
router.post('/:id/view', jobController.incrementViews);

// Search jobs
router.get('/search/query', jobController.searchJobs);

module.exports = router;

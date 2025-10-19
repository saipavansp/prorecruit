const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');
const { validateCandidate } = require('../middleware/validation');

// Register a new candidate
router.post('/register', 
  validateCandidate,
  candidateController.registerCandidate
);

// Get all candidates (with filters)
router.get('/', candidateController.getAllCandidates);

// Get candidate by ID
router.get('/:id', candidateController.getCandidateById);

// Update candidate status
router.patch('/:id/status', candidateController.updateCandidateStatus);

// Add note to candidate
router.post('/:id/notes', candidateController.addNote);

// Search candidates
router.get('/search/query', candidateController.searchCandidates);

// Get candidates by skill
router.get('/skills/:skill', candidateController.getCandidatesBySkill);

module.exports = router;

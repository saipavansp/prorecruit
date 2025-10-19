const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

// Create uploads directory if it doesn't exist
const createUploadsDir = async () => {
  const uploadDir = path.join(__dirname, '../uploads');
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }
};

// Configure storage
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    await createUploadsDir();
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `resume-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.pdf', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF and DOC files are allowed.'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Middleware for resume upload (supports primary resume and optional latestResume)
exports.uploadResume = (req, res, next) => {
  const uploadMultiple = upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'latestResume', maxCount: 1 }
  ]);
  
  uploadMultiple(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            success: false,
            message: 'File size too large. Maximum size is 5MB.'
          });
        }
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message || 'File upload failed'
      });
    }
    
    const files = req.files || {};
    if (files.resume && files.resume[0]) {
      req.body.resumeUrl = `/uploads/${files.resume[0].filename}`;
      req.body.resumeFileName = files.resume[0].originalname;
    }
    if (files.latestResume && files.latestResume[0]) {
      req.body.latestResumeUrl = `/uploads/${files.latestResume[0].filename}`;
      req.body.latestResumeFileName = files.latestResume[0].originalname;
    }
    
    next();
  });
};

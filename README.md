# Pro Recruit Technologies Website

A modern, professional recruitment website built with React, Node.js, and MongoDB for Pro Recruit Technologies - "Making dreams and aspirations come true".

## 🚀 Features

### For Candidates
- **Multi-step Registration Form** with progress tracking and data persistence
- **Job Search & Filtering** by category, location, experience, and job type
- **Detailed Job Views** with requirements, responsibilities, and benefits
- **Resume Upload** with drag-and-drop support (PDF/DOC, max 5MB)
- **Skills Selection** with comprehensive IT and Non-IT skill lists

### For Employers
- **Contact Form** for recruitment inquiries
- **Multiple Service Offerings**:
  - IT Recruitment
  - Non-IT Recruitment (BPO, KPO, etc.)
  - Permanent Staffing
  - Contract Staffing
  - Executive Search
  - Volume Hiring

### Technical Features
- **Responsive Design** with mobile-first approach
- **Modern UI/UX** with glassmorphism effects and smooth animations
- **Email Notifications** via Nodemailer
- **Google Forms Integration** for data syncing
- **Security Features**:
  - Input sanitization
  - Rate limiting
  - File upload restrictions
  - XSS protection
- **Performance Optimizations**:
  - Lazy loading
  - Code splitting
  - Optimized images

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- React Router for navigation
- Framer Motion for animations
- React Hook Form for form management
- React Toastify for notifications
- Axios for API calls

### Backend
- Node.js with Express
- MongoDB with Mongoose
- Nodemailer for emails
- Express Validator for validation
- Multer for file uploads
- Helmet for security
- Rate limiting middleware

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Gmail account for email service (or other SMTP service)
- Google Cloud account (optional, for Forms API)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd pro-recruit
```

### 2. Install dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```

### 3. Environment Configuration

Create a `.env` file in the server directory:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/pro-recruit

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-jwt-secret-key-change-this-in-production

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=suryaraj@prorecruittechnologies.com

# Google APIs Configuration (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:5000/auth/google/callback
GOOGLE_FORMS_API_KEY=your-google-forms-api-key
GOOGLE_SHEET_ID=your-google-sheet-id
GOOGLE_FORM_ID=your-google-form-id

# Frontend URL
CLIENT_URL=http://localhost:3000
```

### 4. Database Setup

Make sure MongoDB is running on your system:
```bash
mongod
```

The application will automatically create the necessary collections when you run it.

### 5. Run the Application

#### Backend (Terminal 1)
```bash
cd server
npm run dev
```

#### Frontend (Terminal 2)
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## 📁 Project Structure

```
pro-recruit/
├── client/                    # React frontend
│   ├── public/               # Static files
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Utility functions
│   │   └── styles/          # Global styles
│   └── package.json
│
├── server/                   # Node.js backend
│   ├── controllers/         # Route controllers
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   ├── uploads/            # Resume uploads
│   ├── index.js            # Server entry point
│   └── package.json
│
├── shared/                  # Shared constants
│   └── constants/
│
└── README.md
```

## 🔑 API Endpoints

### Candidates
- `POST /api/candidates/register` - Register new candidate
- `GET /api/candidates` - Get all candidates (with filters)
- `GET /api/candidates/:id` - Get candidate by ID
- `PATCH /api/candidates/:id/status` - Update candidate status
- `POST /api/candidates/:id/notes` - Add note to candidate
- `GET /api/candidates/search/query` - Search candidates
- `GET /api/candidates/skills/:skill` - Get candidates by skill

### Jobs
- `POST /api/jobs` - Create new job
- `GET /api/jobs/list` - Get all jobs (with filters)
- `GET /api/jobs/active` - Get active jobs
- `GET /api/jobs/:id` - Get job by ID
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job
- `POST /api/jobs/:id/apply` - Apply for job
- `POST /api/jobs/:id/view` - Increment job views
- `GET /api/jobs/search/query` - Search jobs

### Contact/Inquiries
- `POST /api/contact/inquiry` - Submit inquiry
- `GET /api/contact/inquiries` - Get all inquiries
- `GET /api/contact/inquiries/:id` - Get inquiry by ID
- `PATCH /api/contact/inquiries/:id/status` - Update inquiry status
- `POST /api/contact/inquiries/:id/respond` - Respond to inquiry

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env` files to version control
2. **File Uploads**: Restricted to PDF/DOC files, max 5MB
3. **Input Validation**: All inputs are validated and sanitized
4. **Rate Limiting**: API endpoints are rate-limited to prevent abuse
5. **CORS**: Configured to accept requests only from the frontend URL
6. **MongoDB Injection**: Protected using express-mongo-sanitize

## 📧 Email Configuration

To use Gmail for sending emails:
1. Enable 2-factor authentication in your Google account
2. Generate an app-specific password
3. Use this password in the `EMAIL_PASSWORD` environment variable

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set all environment variables
2. Ensure MongoDB Atlas connection string is used
3. Update CORS settings for production frontend URL
4. Set `NODE_ENV=production`

### Frontend Deployment (Vercel/Netlify)
1. Set `REACT_APP_API_URL` to your backend URL
2. Build the production bundle: `npm run build`
3. Deploy the `build` directory

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is proprietary and confidential. All rights reserved by Pro Recruit Technologies.

## 📞 Support

For support, email suryaraj@prorecruittechnologies.com or call +91 8867825850.

---

Built with ❤️ by Pro Recruit Technologies Team

# Pro Recruit Technologies - Deployment Guide

## 🎯 Pre-Deployment Checklist

### Backend Server is Running
Your server should be running successfully. Restart it if needed:
```bash
cd server
npm run dev
```

### Frontend is Running
```bash
cd client
npm start
```

## ✅ What's Completed

### 1. **Full-Stack Application**
- ✅ React TypeScript frontend with modern UI
- ✅ Node.js/Express backend with MongoDB Atlas
- ✅ All pages implemented and responsive
- ✅ File upload system working
- ✅ Email service ready (needs SMTP credentials)

### 2. **Candidate Registration Form**
**4 Steps:**
1. **Personal Information**: First Name, Last Name, Email, Phone (+91), Full Name as per Aadhar
2. **Professional Details**: Experience (years), Current/Expected CTC, Notice Period, Company, Designation
3. **Skills & Expertise**: IT/Non-IT category, Skills (autocomplete multi-select)
4. **Resume & Preferences**: Preferred Locations, Relocation checkbox, Resume upload (required), Latest Resume (optional)

### 3. **Responsive Design**
- ✅ Mobile (320px - 768px)
- ✅ Tablet (769px - 992px)
- ✅ Laptop (993px - 1200px)
- ✅ Desktop (1201px+)
- ✅ Proper alignment on all breakpoints
- ✅ Touch-friendly buttons and inputs

### 4. **Features**
- ✅ Smooth animations (Framer Motion)
- ✅ Form validation (client & server)
- ✅ Toast notifications
- ✅ Progress tracking in multi-step form
- ✅ Skills autocomplete dropdown
- ✅ Glassmorphism effects
- ✅ Animated counters on homepage

## 🔧 Configuration Needed

### 1. Email Service (Required for notifications)
Update in `server/.env`:
```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

**How to get Gmail App Password:**
1. Go to Google Account → Security
2. Enable 2-Factor Authentication
3. Search for "App passwords"
4. Generate new app password for "Mail"
5. Use that 16-character password in `.env`

### 2. Assets (Optional but Recommended)
Replace these placeholder files:
- `client/public/images/hero/hero-bg.jpg` - Hero background image (1920x1080+)
- Add client logos to `client/public/images/clients/`:
  - `sagility.png`
  - `startek.png`
  - `ison.png`
  - `altruist.png`

## 🚀 Running the Application

### Development Mode
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm start
```

Or use concurrently from root:
```bash
npm run dev
```

### Testing the Registration Flow
1. Navigate to http://localhost:3000/candidates/register
2. Fill all required fields:
   - ✅ Personal info with valid email/phone
   - ✅ Professional details with numeric values
   - ✅ Select skill category (IT/Non-IT)
   - ✅ Select at least one skill
   - ✅ Select at least one preferred location
   - ✅ Upload resume (PDF/DOC, max 5MB)
3. Click Submit

### Expected Behavior
- ✅ Form validates each step
- ✅ Progress bar updates
- ✅ Resume uploads to `server/uploads/`
- ✅ Data saves to MongoDB Atlas
- ✅ Success toast notification
- ✅ Redirect to homepage
- ✅ (When email configured) Confirmation email sent

## 📊 Current Status

### Working ✅
- All pages render properly on all devices
- Navigation and routing
- Form validation
- File uploads
- MongoDB connection
- API endpoints
- Responsive design
- Animations and transitions

### Pending ⏳
- Email notifications (needs credentials)
- Google Forms sync (needs API keys - optional)
- Real images/logos
- Production deployment

## 🐛 Troubleshooting

### If Form Submission Fails (400 Error)
Check browser console/network tab for exact error message. Common issues:
- Missing resume file
- Invalid email format
- Invalid phone (must be 10 digits starting with 6-9)
- Missing required fields
- File size > 5MB

### If Server Won't Start
1. Ensure MongoDB Atlas connection string is correct in `server/.env`
2. Check network access in MongoDB Atlas (whitelist your IP)
3. Verify all dependencies installed: `cd server && npm install`

### If Frontend Shows Errors
1. Check dependencies: `cd client && npm install`
2. Restart dev server: `npm start`

## 📱 Responsive Breakpoints

- **Mobile Small**: 320px - 480px
- **Mobile**: 481px - 768px
- **Tablet**: 769px - 992px
- **Laptop**: 993px - 1200px
- **Desktop**: 1201px - 1400px
- **Large Desktop**: 1401px+

All pages tested and optimized for these ranges.

## 🌐 Production Deployment

### Frontend (Vercel/Netlify)
1. Build: `cd client && npm run build`
2. Deploy `build/` folder
3. Set environment variable: `REACT_APP_API_URL=https://your-backend-url.com/api`

### Backend (Heroku/Railway/Render)
1. Set all environment variables from `.env`
2. Ensure MongoDB Atlas prod connection string
3. Set `NODE_ENV=production`
4. Set `CLIENT_URL=https://your-frontend-url.com`

### Database
- Already using MongoDB Atlas (cloud)
- Collections auto-created on first data
- Database name: `pro-recruit`

## 📞 Support
Pro Recruit Technologies  
Email: suryaraj@prorecruittechnologies.com  
Phone: +91 8867825850  
Address: #91/3 Ground Floor, Right Side, 5th Cross, Opp. Anjan Cinemas, Lakshminarayanapuram, Binnipete, Magadi Road, Bengaluru, Karnataka 560023

---
Built with ❤️ for Pro Recruit Technologies

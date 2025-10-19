# Pro Recruit Technologies - Testing Guide

## 🧪 Testing Checklist

### Homepage (/)
- [ ] Hero section displays correctly with phone number prominent
- [ ] All 6 service cards visible and clickable
- [ ] Statistics counters animate on scroll
- [ ] Client logos section displays
- [ ] CTA buttons work
- [ ] Responsive on mobile/tablet/desktop

### About Page (/about)
- [ ] Company story displays
- [ ] Mission/Vision/Values cards show
- [ ] All content readable
- [ ] Responsive layout

### Services Page (/services)
- [ ] All 6 services listed with details
- [ ] IT/Non-IT skills displayed
- [ ] Service icons render
- [ ] CTA section works
- [ ] Responsive on all devices

### Jobs Page (/jobs)
- [ ] Job listings load
- [ ] Filters work (category, type, location)
- [ ] Job cards display properly
- [ ] Mobile filter toggle works
- [ ] Responsive layout

### Job Detail Page (/jobs/:id)
- [ ] Job details load
- [ ] All information displays
- [ ] Apply button works
- [ ] Back navigation works
- [ ] Responsive design

### Candidate Registration (/candidates/register)

#### Step 1: Personal Information
- [ ] First Name (required)
- [ ] Last Name (required)
- [ ] Email validation works
- [ ] Phone validation (10 digits, 6-9 start)
- [ ] Full Name as per Aadhar (required)
- [ ] Next button validation

#### Step 2: Professional Details
- [ ] Total Experience (numeric, ≥0)
- [ ] Current CTC (numeric, ≥0)
- [ ] Expected CTC (numeric, ≥0)
- [ ] Notice Period dropdown
- [ ] Optional fields work (Company, Designation)
- [ ] Next button validation

#### Step 3: Skills & Expertise
- [ ] Skill Category selection (IT/Non-IT)
- [ ] Skills multi-select autocomplete
- [ ] Dynamic skills based on category
- [ ] Next button validation

#### Step 4: Resume & Preferences
- [ ] Preferred Locations multi-select
- [ ] Relocation checkbox
- [ ] Resume file upload (PDF/DOC)
  - [ ] File type validation
  - [ ] File size validation (max 5MB)
  - [ ] Shows selected filename
- [ ] Latest Resume (optional) upload
- [ ] Submit button works
- [ ] Form submits to backend
- [ ] Success message displays
- [ ] Redirects to homepage

### Contact Page (/contact)
- [ ] Contact form displays
- [ ] Form validation works
- [ ] Full address displays properly
- [ ] Email/Phone links work
- [ ] Map loads
- [ ] Inquiry type dropdown
- [ ] Submit works
- [ ] Responsive layout

### Navigation
- [ ] Navbar fixed at top
- [ ] All links work
- [ ] Mobile menu toggles
- [ ] Active state highlights
- [ ] Smooth scrolling

### Footer
- [ ] Full company address displays
- [ ] All links work
- [ ] Social icons present
- [ ] Contact info correct
- [ ] Copyright year dynamic
- [ ] Responsive layout

## 🔍 Cross-Browser Testing

Test in:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Mobile browsers (Chrome Mobile, Safari Mobile)

## 📱 Device Testing

### Mobile
- [ ] iPhone SE (375px)
- [ ] iPhone 12/13 (390px)
- [ ] iPhone 14 Pro Max (430px)
- [ ] Samsung Galaxy S20 (360px)
- [ ] Samsung Galaxy S21 Ultra (412px)

### Tablet
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)
- [ ] Android tablets (800px)

### Laptop
- [ ] 13" MacBook (1280px)
- [ ] 15" Laptop (1366px)
- [ ] 15" MacBook Pro (1440px)

### Desktop
- [ ] 1080p (1920px)
- [ ] 1440p (2560px)
- [ ] 4K (3840px)

## 🎯 Functional Testing

### Backend API
Test endpoints using Postman or browser:

1. **Health Check**
   ```
   GET http://localhost:5000/api/health
   ```
   Expected: `{ status: 'OK', message: 'Server is running' }`

2. **Candidate Registration**
   ```
   POST http://localhost:5000/api/candidates/register
   Content-Type: multipart/form-data
   ```
   Include all required fields + resume file

3. **Get Active Jobs**
   ```
   GET http://localhost:5000/api/jobs/active
   ```

4. **Submit Inquiry**
   ```
   POST http://localhost:5000/api/contact/inquiry
   Content-Type: application/json
   ```

### Database
Check MongoDB Atlas:
- [ ] `pro-recruit` database created
- [ ] `candidates` collection exists
- [ ] Sample candidate document has all fields
- [ ] `jobs` collection ready
- [ ] `inquiries` collection ready

## 🔒 Security Testing

- [ ] File upload restricted to PDF/DOC
- [ ] File size limit enforced (5MB)
- [ ] Email validation works
- [ ] Phone validation works
- [ ] XSS protection (input sanitization)
- [ ] Rate limiting active (100 req/15min)
- [ ] CORS configured correctly

## ⚡ Performance Testing

- [ ] Page load time < 3 seconds
- [ ] Images load properly
- [ ] Animations smooth (60fps)
- [ ] Form submission < 2 seconds
- [ ] No console errors
- [ ] No memory leaks

## 📋 Current Known Issues

1. **Email notifications** - Not working until SMTP credentials added
2. **Google Forms sync** - Not active (optional feature)
3. **Client logos** - Using placeholders
4. **Hero background** - Using placeholder image

## ✅ Ready for Production

Once you:
1. Add email credentials
2. Replace placeholder images
3. Test full registration flow
4. Verify data saves to MongoDB

The application will be production-ready!

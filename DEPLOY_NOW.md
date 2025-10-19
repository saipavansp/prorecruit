# 🚀 Deploy Pro Recruit Technologies - Quick Start Guide

## ⏱️ Total Time: ~20 minutes

---

## 🔴 STEP 1: Deploy Backend to Render (10 minutes)

### 1.1 Create Render Account
1. Open: https://render.com
2. Click **"Get Started for Free"**
3. Choose **"Sign up with GitHub"**
4. Authorize Render

### 1.2 Create Web Service
1. Click **"New +"** (top right)
2. Select **"Web Service"**
3. Click **"Connect account"** if needed
4. Find repository: **`saipavansp/prorecruit`**
5. Click **"Connect"**

### 1.3 Configure Service
Fill in these details:

| Field | Value |
|-------|-------|
| **Name** | `prorecruit-backend` |
| **Region** | Singapore (or US West) |
| **Branch** | `main` |
| **Root Directory** | `server` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

### 1.4 Add Environment Variables

Click **"Advanced"** → Scroll down → **"Add Environment Variable"**

Add these ONE BY ONE:

```
Key: MONGODB_URI
Value: mongodb+srv://kalyan18181818_db_user:Prorecruitdb@prorecruit.7cts0uh.mongodb.net/pro-recruit?retryWrites=true&w=majority&appName=prorecruit
```

```
Key: NODE_ENV
Value: production
```

```
Key: JWT_SECRET
Value: prorecruit-jwt-secret-2024-prod
```

```
Key: PORT
Value: 5000
```

```
Key: ADMIN_EMAIL
Value: suryaraj@prorecruittechnologies.com
```

```
Key: EMAIL_HOST
Value: smtp.gmail.com
```

```
Key: EMAIL_PORT
Value: 587
```

**Skip EMAIL_USER and EMAIL_PASSWORD for now** (add later when you configure email)

### 1.5 Deploy!
1. Click **"Create Web Service"**
2. Wait 5-10 minutes (Render will build and deploy)
3. Watch the logs - should see "MongoDB connected successfully"

### 1.6 Get Your Backend URL
Once deployed, you'll see:
```
https://prorecruit-backend.onrender.com
```

**📋 COPY THIS URL** - You need it for Step 2!

### 1.7 Test Backend
Open in browser:
```
https://prorecruit-backend.onrender.com/api/health
```

Should show:
```json
{"status":"OK","message":"Server is running"}
```

✅ **Backend is LIVE!**

---

## 🟢 STEP 2: Deploy Frontend to Vercel (10 minutes)

### 2.1 Create Vercel Account
1. Open: https://vercel.com
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel

### 2.2 Import Project
1. Click **"Add New..."** → **"Project"**
2. Find repository: **`saipavansp/prorecruit`**
3. Click **"Import"**

### 2.3 Configure Project

| Field | Value |
|-------|-------|
| **Framework Preset** | `Create React App` |
| **Root Directory** | `client` |
| **Build Command** | `npm run build` (auto-filled) |
| **Output Directory** | `build` (auto-filled) |

### 2.4 Add Environment Variable

Click **"Environment Variables"** section:

```
Name: REACT_APP_API_URL
Value: https://prorecruit-backend.onrender.com/api
```

**⚠️ IMPORTANT**: Replace with YOUR actual Render backend URL from Step 1.6!

### 2.5 Deploy!
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Vercel will build and deploy automatically

### 2.6 Get Your Frontend URL
Once deployed, you'll see:
```
https://prorecruit.vercel.app
```

Or a custom URL Vercel assigns.

✅ **Frontend is LIVE!**

---

## 🔵 STEP 3: Connect Frontend & Backend (5 minutes)

### 3.1 Update Backend CORS
1. Go to Render dashboard
2. Click on **`prorecruit-backend`** service
3. Go to **"Environment"** tab
4. Click **"Add Environment Variable"**
5. Add:
   ```
   Key: CLIENT_URL
   Value: https://prorecruit.vercel.app
   ```
   (Use your actual Vercel URL!)
6. Click **"Save Changes"**
7. Backend will auto-redeploy (~2 minutes)

### 3.2 Update MongoDB Atlas (if needed)
1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Click **"Network Access"** (left sidebar)
3. Click **"Add IP Address"**
4. Choose **"Allow Access from Anywhere"** (0.0.0.0/0)
5. Click **"Confirm"**

---

## 🎉 STEP 4: Test Your Live Website!

### 4.1 Visit Your Website
Open: `https://prorecruit.vercel.app` (or your URL)

### 4.2 Test Homepage
- ✅ Hero section loads
- ✅ Phone number displays: +91 8867825850
- ✅ Service cards show
- ✅ Statistics animate

### 4.3 Test Candidate Registration
1. Click **"Register Now"** or go to `/candidates/register`
2. Fill all 4 steps:
   - Personal info
   - Professional details
   - Skills (select IT or Non-IT and pick skills)
   - Preferences & upload resume
3. Click **"Submit Application"**
4. Should show: ✅ "Registration successful!"

### 4.4 Verify in MongoDB
1. Go to MongoDB Atlas
2. Click **"Browse Collections"**
3. Database: `pro-recruit`
4. Collection: `candidates`
5. You should see your test candidate!

---

## ✅ Deployment Complete!

### Your Live URLs:
- **Website**: `https://prorecruit.vercel.app`
- **Backend API**: `https://prorecruit-backend.onrender.com/api`
- **Database**: MongoDB Atlas (cloud)

### What's Working:
✅ All pages responsive  
✅ Candidate registration saves to database  
✅ Job listings  
✅ Contact form  
✅ Beautiful UI with animations  
✅ Mobile-friendly  

### What to Add Later:
⏳ Email notifications (add EMAIL_USER & EMAIL_PASSWORD)  
⏳ Custom domain  
⏳ Google Forms sync (optional)  
⏳ Replace placeholder images  

---

## 🎯 Next Actions

1. **Deploy Now**: Follow steps above
2. **Test Registration**: Try the live form
3. **Share with Team**: Send them the Vercel URL
4. **Monitor**: Check Render logs and MongoDB

**You're ready to go live! 🚀**

---

Need help during deployment? Check the logs:
- **Render**: Click your service → "Logs" tab
- **Vercel**: Click your deployment → "View Build Logs"
- **MongoDB**: Atlas dashboard → "Metrics"

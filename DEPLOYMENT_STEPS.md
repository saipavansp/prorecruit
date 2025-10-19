# Pro Recruit Technologies - Deployment Guide (Version 1)

## 🚀 Step-by-Step Deployment

---

## PART 1: Deploy Backend to Render

### Step 1: Prepare Backend for Deployment

First, let's create a `render.yaml` configuration file:

```yaml
services:
  - type: web
    name: prorecruit-backend
    env: node
    buildCommand: cd server && npm install
    startCommand: cd server && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGODB_URI
        sync: false
      - key: JWT_SECRET
        sync: false
      - key: EMAIL_HOST
        value: smtp.gmail.com
      - key: EMAIL_PORT
        value: 587
      - key: EMAIL_USER
        sync: false
      - key: EMAIL_PASSWORD
        sync: false
      - key: ADMIN_EMAIL
        value: suryaraj@prorecruittechnologies.com
      - key: CLIENT_URL
        sync: false
```

### Step 2: Sign Up for Render
1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub
4. Authorize Render to access your GitHub account

### Step 3: Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `saipavansp/prorecruit`
3. Configure the service:
   - **Name**: `prorecruit-backend`
   - **Region**: Singapore (closest to India) or any available
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### Step 4: Add Environment Variables in Render
Click "Advanced" → "Add Environment Variables":

```
MONGODB_URI = mongodb+srv://kalyan18181818_db_user:Prorecruitdb@prorecruit.7cts0uh.mongodb.net/pro-recruit?retryWrites=true&w=majority&appName=prorecruit

NODE_ENV = production

JWT_SECRET = prorecruit-jwt-secret-2024

PORT = 5000

EMAIL_HOST = smtp.gmail.com

EMAIL_PORT = 587

EMAIL_USER = (your-email@gmail.com - add later if needed)

EMAIL_PASSWORD = (your-app-password - add later if needed)

ADMIN_EMAIL = suryaraj@prorecruittechnologies.com

CLIENT_URL = (leave blank for now, will add after Vercel)
```

### Step 5: Deploy Backend
1. Click "Create Web Service"
2. Wait 5-10 minutes for deployment
3. You'll get a URL like: `https://prorecruit-backend.onrender.com`
4. **Copy this URL** - you'll need it for frontend!

### Step 6: Test Backend
Visit: `https://your-backend-url.onrender.com/api/health`

Should return:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## PART 2: Deploy Frontend to Vercel

### Step 1: Prepare Frontend for Deployment

We need to create a `.env.production` file for the frontend build.

### Step 2: Sign Up for Vercel
1. Go to https://vercel.com
2. Click "Sign Up"
3. Sign up with GitHub
4. Authorize Vercel to access your GitHub

### Step 3: Import Project
1. Click "Add New..." → "Project"
2. Import your repository: `saipavansp/prorecruit`
3. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### Step 4: Add Environment Variables in Vercel
Before deploying, add:

```
REACT_APP_API_URL = https://your-backend-url.onrender.com/api
```

**Replace** `your-backend-url` with the actual Render URL from Part 1, Step 5!

Example:
```
REACT_APP_API_URL = https://prorecruit-backend.onrender.com/api
```

### Step 5: Deploy Frontend
1. Click "Deploy"
2. Wait 2-3 minutes
3. You'll get a URL like: `https://prorecruit.vercel.app`

### Step 6: Update Backend CLIENT_URL
1. Go back to Render dashboard
2. Go to your backend service
3. Click "Environment"
4. Find `CLIENT_URL` and set it to your Vercel URL:
   ```
   CLIENT_URL = https://prorecruit.vercel.app
   ```
5. Click "Save Changes"
6. Backend will auto-redeploy

---

## PART 3: Final Configuration

### Step 1: Update MongoDB Atlas Network Access
1. Go to MongoDB Atlas dashboard
2. Network Access → Add IP Address
3. Add: `0.0.0.0/0` (Allow from anywhere)
4. Or add specific Render IP addresses

### Step 2: Test Your Live Website
1. Visit your Vercel URL: `https://prorecruit.vercel.app`
2. Navigate to registration: `https://prorecruit.vercel.app/candidates/register`
3. Fill the form and submit
4. Check MongoDB Atlas - candidate should be saved!

### Step 3: Add Email Configuration (Optional but Recommended)
1. Go to Render dashboard
2. Your backend service → Environment
3. Update:
   ```
   EMAIL_USER = your-gmail@gmail.com
   EMAIL_PASSWORD = your-16-character-app-password
   ```
4. Save (will trigger redeploy)

**How to get Gmail App Password:**
- Google Account → Security → 2-Step Verification → App passwords
- Generate new app password for "Mail"
- Use the 16-character password

---

## 📝 Quick Deployment Checklist

### Render Backend ✓
- [ ] Sign up at render.com
- [ ] Create Web Service
- [ ] Connect GitHub repo
- [ ] Set root directory to `server`
- [ ] Add all environment variables
- [ ] Deploy
- [ ] Copy backend URL
- [ ] Test /api/health endpoint

### Vercel Frontend ✓
- [ ] Sign up at vercel.com
- [ ] Import GitHub repo
- [ ] Set root directory to `client`
- [ ] Add REACT_APP_API_URL with Render backend URL
- [ ] Deploy
- [ ] Copy frontend URL

### Final Steps ✓
- [ ] Update CLIENT_URL in Render
- [ ] Update MongoDB Atlas network access
- [ ] Test live registration form
- [ ] Verify data saves to MongoDB
- [ ] (Optional) Add email credentials

---

## 🎯 Expected Results

After deployment:
- ✅ Frontend accessible worldwide
- ✅ Backend API responding
- ✅ Candidate registration working
- ✅ Data saving to MongoDB Atlas
- ✅ All pages responsive
- ✅ Professional domain ready (you can add custom domain later)

---

## 🔧 Troubleshooting

### If Backend Won't Deploy:
- Check build logs in Render
- Verify MongoDB URI is correct
- Ensure all dependencies in server/package.json

### If Frontend Won't Deploy:
- Check Vercel build logs
- Verify REACT_APP_API_URL is set
- Ensure client/package.json is correct

### If Form Submission Fails:
- Check Render logs for errors
- Verify CORS (CLIENT_URL) is set correctly
- Test backend health endpoint
- Check MongoDB Atlas network access

---

## 💡 Tips

1. **Free Tier Limitations:**
   - Render Free: Server sleeps after 15 min inactivity (wakes on request)
   - Vercel Free: Unlimited bandwidth, great for static sites
   - MongoDB Atlas Free: 512MB storage

2. **Custom Domain** (Optional):
   - Vercel: Settings → Domains → Add your domain
   - Render: Settings → Custom Domain → Add your domain

3. **Monitoring:**
   - Check Render logs for backend errors
   - Use Vercel Analytics for traffic
   - Monitor MongoDB Atlas for database usage

---

## 🎊 You're Ready to Deploy!

Follow the steps above in order. The whole process takes about 20-30 minutes.

Your recruitment platform will be live and accessible worldwide! 🌍

# 🚀 Deploy Both Frontend & Backend on Render

## Step-by-Step Guide

---

## 🔴 STEP 1: Deploy Backend to Render

### 1.1 Create Backend Service
1. Go to https://render.com → Sign up with GitHub
2. Click **"New +"** → **"Web Service"**
3. Connect repository: `saipavansp/prorecruit`
4. Click **"Connect"**

### 1.2 Configure Backend Service

| Field | Value |
|-------|-------|
| **Name** | `prorecruit-backend` |
| **Region** | Singapore or US West |
| **Branch** | `main` |
| **Root Directory** | `server` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | **Free** |

### 1.3 Add Backend Environment Variables

Click **"Advanced"** → Add these environment variables:

```
MONGODB_URI
mongodb+srv://kalyan18181818_db_user:Prorecruitdb@prorecruit.7cts0uh.mongodb.net/pro-recruit?retryWrites=true&w=majority&appName=prorecruit

NODE_ENV
production

JWT_SECRET
prorecruit-jwt-secret-2024-prod

PORT
5000

ADMIN_EMAIL
suryaraj@prorecruittechnologies.com

EMAIL_HOST
smtp.gmail.com

EMAIL_PORT
587
```

**Leave CLIENT_URL blank for now** (we'll add it after frontend deploys)

### 1.4 Deploy Backend
1. Click **"Create Web Service"**
2. Wait 5-10 minutes
3. You'll get a URL like: `https://prorecruit-backend.onrender.com`
4. **📋 COPY THIS URL!**

### 1.5 Test Backend
Visit: `https://prorecruit-backend.onrender.com/api/health`

Should see:
```json
{"status":"OK","message":"Server is running"}
```

✅ **Backend is LIVE!**

---

## 🟢 STEP 2: Deploy Frontend to Render

### 2.1 Create Frontend Service
1. In Render dashboard, click **"New +"** → **"Static Site"**
2. Connect repository: `saipavansp/prorecruit` (already connected)
3. Click **"Connect"**

### 2.2 Configure Frontend Service

| Field | Value |
|-------|-------|
| **Name** | `prorecruit-frontend` |
| **Branch** | `main` |
| **Root Directory** | `client` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `client/build` |

### 2.3 Add Frontend Environment Variable

Click **"Advanced"** → Add environment variable:

```
REACT_APP_API_URL
https://prorecruit-backend.onrender.com/api
```

**⚠️ Use YOUR actual backend URL from Step 1.4!**

### 2.4 Deploy Frontend
1. Click **"Create Static Site"**
2. Wait 3-5 minutes
3. You'll get a URL like: `https://prorecruit-frontend.onrender.com`
4. **📋 COPY THIS URL!**

✅ **Frontend is LIVE!**

---

## 🔵 STEP 3: Connect Frontend & Backend

### 3.1 Update Backend CORS
1. Go to Render dashboard
2. Click on **`prorecruit-backend`** service
3. Go to **"Environment"** tab
4. Click **"Add Environment Variable"**
5. Add:
   ```
   Key: CLIENT_URL
   Value: https://prorecruit-frontend.onrender.com
   ```
   **⚠️ Use YOUR actual frontend URL from Step 2.4!**
6. Click **"Save Changes"**
7. Backend will auto-redeploy (~2 minutes)

---

## 🎉 STEP 4: Test Your Live Website!

### 4.1 Visit Your Website
Open: `https://prorecruit-frontend.onrender.com`

### 4.2 Test All Pages
- ✅ Homepage loads with hero section
- ✅ About page
- ✅ Services page
- ✅ Jobs page
- ✅ Contact page

### 4.3 Test Candidate Registration
1. Go to: `/candidates/register`
2. Fill all 4 steps
3. Upload a resume (PDF/DOC)
4. Click **"Submit Application"**
5. Should see: ✅ "Registration successful!"

### 4.4 Verify Database
1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Click **"Browse Collections"**
3. Database: `pro-recruit`
4. Collection: `candidates`
5. You should see your test candidate! 🎊

---

## 📝 Your Live URLs

After deployment, you'll have:

- **Website (Frontend)**: `https://prorecruit-frontend.onrender.com`
- **API (Backend)**: `https://prorecruit-backend.onrender.com/api`
- **Database**: MongoDB Atlas (cloud)

---

## 🎯 Important Notes

### Free Tier Behavior
- **Both services sleep after 15 minutes of inactivity**
- First request after sleep takes 30-60 seconds to wake up
- This is normal for free tier
- Subsequent requests are fast

### To Keep Services Awake (Optional)
Use a service like:
- UptimeRobot.com (free)
- Ping your backend every 10 minutes

---

## 🔧 Troubleshooting

### If Backend Won't Deploy:
- Check build logs in Render
- Verify MongoDB URI is correct
- Make sure `server/package.json` exists

### If Frontend Won't Deploy:
- Check build logs
- Verify `REACT_APP_API_URL` is set correctly
- Make sure `client/package.json` exists

### If Form Submission Fails:
- Check backend logs in Render
- Verify CLIENT_URL is set to frontend URL
- Test backend health endpoint
- Check MongoDB Atlas network access (should be 0.0.0.0/0)

---

## ✅ Deployment Checklist

### Backend (Render)
- [ ] Service created
- [ ] Root directory: `server`
- [ ] All environment variables added
- [ ] Deployed successfully
- [ ] Health endpoint responds
- [ ] Backend URL copied

### Frontend (Render Static Site)
- [ ] Static site created
- [ ] Root directory: `client`
- [ ] REACT_APP_API_URL set to backend URL
- [ ] Deployed successfully
- [ ] Website loads
- [ ] Frontend URL copied

### Connection
- [ ] CLIENT_URL added to backend
- [ ] Backend redeployed
- [ ] Registration form works
- [ ] Data saves to MongoDB

---

## 🎊 You're Ready!

Both services will be on Render, making management easier. Follow the steps above and you'll be live in ~20 minutes!

**Start with Step 1 (Backend) first, then Step 2 (Frontend), then Step 3 (Connect).** 🚀

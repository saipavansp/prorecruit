# 🚀 Deploy Pro Recruit - START HERE

## Quick 3-Step Deployment (Both on Render)

---

## 1️⃣ Deploy Backend (API Server)

**Go to**: https://render.com → Sign up with GitHub

**Create Web Service:**
- Repository: `saipavansp/prorecruit`
- Name: `prorecruit-backend`
- Root Directory: **`server`** ⚠️
- Build: `npm install`
- Start: `npm start`
- Type: Free

**Environment Variables** (click Advanced):
```
MONGODB_URI = mongodb+srv://kalyan18181818_db_user:Prorecruitdb@prorecruit.7cts0uh.mongodb.net/pro-recruit?retryWrites=true&w=majority&appName=prorecruit

NODE_ENV = production

JWT_SECRET = prorecruit-jwt-secret-2024-prod

PORT = 5000

ADMIN_EMAIL = suryaraj@prorecruittechnologies.com
```

**Deploy** → Wait 5-10 min → **Copy backend URL**

Example: `https://prorecruit-backend.onrender.com`

---

## 2️⃣ Deploy Frontend (Website)

**Still in Render**, click **New +** → **Static Site**

**Configure:**
- Repository: `saipavansp/prorecruit`
- Name: `prorecruit-frontend`
- Root Directory: **`client`** ⚠️
- Build: `npm install && npm run build`
- Publish: `client/build`

**Environment Variable**:
```
REACT_APP_API_URL = https://prorecruit-backend.onrender.com/api
```
⚠️ Use YOUR backend URL from Step 1!

**Create Static Site** → Wait 3-5 min → **Copy frontend URL**

Example: `https://prorecruit-frontend.onrender.com`

---

## 3️⃣ Connect Them

**Go to Backend Service** → Environment → Add:
```
CLIENT_URL = https://prorecruit-frontend.onrender.com
```
⚠️ Use YOUR frontend URL from Step 2!

**Save** → Auto-redeploys in 2 min

---

## ✅ Test Your Live Site!

Visit: `https://prorecruit-frontend.onrender.com`

Go to Registration → Fill form → Submit → ✅ Should save to MongoDB!

---

## 🎉 Done!

**Your URLs:**
- Website: `https://prorecruit-frontend.onrender.com`
- API: `https://prorecruit-backend.onrender.com/api`

**Everything is deployed and working!** 🎊

---

## ⚠️ Important:
- Free tier: Services sleep after 15 min (wake automatically)
- First request after sleep: 30-60 seconds
- MongoDB Atlas: Make sure network access is set to 0.0.0.0/0

---

**That's it! Follow these 3 steps and you're live!** 🚀

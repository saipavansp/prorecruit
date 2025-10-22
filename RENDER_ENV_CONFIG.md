# 🔧 Render Environment Configuration

## Based on Your Live URLs

**Backend**: https://prorecruit.onrender.com  
**Frontend**: https://prorecruit-frontend.onrender.com

---

## 🔴 Backend Service Environment Variables

Go to: Render Dashboard → `prorecruit` (backend service) → **Environment** tab

### Required Variables:

```
MONGODB_URI
mongodb+srv://kalyan18181818_db_user:Prorecruitdb@prorecruit.7cts0uh.mongodb.net/pro-recruit?retryWrites=true&w=majority&appName=prorecruit
```

```
NODE_ENV
production
```

```
JWT_SECRET
prorecruit-jwt-secret-2024-prod
```

```
PORT
5000
```

```
CLIENT_URL
https://prorecruit-frontend.onrender.com
```

```
ADMIN_EMAIL
info@prorecruittechnologies.com
```

```
EMAIL_HOST
smtp.gmail.com
```

```
EMAIL_PORT
587
```

### Optional (for email notifications):
```
EMAIL_USER
(your-gmail@gmail.com - add when ready)
```

```
EMAIL_PASSWORD
(your-gmail-app-password - add when ready)
```

---

## 🟢 Frontend Static Site Environment Variable

Go to: Render Dashboard → `prorecruit-frontend` (static site) → **Environment** tab

### Required Variable:

```
REACT_APP_API_URL
https://prorecruit.onrender.com/api
```

⚠️ **Important**: No trailing slash after `/api`

---

## 🗄️ MongoDB Atlas Network Access

### Allow Render to Connect:

1. Go to https://cloud.mongodb.com
2. Click **"Network Access"** (left sidebar)
3. Click **"Add IP Address"**
4. Select **"Allow Access from Anywhere"**
5. IP Address will be: `0.0.0.0/0`
6. Comment: "Render deployment - all IPs"
7. Click **"Confirm"**
8. **Wait 2 minutes** for changes to propagate

This allows Render's servers to connect to your MongoDB Atlas cluster.

---

## 🔄 After Adding Environment Variables

### Backend Service:
1. Save environment variables
2. Will auto-redeploy (takes ~5 minutes)
3. Check logs: Should see "MongoDB connected successfully"

### Frontend Static Site:
1. Save environment variable
2. Will auto-rebuild (takes ~3 minutes)
3. Check logs: Build should succeed

---

## ✅ Verify Everything Works

### Test Backend:
```
https://prorecruit.onrender.com/api/health
```
Should return:
```json
{"status":"OK","message":"Server is running"}
```

### Test Frontend:
```
https://prorecruit-frontend.onrender.com
```
Should show your homepage!

### Test API Connection:
```
https://prorecruit-frontend.onrender.com/candidates/register
```
Fill form and submit - should save to MongoDB!

---

## 🚨 If MongoDB Error Persists

1. **Double-check MongoDB Atlas Network Access** is set to `0.0.0.0/0`
2. **Wait 2-3 minutes** after adding IP whitelist
3. **Redeploy backend** manually:
   - Render → Backend service → Manual Deploy → "Deploy latest commit"
4. **Check backend logs** for connection message

---

## 🎯 Quick Checklist

Backend:
- [ ] MONGODB_URI added
- [ ] CLIENT_URL points to frontend URL
- [ ] MongoDB Atlas network access: 0.0.0.0/0
- [ ] Service deployed successfully
- [ ] /api/health responds

Frontend:
- [ ] REACT_APP_API_URL points to backend URL
- [ ] Build successful
- [ ] Site loads
- [ ] Can navigate to all pages

Connection:
- [ ] Registration form submits
- [ ] Data appears in MongoDB Atlas
- [ ] No CORS errors in browser console

---

**Once all environment variables are set, both services will work perfectly!** 🎉

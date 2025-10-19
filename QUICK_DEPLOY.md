# ⚡ Quick Deploy Reference

## 🎯 Deploy in 3 Steps

### STEP 1: Render (Backend)
```
1. render.com → Sign up with GitHub
2. New + → Web Service → Connect prorecruit repo
3. Configure:
   - Root: server
   - Build: npm install
   - Start: npm start
4. Add env vars (see below)
5. Deploy → Copy URL
```

### STEP 2: Vercel (Frontend)
```
1. vercel.com → Sign up with GitHub
2. Add New Project → Import prorecruit
3. Configure:
   - Root: client
   - Framework: Create React App
4. Add env var:
   REACT_APP_API_URL=https://your-render-url.onrender.com/api
5. Deploy → Copy URL
```

### STEP 3: Connect Them
```
1. Render → Environment → Add:
   CLIENT_URL=https://your-vercel-url.vercel.app
2. Save (auto-redeploys)
3. Done! ✅
```

---

## 📋 Environment Variables Quick Copy

### For Render Backend:
```
MONGODB_URI=mongodb+srv://kalyan18181818_db_user:Prorecruitdb@prorecruit.7cts0uh.mongodb.net/pro-recruit?retryWrites=true&w=majority&appName=prorecruit

NODE_ENV=production

JWT_SECRET=prorecruit-jwt-secret-2024-prod

PORT=5000

ADMIN_EMAIL=suryaraj@prorecruittechnologies.com

EMAIL_HOST=smtp.gmail.com

EMAIL_PORT=587

CLIENT_URL=(add after Vercel deployment)
```

### For Vercel Frontend:
```
REACT_APP_API_URL=(add your Render backend URL)/api
```

---

## ✅ Testing After Deployment

1. Visit: `https://your-vercel-url.vercel.app`
2. Test: `https://your-vercel-url.vercel.app/candidates/register`
3. Submit form
4. Check MongoDB Atlas → Browse Collections → candidates

---

## 🆘 If Something Goes Wrong

### Backend Issues:
- Check Render logs
- Verify MongoDB URI
- Check network access in MongoDB Atlas

### Frontend Issues:
- Check Vercel build logs
- Verify REACT_APP_API_URL is set
- Check browser console for errors

### CORS Issues:
- Ensure CLIENT_URL in Render matches Vercel URL exactly
- No trailing slash

---

## 🎊 That's It!

Your recruitment platform will be live worldwide in ~20 minutes.

**Free tier limits:**
- Render: Sleeps after 15min inactivity (auto-wakes)
- Vercel: Unlimited bandwidth
- MongoDB: 512MB free storage

Perfect for Version 1! 🚀

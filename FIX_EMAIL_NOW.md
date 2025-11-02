# 📧 Fix Email - Step by Step

## 🎯 Current Situation:
- ✅ Google Sheets: **WORKING PERFECTLY!**
- ❌ Email: Not working (nodemailer error)

---

## 🔍 **Why Email Isn't Working:**

The error `nodemailer.createTransporter is not a function` means:

**Either:**
1. Nodemailer didn't install on Render
2. OR Environment variables not set

---

## ✅ **SOLUTION - Do This in Render:**

### **Step 1: Update Build Command**

Go to: Render Dashboard → `prorecruit` (backend) → Settings

**Find**: Build Command

**Change to**:
```
cd server && npm install && npm install nodemailer@latest --save
```

Click **"Save Changes"**

---

### **Step 2: Verify Environment Variables**

Still in Render → `prorecruit` → **Environment** tab

**Make sure these exist**:

```
EMAIL_HOST = smtp.gmail.com
EMAIL_PORT = 587
EMAIL_USER = suryaraj1045@gmail.com
EMAIL_PASSWORD = xhaqgvbbectuxyfm
ADMIN_EMAIL = suryaraj1045@gmail.com
```

**⚠️ IMPORTANT**: 
- Email password should be: `xhaqgvbbectuxyfm` (no spaces!)
- If it has spaces like `xhaq gvbb ectu xyfm`, remove them!

---

### **Step 3: Manual Deploy**

In Render → `prorecruit` → **Manual Deploy** section

Click: **"Deploy latest commit"**

Wait 3-4 minutes

---

### **Step 4: Check Logs**

After deploy, click: **"Logs"** tab

**Look for**:
```
✓ Nodemailer loaded successfully
Server is running on port 5000
```

**If you see**: `✗ Nodemailer failed to load` → Contact Render support

---

## 🧪 **Test Email Config:**

Visit:
```
https://prorecruit.onrender.com/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Server is running",
  "emailConfigured": true,
  "sheetsConfigured": true
}
```

If `emailConfigured: false` → Environment variables not set correctly

---

## 📋 **What's Already Working:**

✅ Registration form collects data  
✅ Google Sheets saves data (WORKING!)  
✅ Backend responds with success  
✅ User sees success message  

**Only email is pending!**

---

## 🎯 **If Still Not Working:**

### **Alternative: Use SendGrid (Free)**

If nodemailer continues to fail, we can switch to SendGrid:

1. Sign up: https://sendgrid.com (free tier)
2. Get API key
3. I'll update code to use SendGrid instead

**But try the Render fix first!** 

---

**Update the Build Command and redeploy - that should fix it!** 🚀

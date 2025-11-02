# ⚡ Quick Email Setup - 5 Minutes

## 🎯 **Goal:** 
Get admin email notifications when candidates register

---

## 📧 **Step-by-Step:**

### **Step 1: Get Gmail App Password (3 minutes)**

1. **Enable 2FA** (if not already):
   - Go to: https://myaccount.google.com/security
   - Enable "2-Step Verification"

2. **Generate App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - App: Select "Mail"
   - Device: "Other" → Type: "Pro Recruit"
   - Click "Generate"
   - **Copy the 16-character password**
   - Example: `abcd efgh ijkl mnop`
   - **Remove spaces**: `abcdefghijklmnop`

---

### **Step 2: Add to Render (2 minutes)**

1. **Go to Render Dashboard**: https://dashboard.render.com

2. **Click on Backend Service**: `prorecruit`

3. **Go to Environment Tab**

4. **Add These Variables:**

Click "Add Environment Variable" for each:

```
Key: EMAIL_USER
Value: info@prorecruittechnologies.com
```

```
Key: EMAIL_PASSWORD  
Value: abcdefghijklmnop
```
(Paste your 16-char password WITHOUT spaces)

```
Key: ADMIN_EMAIL
Value: info@prorecruittechnologies.com
```

5. **Click "Save Changes"**

6. Backend will auto-redeploy (~2 minutes)

---

### **Step 3: Test! (1 minute)**

1. Wait for backend to redeploy
2. Go to website: https://prorecruit-frontend.onrender.com
3. Fill registration form
4. Submit
5. **Check email**: info@prorecruittechnologies.com
6. You should receive notification with candidate details!

---

## ✅ **What Admin Will Receive:**

**Subject**: "New Candidate Registration - Pro Recruit"

**Content**:
- Candidate Type (Fresher/Experienced)
- Full Name
- Email (clickable)
- Phone (clickable)
- Experience
- Skills
- Address
- Registration ID

**Beautiful formatted HTML email!**

---

## 🚨 **Important:**

- Emails go **ONLY to admin** (info@prorecruittechnologies.com)
- **NO email** sent to candidates
- If email fails, registration still works (saves to MongoDB)

---

## ✅ **Already Configured in Code:**

- ✅ Email templates
- ✅ Nodemailer setup
- ✅ Error handling
- ✅ Admin-only sending
- ✅ Detailed candidate information

**Just add the credentials and it works!** 📧✨

---

**Total Time: 5 minutes**  
**Difficulty: Easy**  
**Result: Professional email notifications!** 🎊

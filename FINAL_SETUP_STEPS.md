# 🚀 FINAL SETUP - 3 Simple Steps

## ✅ Current Status:
- Frontend: LIVE ✓
- Backend: LIVE ✓  
- Registration: Works without database ✓
- Email: Needs credentials
- Sheets: Needs credentials + headers

---

## 📊 **STEP 1: Add Google Sheet Headers** (2 minutes)

Go to: https://docs.google.com/spreadsheets/d/1Vb9i3bMnHoDdNJqk7ojPPXlylveLqfav1o-Nnt0vhA8

**In Row 1, paste these headers** (tab-separated):

```
Timestamp	ID	Type	First Name	Last Name	Email	Phone	Aadhar Name	Skills	Address	Education	Company	Designation	Salary	Notice Period	Status
```

Or paste one by one in columns A through P:
- A1: Timestamp
- B1: ID
- C1: Type
- D1: First Name
- E1: Last Name
- F1: Email
- G1: Phone
- H1: Aadhar Name
- I1: Skills
- J1: Address
- K1: Education
- L1: Company
- M1: Designation
- N1: Salary
- O1: Notice Period
- P1: Status

---

## 📧 **STEP 2: Add Email Variables to Render** (5 minutes)

Go to: https://dashboard.render.com

Click: **prorecruit** (backend service) → **Environment**

**Add these 3 variables:**

1. Click "Add Environment Variable"
   ```
   Key: EMAIL_USER
   Value: suryaraj1045@gmail.com
   ```

2. Click "Add Environment Variable"
   ```
   Key: EMAIL_PASSWORD
   Value: xhaq gvbb ectu xyfm
   ```
   (Copy exactly with spaces, Render will handle it)

3. Click "Add Environment Variable"
   ```
   Key: ADMIN_EMAIL
   Value: suryaraj1045@gmail.com
   ```

4. Click **"Save Changes"**

Backend will redeploy (~2 minutes)

---

## 📊 **STEP 3: Add Google Sheets Variables** (8 minutes)

**Still in Render Backend Environment:**

1. Click "Add Environment Variable"
   ```
   Key: GOOGLE_SHEET_ID_FRESHERS
   Value: 1Vb9i3bMnHoDdNJqk7ojPPXlylveLqfav1o-Nnt0vhA8
   ```

2. Click "Add Environment Variable"
   ```
   Key: GOOGLE_SHEET_ID_EXPERIENCED
   Value: 1Vb9i3bMnHoDdNJqk7ojPPXlylveLqfav1o-Nnt0vhA8
   ```

3. Click "Add Environment Variable"
   ```
   Key: GOOGLE_SERVICE_ACCOUNT_JSON
   Value: (Paste the ENTIRE JSON I gave you earlier - all in ONE line)
   ```

   The JSON starts with: `{"type":"service_account",...`

4. Click **"Save Changes"**

Backend redeploys again (~2 minutes)

---

## ✅ **AFTER THESE 3 STEPS:**

**Test Registration:**
1. Go to: https://prorecruit-frontend.onrender.com/candidates/register
2. Select "Fresher" or "Experienced"
3. Fill form
4. Submit

**You'll Get:**
- ✅ Success message
- ✅ Email to candidate (confirmation)
- ✅ Email to admin (suryaraj1045@gmail.com with full details)
- ✅ New row in Google Sheet

---

## 🎊 **THAT'S IT!**

**Total Time**: 15 minutes  
**Result**: Fully functional recruitment platform!

---

## 🔍 **Current Known Issues:**

**Nodemailer Error**: Will be fixed once EMAIL_USER and EMAIL_PASSWORD are added to Render

**Google Sheets Error**: Will be fixed once:
- Headers added to sheet (Step 1)
- Variables added to Render (Step 3)
- Sheet shared with: `prorecruit-backend@prorecruit-477018.iam.gserviceaccount.com`

---

**Do these 3 steps and your site is 100% functional!** 🚀

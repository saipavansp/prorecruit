# 📧 📊 Email & Google Sheets Integration Plan

## 🎯 **Goal:**
When a candidate registers:
1. ✅ Save to MongoDB database
2. ✅ Send email to **admin only** (info@prorecruittechnologies.com) with candidate details
3. ✅ Sync candidate data to Google Sheets automatically

---

## 📧 **PART 1: Email Setup (Admin Notifications Only)**

### **What We Need:**

**Gmail Account Setup:**
- Email: info@prorecruittechnologies.com (or use your Gmail)
- App Password: 16-character code from Google

### **Step-by-Step Gmail Setup:**

#### **Step 1: Enable 2-Factor Authentication**
1. Go to https://myaccount.google.com/security
2. Click "2-Step Verification"
3. Follow prompts to enable (use phone number)
4. Complete setup

#### **Step 2: Generate App Password**
1. Go to https://myaccount.google.com/apppasswords
2. Select app: **"Mail"**
3. Select device: **"Other"** → Type: "Pro Recruit Backend"
4. Click **"Generate"**
5. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)
6. Remove spaces: `abcdefghijklmnop`

#### **Step 3: Add to Render Environment**
1. Go to Render Dashboard: https://dashboard.render.com
2. Click on **"prorecruit"** (backend service)
3. Go to **"Environment"** tab
4. Add these variables:

```
EMAIL_USER
info@prorecruittechnologies.com
```

```
EMAIL_PASSWORD
abcdefghijklmnop
```
(Your 16-character app password without spaces)

```
ADMIN_EMAIL
info@prorecruittechnologies.com
```

5. Click **"Save Changes"**
6. Backend will auto-redeploy (~2 minutes)

---

### **What Admin Will Receive:**

**Email Subject:** "New Candidate Registration"

**Email Content:**
```
New Candidate Registration

Candidate Details:
━━━━━━━━━━━━━━━━━━━
Name: [First Last Name]
Email: [candidate@email.com]
Phone: [+91 XXXXXXXXXX]
Experience: [X years] (or "Fresher")
Skills: [Skill1, Skill2, Skill3...]
━━━━━━━━━━━━━━━━━━━

View full details in MongoDB Atlas or Google Sheets.
```

**Already Configured:**
- ✅ Email templates exist in backend
- ✅ Nodemailer configured
- ✅ Auto-send on registration
- ✅ Error handling (won't break if email fails)

---

## 📊 **PART 2: Google Sheets Setup**

### **What We Need:**

1. **Google Cloud Project** (free)
2. **Service Account** with JSON key
3. **Google Sheet** with proper structure
4. **Sheet shared** with service account

### **Step-by-Step Google Sheets Setup:**

#### **Step 1: Create Google Cloud Project**
1. Go to https://console.cloud.google.com/
2. Click dropdown → **"New Project"**
3. Name: `Pro Recruit Technologies`
4. Click **"Create"**
5. Wait 30 seconds

#### **Step 2: Enable Required APIs**
1. In project dashboard, click **"Enable APIs and Services"**
2. Search **"Google Sheets API"** → Enable
3. Search **"Google Drive API"** → Enable

#### **Step 3: Create Service Account**
1. Left menu → **"IAM & Admin"** → **"Service Accounts"**
2. Click **"Create Service Account"**
   - Name: `prorecruit-backend`
   - Description: `Backend service for candidate data sync`
   - Click **"Create and Continue"**
3. Grant role: **"Editor"** → Click **"Continue"** → **"Done"**

#### **Step 4: Create JSON Key**
1. Click on the service account you created
2. Go to **"Keys"** tab
3. **"Add Key"** → **"Create new key"**
4. Format: **JSON**
5. Click **"Create"**
6. JSON file downloads (save it!)

**Example JSON structure:**
```json
{
  "type": "service_account",
  "project_id": "pro-recruit-xxxx",
  "private_key_id": "xxxxx",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...",
  "client_email": "prorecruit-backend@pro-recruit-xxxx.iam.gserviceaccount.com",
  ...
}
```

**Copy the `client_email`** - you'll need it!

#### **Step 5: Create Google Sheet**
1. Go to https://sheets.google.com
2. Create new sheet: **"Pro Recruit - Candidates"**
3. Add **header row** (Row 1):

```
Timestamp | ID | Type | First Name | Last Name | Email | Phone | Aadhar Name | Skills | Address | Education | Company | Designation | Salary | Notice Period | Status
```

4. **Copy Sheet ID** from URL:
```
https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
```

#### **Step 6: Share Sheet with Service Account**
1. Click **"Share"** button in Google Sheet
2. Paste the `client_email` from JSON (e.g., `prorecruit-backend@...iam.gserviceaccount.com`)
3. Permission: **"Editor"**
4. **Uncheck** "Notify people"
5. Click **"Share"**

#### **Step 7: Add to Render Environment**

**Two Options:**

**Option A: Upload JSON File** (Easier for first time)
1. Go to Render → Backend service → **"Environment"**
2. We'll add the file path (I'll help you set this up)

**Option B: JSON as Environment Variable** (Recommended)
1. Open your downloaded JSON file
2. Copy entire content (all lines)
3. In Render → Backend → Environment:

```
GOOGLE_SERVICE_ACCOUNT_JSON
{"type":"service_account","project_id":"...paste entire JSON here..."}
```

```
GOOGLE_SHEET_ID
your-sheet-id-from-url
```

4. Click **"Save Changes"**

---

## 🔧 **Backend Code Updates Needed:**

I'll need to update `server/utils/googleFormsSync.js` to:
1. Read JSON from environment variable
2. Authenticate properly
3. Format data for your sheet structure
4. Handle errors gracefully

---

## ✅ **Testing Checklist:**

### **Email Testing:**
- [ ] Add EMAIL_USER and EMAIL_PASSWORD to Render
- [ ] Redeploy backend
- [ ] Submit test registration
- [ ] Check info@prorecruittechnologies.com inbox
- [ ] Verify email received with candidate details

### **Google Sheets Testing:**
- [ ] Create Google Cloud project
- [ ] Enable APIs
- [ ] Create service account + download JSON
- [ ] Create Google Sheet with headers
- [ ] Share sheet with service account email
- [ ] Add GOOGLE_SHEET_ID to Render
- [ ] Add service account JSON to Render
- [ ] Redeploy backend
- [ ] Submit test registration
- [ ] Check Google Sheet for new row

---

## 📝 **What You Need to Provide:**

### **For Email (5 minutes):**
1. Gmail account email
2. 16-character app password

### **For Google Sheets (15 minutes):**
1. Complete steps 1-6 above
2. Provide:
   - Service account JSON content
   - Google Sheet ID

---

## 🎯 **Current Status:**

**Email:**
- ✅ Backend code ready
- ✅ Templates configured
- ⏳ Needs: EMAIL_USER + EMAIL_PASSWORD

**Google Sheets:**
- ✅ Backend code structure ready
- ⏳ Needs: Service account JSON + Sheet ID
- ⏳ May need minor code updates for authentication

---

## 🚀 **Recommended Order:**

### **Do This First:**
1. **Email Setup** (easier, 5 min)
   - Get app password
   - Add to Render
   - Test immediately

### **Then:**
2. **Google Sheets Setup** (15-20 min)
   - Create Cloud project
   - Get service account
   - Configure sheet
   - Add to Render
   - Test

---

## ⚡ **Quick Start - Email Only:**

If you want email working TODAY:

1. Go to https://myaccount.google.com/apppasswords
2. Generate app password
3. Add to Render:
   ```
   EMAIL_USER=info@prorecruittechnologies.com
   EMAIL_PASSWORD=your16charpassword
   ```
4. Save → Done! ✅

---

**Which would you like to set up first - Email or Google Sheets?** 

**Or should I create detailed step-by-step guides for both?** 📧📊

# 📊 Quick Google Sheets Setup - 15 Minutes

## 🎯 **Goal:**
Auto-sync candidate registrations to Google Sheets

---

## 📋 **Step-by-Step:**

### **Step 1: Create Google Sheet (2 minutes)**

1. Go to: https://sheets.google.com
2. Create new sheet
3. Name it: **"Pro Recruit - Candidates"**
4. Add header row (Row 1):

```
Timestamp | ID | Type | First Name | Last Name | Email | Phone | Aadhar Name | Skills | Address | Company | Designation | Salary | Notice Period | Status
```

5. **Copy Sheet ID** from URL:
```
https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
```

---

### **Step 2: Create Google Cloud Project (5 minutes)**

1. Go to: https://console.cloud.google.com/
2. Click "New Project"
3. Name: `Pro Recruit Technologies`
4. Click "Create"

---

### **Step 3: Enable APIs (2 minutes)**

1. In project, click "Enable APIs and Services"
2. Search "Google Sheets API" → **Enable**
3. Search "Google Drive API" → **Enable**

---

### **Step 4: Create Service Account (3 minutes)**

1. Left menu → "IAM & Admin" → "Service Accounts"
2. Click "Create Service Account"
   - Name: `prorecruit-backend`
   - Click "Create and Continue"
3. Role: **"Editor"** → Click "Continue" → "Done"

---

### **Step 5: Get JSON Key (1 minute)**

1. Click on service account you created
2. "Keys" tab → "Add Key" → "Create new key"
3. Format: **JSON**
4. Click "Create"
5. JSON file downloads → **Save it!**

Open the JSON file and find:
```json
{
  "client_email": "prorecruit-backend@xxxxx.iam.gserviceaccount.com",
  ...
}
```

**Copy this email!**

---

### **Step 6: Share Sheet (1 minute)**

1. Go back to your Google Sheet
2. Click "Share" button
3. Paste the `client_email` from JSON
4. Permission: **"Editor"**
5. **Uncheck** "Notify people"
6. Click "Share"

---

### **Step 7: Add to Render (2 minutes)**

Go to Render → Backend → Environment:

**Option A: Upload JSON as Text** (Easier)
```
Key: GOOGLE_SERVICE_ACCOUNT_JSON
Value: (Paste entire JSON file content - all of it!)
```

**Option B: Individual Fields** (If JSON too long)
```
Key: GOOGLE_SERVICE_ACCOUNT_EMAIL
Value: prorecruit-backend@xxxxx.iam.gserviceaccount.com

Key: GOOGLE_PRIVATE_KEY
Value: -----BEGIN PRIVATE KEY-----\nxxxxx...
```

**Also Add:**
```
Key: GOOGLE_SHEET_ID
Value: your-sheet-id-from-url
```

Save → Backend redeploys

---

## ✅ **What Gets Synced:**

Every registration automatically adds a row:
- Timestamp
- Candidate ID
- Type (Fresher/Experienced)
- Personal info
- Contact details
- Skills
- Experience details
- Status

**Real-time sync!** ⚡

---

## 🧪 **Testing:**

1. Wait for backend redeploy
2. Submit test registration
3. Check Google Sheet
4. New row should appear! ✅

---

## 🚨 **Troubleshooting:**

**If sheet not updating:**
- Verify service account email is shared with "Editor" permission
- Check Render logs for errors
- Verify GOOGLE_SHEET_ID is correct
- Make sure JSON is complete (all fields)

---

**Current Code Status:**
- ✅ Google Sheets sync code exists
- ✅ Error handling in place
- ⏳ Needs: Service account JSON + Sheet ID

**Once configured, auto-sync works instantly!** 📊✨

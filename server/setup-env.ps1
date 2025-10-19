# Create .env file with MongoDB Atlas configuration
$envContent = @"
# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://kalyan18181818_db_user:Prorecruitdb@prorecruit.7cts0uh.mongodb.net/pro-recruit?retryWrites=true&w=majority&appName=prorecruit

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=prorecruit-jwt-secret-2024

# Email Configuration (Update with your email credentials)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=suryaraj@prorecruittechnologies.com

# Google APIs Configuration (Optional - Add when needed)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:5000/auth/google/callback
GOOGLE_FORMS_API_KEY=your-google-forms-api-key
GOOGLE_SHEET_ID=your-google-sheet-id
GOOGLE_FORM_ID=your-google-form-id

# Frontend URL
CLIENT_URL=http://localhost:3000
"@

# Write content to .env file
Set-Content -Path ".env" -Value $envContent

Write-Host ".env file created successfully!" -ForegroundColor Green
Write-Host "MongoDB Atlas URI configured!" -ForegroundColor Green

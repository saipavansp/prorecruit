const { google } = require('googleapis');

// Initialize Google Forms API
const initializeGoogleForms = async () => {
  try {
    // In production, use service account or OAuth2
    // For now, we'll use API key (limited functionality)
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE,
      scopes: ['https://www.googleapis.com/auth/forms', 'https://www.googleapis.com/auth/spreadsheets']
    });
    
    const authClient = await auth.getClient();
    
    return {
      forms: google.forms({ version: 'v1', auth: authClient }),
      sheets: google.sheets({ version: 'v4', auth: authClient })
    };
  } catch (error) {
    console.error('Google API initialization error:', error);
    return null;
  }
};

// Sync candidate data to Google Forms/Sheets
exports.syncToGoogleForms = async (candidate) => {
  try {
    // Check if Google Forms sync is configured
    if (!process.env.GOOGLE_SHEET_ID) {
      console.log('Google Forms sync not configured');
      return;
    }
    
    const googleAPI = await initializeGoogleForms();
    if (!googleAPI) {
      console.log('Google API not initialized');
      return;
    }
    
    // Prepare data for Google Sheets
    const rowData = [
      new Date().toISOString(),
      candidate._id.toString(),
      candidate.firstName,
      candidate.lastName,
      candidate.email,
      candidate.phone,
      candidate.totalExperience,
      candidate.currentCTC,
      candidate.expectedCTC,
      candidate.noticePeriod,
      candidate.currentCompany || '',
      candidate.currentDesignation || '',
      candidate.skillCategory,
      candidate.skills.join(', '),
      candidate.preferredLocations.join(', '),
      candidate.openToRelocation ? 'Yes' : 'No',
      candidate.linkedinProfile || '',
      candidate.portfolioUrl || '',
      candidate.status,
      candidate.source
    ];
    
    // Append to Google Sheets
    const response = await googleAPI.sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Candidates!A:T', // Adjust range based on your sheet
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData]
      }
    });
    
    console.log('Candidate synced to Google Sheets:', response.data);
    
    // If you have a Google Form ID and want to create a pre-filled link
    if (process.env.GOOGLE_FORM_ID) {
      const preFilledUrl = createPreFilledFormUrl(candidate);
      console.log('Pre-filled form URL:', preFilledUrl);
    }
    
    return response.data;
  } catch (error) {
    console.error('Google Forms sync error:', error);
    // Don't throw error - sync failures shouldn't break the main flow
    return null;
  }
};

// Create pre-filled Google Form URL
const createPreFilledFormUrl = (candidate) => {
  const formId = process.env.GOOGLE_FORM_ID;
  const baseUrl = `https://docs.google.com/forms/d/e/${formId}/viewform?usp=pp_url`;
  
  // Map your form field IDs to candidate data
  // You need to get these IDs from your Google Form
  const fieldMappings = {
    'entry.1234567890': candidate.firstName + ' ' + candidate.lastName, // Name field
    'entry.0987654321': candidate.email, // Email field
    'entry.1111111111': candidate.phone, // Phone field
    // Add more field mappings as needed
  };
  
  // Build query string
  const queryParams = Object.entries(fieldMappings)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  
  return `${baseUrl}&${queryParams}`;
};

// Export data to Google Sheets (batch operation)
exports.exportToGoogleSheets = async (candidates) => {
  try {
    const googleAPI = await initializeGoogleForms();
    if (!googleAPI) {
      throw new Error('Google API not initialized');
    }
    
    // Prepare header row
    const headers = [
      'Timestamp',
      'ID',
      'First Name',
      'Last Name',
      'Email',
      'Phone',
      'Total Experience',
      'Current CTC',
      'Expected CTC',
      'Notice Period',
      'Current Company',
      'Current Designation',
      'Skill Category',
      'Skills',
      'Preferred Locations',
      'Open to Relocation',
      'LinkedIn Profile',
      'Portfolio URL',
      'Status',
      'Source'
    ];
    
    // Prepare data rows
    const dataRows = candidates.map(candidate => [
      new Date().toISOString(),
      candidate._id.toString(),
      candidate.firstName,
      candidate.lastName,
      candidate.email,
      candidate.phone,
      candidate.totalExperience,
      candidate.currentCTC,
      candidate.expectedCTC,
      candidate.noticePeriod,
      candidate.currentCompany || '',
      candidate.currentDesignation || '',
      candidate.skillCategory,
      candidate.skills.join(', '),
      candidate.preferredLocations.join(', '),
      candidate.openToRelocation ? 'Yes' : 'No',
      candidate.linkedinProfile || '',
      candidate.portfolioUrl || '',
      candidate.status,
      candidate.source
    ]);
    
    // Clear existing data and write new data
    await googleAPI.sheets.spreadsheets.values.clear({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Candidates!A:T'
    });
    
    await googleAPI.sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Candidates!A1:T' + (dataRows.length + 1),
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [headers, ...dataRows]
      }
    });
    
    return { success: true, count: dataRows.length };
  } catch (error) {
    console.error('Export to Google Sheets error:', error);
    throw error;
  }
};

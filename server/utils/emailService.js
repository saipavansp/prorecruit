const nodemailer = require('nodemailer');
console.log('✓ Nodemailer loaded successfully');
console.log('Nodemailer type:', typeof nodemailer);
console.log('Has createTransporter:', typeof nodemailer?.createTransporter);

let ejs;

try {
  ejs = require('ejs');
  console.log('✓ EJS loaded successfully');
} catch (error) {
  console.error('✗ EJS failed to load:', error.message);
  ejs = null;
}

const path = require('path');
const fs = require('fs').promises;

// Create transporter
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error('Email credentials not configured');
  }
  
  const config = {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  };
  
  return nodemailer.createTransporter(config);
};

// Email templates
const templates = {
  candidateRegistration: (data) => ({
    subject: 'Registration Successful - Pro Recruit Technologies',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #5DADE2; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Pro Recruit Technologies</h1>
          <p style="color: white; margin: 5px 0;">Making dreams and aspirations come true</p>
        </div>
        <div style="padding: 30px; background-color: #f8f9fa;">
          <h2 style="color: #333;">Dear ${data.name},</h2>
          <p style="color: #666; line-height: 1.6;">
            Thank you for registering with Pro Recruit Technologies. We have received your application 
            and our team will review it shortly.
          </p>
          <div style="background-color: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="color: #666; margin: 0;"><strong>Registration ID:</strong> ${data.registrationId}</p>
          </div>
          <p style="color: #666; line-height: 1.6;">
            We will contact you if your profile matches any of our current openings. 
            In the meantime, feel free to explore more opportunities on our website.
          </p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #999; font-size: 14px; margin: 0;">Best regards,</p>
            <p style="color: #666; font-weight: bold; margin: 5px 0;">Pro Recruit Technologies Team</p>
            <p style="color: #999; font-size: 12px;">
              Email: suryaraj@prorecruittechnologies.com<br>
              Phone: +91 8867825850
            </p>
          </div>
        </div>
      </div>
    `
  }),

  adminNotification: (data) => ({
    subject: 'New Candidate Registration - Pro Recruit',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; background-color: #f5f5f5; padding: 20px;">
        <div style="background: linear-gradient(135deg, #5DADE2 0%, #3498db 100%); padding: 30px; border-radius: 10px 10px 0 0;">
          <h2 style="color: white; margin: 0; text-align: center;">🎉 New Candidate Registration</h2>
        </div>
        <div style="padding: 30px; background-color: white; border-radius: 0 0 10px 10px;">
          <h3 style="color: #2C3E50; margin-bottom: 20px;">Candidate Information:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background-color: #f8f9fa;">
              <td style="padding: 12px; border-bottom: 1px solid #ddd; font-weight: bold; width: 40%;">Candidate Type:</td>
              <td style="padding: 12px; border-bottom: 1px solid #ddd;">${data.candidateType || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #ddd; font-weight: bold;">Name:</td>
              <td style="padding: 12px; border-bottom: 1px solid #ddd;">${data.candidateName}</td>
            </tr>
            <tr style="background-color: #f8f9fa;">
              <td style="padding: 12px; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
              <td style="padding: 12px; border-bottom: 1px solid #ddd;"><a href="mailto:${data.email}" style="color: #5DADE2;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #ddd; font-weight: bold;">Phone:</td>
              <td style="padding: 12px; border-bottom: 1px solid #ddd;"><a href="tel:${data.phone}" style="color: #5DADE2;">${data.phone}</a></td>
            </tr>
            <tr style="background-color: #f8f9fa;">
              <td style="padding: 12px; border-bottom: 1px solid #ddd; font-weight: bold;">Experience:</td>
              <td style="padding: 12px; border-bottom: 1px solid #ddd;">${data.experience === 'Fresher' ? 'Fresher' : data.experience + ' years'}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #ddd; font-weight: bold;">Skills:</td>
              <td style="padding: 12px; border-bottom: 1px solid #ddd;">${data.skills}</td>
            </tr>
            <tr style="background-color: #f8f9fa;">
              <td style="padding: 12px; border-bottom: 1px solid #ddd; font-weight: bold;">Address:</td>
              <td style="padding: 12px; border-bottom: 1px solid #ddd;">${data.address}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold;">Registration ID:</td>
              <td style="padding: 12px;"><code style="background-color: #f0f0f0; padding: 4px 8px; border-radius: 4px;">${data.registrationId}</code></td>
            </tr>
          </table>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #e8f4f8; border-left: 4px solid #5DADE2; border-radius: 5px;">
            <p style="margin: 0; color: #2C3E50;"><strong>📌 Action Required:</strong></p>
            <p style="margin: 10px 0 0 0; color: #666;">
              Review this candidate in your MongoDB dashboard or Google Sheets.
            </p>
          </div>
          
          <div style="margin-top: 20px; text-align: center;">
            <p style="color: #999; font-size: 14px;">
              Sent from Pro Recruit Technologies<br>
              Automated notification - Do not reply
            </p>
          </div>
        </div>
      </div>
    `
  }),

  jobApplication: (data) => ({
    subject: `Application Received - ${data.jobTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #5DADE2; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Application Received</h1>
        </div>
        <div style="padding: 30px; background-color: #f8f9fa;">
          <h2 style="color: #333;">Dear ${data.candidateName},</h2>
          <p style="color: #666; line-height: 1.6;">
            We have received your application for the position of <strong>${data.jobTitle}</strong> 
            at <strong>${data.company}</strong>.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Our recruitment team will review your application and get back to you if your profile 
            matches our requirements.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Thank you for your interest in this opportunity.
          </p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #999; font-size: 14px; margin: 0;">Best regards,</p>
            <p style="color: #666; font-weight: bold; margin: 5px 0;">Pro Recruit Technologies Team</p>
          </div>
        </div>
      </div>
    `
  }),

  inquiryAutoResponse: (data) => ({
    subject: 'Thank you for contacting Pro Recruit Technologies',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #5DADE2; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Thank You for Contacting Us</h1>
        </div>
        <div style="padding: 30px; background-color: #f8f9fa;">
          <h2 style="color: #333;">Dear ${data.name},</h2>
          <p style="color: #666; line-height: 1.6;">
            We have received your inquiry and appreciate you reaching out to us. 
            Our team will review your message and respond within 24-48 hours.
          </p>
          <div style="background-color: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="color: #666; margin: 0;"><strong>Reference Number:</strong> ${data.inquiryId}</p>
          </div>
          <p style="color: #666; line-height: 1.6;">
            Please use this reference number for any follow-up communication.
          </p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #999; font-size: 14px; margin: 0;">Best regards,</p>
            <p style="color: #666; font-weight: bold; margin: 5px 0;">Pro Recruit Technologies Team</p>
          </div>
        </div>
      </div>
    `
  }),

  inquiryNotification: (data) => ({
    subject: `New Inquiry: ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #5DADE2; padding: 20px;">
          <h2 style="color: white; margin: 0;">New Inquiry Received</h2>
        </div>
        <div style="padding: 20px; background-color: #f8f9fa;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Type:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.inquiryType}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Subject:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.subject}</td>
            </tr>
            <tr>
              <td style="padding: 10px; vertical-align: top;"><strong>Message:</strong></td>
              <td style="padding: 10px;">${data.message}</td>
            </tr>
          </table>
        </div>
      </div>
    `
  }),

  inquiryResponse: (data) => ({
    subject: `Re: ${data.subject || 'Your Inquiry'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #5DADE2; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Response to Your Inquiry</h1>
        </div>
        <div style="padding: 30px; background-color: #f8f9fa;">
          <h2 style="color: #333;">Dear ${data.name},</h2>
          <div style="background-color: #e8f4f8; padding: 15px; border-left: 4px solid #5DADE2; margin: 20px 0;">
            <p style="color: #666; margin: 0;"><strong>Your original message:</strong></p>
            <p style="color: #666; margin: 10px 0; font-style: italic;">"${data.originalMessage}"</p>
          </div>
          <div style="background-color: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="color: #666; line-height: 1.6; margin: 0;">${data.response}</p>
          </div>
          <p style="color: #666; line-height: 1.6;">
            If you have any further questions, please don't hesitate to contact us.
          </p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #999; font-size: 14px; margin: 0;">Best regards,</p>
            <p style="color: #666; font-weight: bold; margin: 5px 0;">Pro Recruit Technologies Team</p>
          </div>
        </div>
      </div>
    `
  })
};

// Send email function
exports.sendEmail = async ({ to, subject, template, data, html, text }) => {
  try {
    const transporter = createTransporter();
    
    // Get template if specified
    let emailContent = {};
    if (template && templates[template]) {
      emailContent = templates[template](data);
    } else {
      emailContent = { subject, html, text };
    }
    
    // Prepare mail options
    const mailOptions = {
      from: `Pro Recruit Technologies <${process.env.EMAIL_USER}>`,
      to,
      subject: emailContent.subject || subject,
      html: emailContent.html || html,
      text: emailContent.text || text
    };
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    
    return info;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

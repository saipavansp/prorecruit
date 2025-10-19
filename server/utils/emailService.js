const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs').promises;

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
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
    subject: 'New Candidate Registration',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #5DADE2; padding: 20px;">
          <h2 style="color: white; margin: 0;">New Candidate Registration</h2>
        </div>
        <div style="padding: 20px; background-color: #f8f9fa;">
          <h3 style="color: #333;">Candidate Details:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.candidateName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Experience:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.experience} years</td>
            </tr>
            <tr>
              <td style="padding: 10px;"><strong>Skills:</strong></td>
              <td style="padding: 10px;">${data.skills}</td>
            </tr>
          </table>
          <p style="margin-top: 20px;">
            <a href="${process.env.CLIENT_URL}/admin/candidates" 
               style="background-color: #5DADE2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
              View in Dashboard
            </a>
          </p>
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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { FaUser, FaBriefcase, FaGraduationCap, FaMapMarkerAlt, FaUpload } from 'react-icons/fa';
import { candidateAPI } from '../services/api';
import { Candidate } from '../types';
import { 
  NOTICE_PERIODS, 
  SKILL_CATEGORIES, 
  IT_SKILLS, 
  NON_IT_SKILLS, 
  INDIAN_CITIES 
} from '../utils/constants';
import './CandidateRegistrationPage.css';

const CandidateRegistrationPage: React.FC = () => {
  type OptionType = { value: string; label: string };
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [latestResumeFile, setLatestResumeFile] = useState<File | null>(null);
  
  const { register, handleSubmit, control, watch, formState: { errors }, trigger } = useForm<Candidate>({
    mode: 'onChange'
  });

  const watchSkillCategory = watch('skillCategory');

  const steps = [
    {
      title: 'Personal Information',
      icon: FaUser,
      fields: ['firstName', 'lastName', 'email', 'phone', 'fullNameAadhar']
    },
    {
      title: 'Professional Details',
      icon: FaBriefcase,
      fields: ['totalExperience', 'currentCTC', 'expectedCTC', 'noticePeriod', 'currentCompany', 'currentDesignation', 'currentJobTitle']
    },
    {
      title: 'Skills & Expertise',
      icon: FaGraduationCap,
      fields: ['skillCategory', 'skills']
    },
    {
      title: 'Resume & Preferences',
      icon: FaMapMarkerAlt,
      fields: ['preferredLocations', 'openToRelocation', 'resume', 'latestResume']
    }
  ];

  const validateStep = async () => {
    const fieldsToValidate = steps[currentStep].fields;
    const isValid = await trigger(fieldsToValidate as any);
    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateStep();
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload a PDF or DOC file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should not exceed 5MB');
        return;
      }
      setResumeFile(file);
    }
  };

  const handleLatestFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload a PDF or DOC file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should not exceed 5MB');
        return;
      }
      setLatestResumeFile(file);
    }
  };

  const onSubmit = async (data: Candidate) => {
    if (!resumeFile) {
      toast.error('Please upload your resume');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Basic details
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('fullNameAadhar', data.fullNameAadhar);
      formData.append('email', data.email);
      formData.append('phone', data.phone);

      // Professional info (only if provided - for experienced candidates)
      if (data.totalExperience !== undefined) formData.append('totalExperience', String(data.totalExperience));
      if (data.currentCTC !== undefined) formData.append('currentCTC', String(data.currentCTC));
      if (data.expectedCTC !== undefined) formData.append('expectedCTC', String(data.expectedCTC));
      if (data.noticePeriod) formData.append('noticePeriod', data.noticePeriod);
      if (data.currentCompany) formData.append('currentCompany', data.currentCompany);
      if (data.currentDesignation) formData.append('currentDesignation', data.currentDesignation);
      if (data.currentJobTitle) formData.append('currentJobTitle', data.currentJobTitle);

      // Skills
      if (data.skillCategory) formData.append('skillCategory', data.skillCategory);
      formData.append('skills', (data.skills || []).join(','));

      // Address
      if (data.address?.street) formData.append('address.street', data.address.street);
      if (data.address?.postalCode) formData.append('address.postalCode', data.address.postalCode);
      if (data.address?.city) formData.append('address.city', data.address.city);
      if (data.address?.province) formData.append('address.province', data.address.province);
      if (data.address?.country) formData.append('address.country', data.address.country);

      // Preferences
      formData.append('preferredLocations', (data.preferredLocations || []).join(','));
      if (data.openToRelocation) formData.append('openToRelocation', String(data.openToRelocation));

      // Files
      formData.append('resume', resumeFile);
      if (latestResumeFile) formData.append('latestResume', latestResumeFile);

      const response = await candidateAPI.register(formData);
      
      if (response.success) {
        toast.success('Registration successful! We will contact you soon.');
        navigate('/');
      }
    } catch (error: any) {
      const srv = error?.response?.data;
      if (srv?.errors && Array.isArray(srv.errors)) {
        const msgs = srv.errors.map((e: any) => e.msg).join('\n');
        toast.error(msgs || 'Please correct the highlighted errors.');
      } else {
        toast.error(srv?.message || 'Registration failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const skillOptions = watchSkillCategory === 'IT' ? IT_SKILLS : NON_IT_SKILLS;

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="registration-page">
      {/* Decorative background shapes */}
      <div className="bg-decoration bg-circle-1"></div>
      <div className="bg-decoration bg-circle-2"></div>
      <div className="bg-decoration bg-circle-3"></div>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="registration-container"
        >
          <h1>Candidate Registration</h1>
          <p className="registration-subtitle">Join us and take the next step in your career</p>

          {/* Progress Bar */}
          <div className="registration-progress">
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="step-indicators">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`step-indicator ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                >
                  <div className="step-icon">
                    {React.createElement(step.icon)}
                  </div>
                  <span className="step-title">{step.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
            {/* Step 1: Personal Information */}
            {currentStep === 0 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="form-step"
              >
                <h2>{steps[0].title}</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">First Name *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.firstName ? 'error' : ''}`}
                      {...register('firstName', { required: 'First name is required' })}
                    />
                    {errors.firstName && <span className="form-error">{errors.firstName.message}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Last Name *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.lastName ? 'error' : ''}`}
                      {...register('lastName', { required: 'Last name is required' })}
                    />
                    {errors.lastName && <span className="form-error">{errors.lastName.message}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'error' : ''}`}
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                    />
                    {errors.email && <span className="form-error">{errors.email.message}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Phone *</label>
                    <input
                      type="tel"
                      className={`form-control ${errors.phone ? 'error' : ''}`}
                      {...register('phone', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[6-9]\d{9}$/,
                          message: 'Invalid Indian phone number'
                        }
                      })}
                    />
                    {errors.phone && <span className="form-error">{errors.phone.message}</span>}
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Full Name of Candidate as per Aadhar *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.fullNameAadhar ? 'error' : ''}`}
                      {...register('fullNameAadhar', { required: 'Full name as per Aadhar is required' })}
                    />
                    {errors.fullNameAadhar && <span className="form-error">{errors.fullNameAadhar.message}</span>}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Professional Details */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="form-step"
              >
                <h2>{steps[1].title}</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Total Experience (Years) *</label>
                    <input
                      type="number"
                      className={`form-control ${errors.totalExperience ? 'error' : ''}`}
                      {...register('totalExperience', {
                        required: 'Experience is required',
                        min: { value: 0, message: 'Experience cannot be negative' }
                      })}
                    />
                    {errors.totalExperience && <span className="form-error">{errors.totalExperience.message}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Current CTC (LPA) *</label>
                    <input
                      type="number"
                      className={`form-control ${errors.currentCTC ? 'error' : ''}`}
                      {...register('currentCTC', {
                        required: 'Current CTC is required',
                        min: { value: 0, message: 'CTC cannot be negative' }
                      })}
                    />
                    {errors.currentCTC && <span className="form-error">{errors.currentCTC.message}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Expected CTC (LPA) *</label>
                    <input
                      type="number"
                      className={`form-control ${errors.expectedCTC ? 'error' : ''}`}
                      {...register('expectedCTC', {
                        required: 'Expected CTC is required',
                        min: { value: 0, message: 'CTC cannot be negative' }
                      })}
                    />
                    {errors.expectedCTC && <span className="form-error">{errors.expectedCTC.message}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Notice Period *</label>
                    <select
                      className={`form-control ${errors.noticePeriod ? 'error' : ''}`}
                      {...register('noticePeriod', { required: 'Notice period is required' })}
                    >
                      <option value="">Select Notice Period</option>
                      {NOTICE_PERIODS.map(period => (
                        <option key={period} value={period}>{period}</option>
                      ))}
                    </select>
                    {errors.noticePeriod && <span className="form-error">{errors.noticePeriod.message}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Current Company</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register('currentCompany')}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Current Designation</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register('currentDesignation')}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Skills & Expertise */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="form-step"
              >
                <h2>{steps[2].title}</h2>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label className="form-label">Skill Category *</label>
                    <select
                      className={`form-control ${errors.skillCategory ? 'error' : ''}`}
                      {...register('skillCategory', { required: 'Skill category is required' })}
                    >
                      <option value="">Select Category</option>
                      {SKILL_CATEGORIES.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    {errors.skillCategory && <span className="form-error">{errors.skillCategory.message}</span>}
                  </div>
                  
                  <div className="form-group full-width">
                    <label className="form-label">Skills *</label>
                    <Controller
                      name="skills"
                      control={control}
                      rules={{ required: 'At least one skill is required' }}
                      render={({ field }) => (
                        <Select<OptionType, true>
                          isMulti
                          options={skillOptions.map((skill) => ({ value: skill, label: skill }))}
                          className="react-select-container"
                          classNamePrefix="react-select"
                          placeholder="Select your skills..."
                          value={(field.value || []).map((s: string) => ({ value: s, label: s }))}
                          onChange={(selected) => field.onChange((selected as OptionType[]).map((o) => o.value))}
                        />
                      )}
                    />
                    {errors.skills && <span className="form-error">{errors.skills.message}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">LinkedIn Profile</label>
                    <input
                      type="url"
                      className="form-control"
                      {...register('linkedinProfile')}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Portfolio URL</label>
                    <input
                      type="url"
                      className="form-control"
                      {...register('portfolioUrl')}
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Resume & Preferences */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="form-step"
              >
                <h2>{steps[3].title}</h2>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label className="form-label">Preferred Locations *</label>
                    <Controller
                      name="preferredLocations"
                      control={control}
                      rules={{ required: 'At least one location is required' }}
                      render={({ field }) => (
                        <Select<OptionType, true>
                          isMulti
                          options={INDIAN_CITIES.map((city) => ({ value: city, label: city }))}
                          className="react-select-container"
                          classNamePrefix="react-select"
                          placeholder="Select preferred locations..."
                          value={(field.value || []).map((s: string) => ({ value: s, label: s }))}
                          onChange={(selected) => field.onChange((selected as OptionType[]).map((o) => o.value))}
                        />
                      )}
                    />
                    {errors.preferredLocations && <span className="form-error">{errors.preferredLocations.message}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        {...register('openToRelocation')}
                      />
                      Open to Relocation
                    </label>
                  </div>
                  
                  <div className="form-group full-width">
                    <label className="form-label">Upload Resume * (PDF/DOC, Max 5MB)</label>
                    <div className="file-upload-container">
                      <input
                        type="file"
                        id="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="file-input"
                      />
                      <label htmlFor="resume" className="file-label">
                        <FaUpload />
                        <span>{resumeFile ? resumeFile.name : 'Choose file'}</span>
                      </label>
                    </div>
                    {!resumeFile && <span className="form-error">Resume is required</span>}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="form-navigation">
              <button
                type="button"
                className="btn btn-outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                Previous
              </button>
              
              {currentStep === steps.length - 1 ? (
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNext}
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CandidateRegistrationPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { 
  FaUser, 
  FaBriefcase, 
  FaGraduationCap, 
  FaMapMarkerAlt, 
  FaUpload,
  FaUserGraduate,
  FaUserTie,
  FaBuilding,
  FaCalendarAlt
} from 'react-icons/fa';
import { candidateAPI } from '../services/api';
import { Candidate } from '../types';
import { 
  NOTICE_PERIODS, 
  IT_SKILLS, 
  NON_IT_SKILLS
} from '../utils/constants';
import './CandidateRegistrationPage.css';

const CandidateRegistrationPageNew: React.FC = () => {
  type OptionType = { value: string; label: string };
  const navigate = useNavigate();
  const [candidateType, setCandidateType] = useState<'Fresher' | 'Experienced' | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  
  const { register, handleSubmit, control, watch, formState: { errors }, trigger, reset, setValue } = useForm<Candidate>({
    mode: 'onChange'
  });

  const watchSkillCategory = watch('skillCategory');

  // FRESHER Steps
  const fresherSteps = [
    { title: 'Personal Information', icon: FaUser },
    { title: 'Address', icon: FaMapMarkerAlt },
    { title: 'Skills', icon: FaGraduationCap },
    { title: 'Educational Details', icon: FaGraduationCap },
    { title: 'Resume', icon: FaUpload }
  ];

  // EXPERIENCED Steps
  const experiencedSteps = [
    { title: 'Personal Information', icon: FaUser },
    { title: 'Address', icon: FaMapMarkerAlt },
    { title: 'Skills', icon: FaGraduationCap },
    { title: 'Educational Details', icon: FaGraduationCap },
    { title: 'Experience Details', icon: FaBriefcase },
    { title: 'Resume', icon: FaUpload }
  ];

  const steps = candidateType === 'Fresher' ? fresherSteps : experiencedSteps;

  const handleTypeSelection = (type: 'Fresher' | 'Experienced') => {
    setCandidateType(type);
    setValue('candidateType', type);
    setCurrentStep(0);
    reset({ candidateType: type });
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
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

  const onSubmit = async (data: Candidate) => {
    if (!resumeFile) {
      toast.error('Please upload your resume');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Type
      formData.append('candidateType', candidateType!);

      // Personal
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('fullNameAadhar', data.fullNameAadhar);
      formData.append('email', data.email);
      formData.append('phone', data.phone);

      // Address
      if (data.address) formData.append('address', data.address);

      // Skills  
      if (data.skills && data.skills.length > 0) {
        formData.append('skills', data.skills.join(','));
      }

      // Education
      if (data.education?.highestQualification) formData.append('education.highestQualification', data.education.highestQualification);
      if (data.education?.institution) formData.append('education.institution', data.education.institution);
      if (data.education?.graduationYear) formData.append('education.graduationYear', String(data.education.graduationYear));

      // Experience (ONLY for Experienced)
      if (candidateType === 'Experienced') {
        if (data.totalExperience !== undefined) formData.append('totalExperience', String(data.totalExperience));
        if (data.currentCTC !== undefined) formData.append('currentCTC', String(data.currentCTC));
        if (data.expectedCTC !== undefined) formData.append('expectedCTC', String(data.expectedCTC));
        if (data.currentCompany) formData.append('currentCompany', data.currentCompany);
        if (data.currentDesignation) formData.append('currentDesignation', data.currentDesignation);
        if (data.joiningDate) formData.append('joiningDate', data.joiningDate);
        if (data.relievingDate) formData.append('relievingDate', data.relievingDate);
        if (data.currentSalary) formData.append('currentSalary', String(data.currentSalary));
        if (data.noticePeriod) formData.append('noticePeriod', data.noticePeriod);
      }

      // Resume
      formData.append('resume', resumeFile);

      const response = await candidateAPI.register(formData);
      
      if (response.success) {
        toast.success('Registration successful! We will contact you soon.');
        navigate('/');
      }
    } catch (error: any) {
      const srv = error?.response?.data;
      if (srv?.errors && Array.isArray(srv.errors)) {
        const msgs = srv.errors.map((e: any) => e.msg).join('\n');
        toast.error(msgs || 'Please correct errors.');
      } else {
        toast.error(srv?.message || 'Registration failed.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const skillOptions = watchSkillCategory === 'IT' ? IT_SKILLS : NON_IT_SKILLS;
  const progress = candidateType ? ((currentStep + 1) / steps.length) * 100 : 0;

  // SELECTION SCREEN
  if (!candidateType) {
    return (
      <div className="registration-page">
        <div className="bg-decoration bg-circle-1"></div>
        <div className="bg-decoration bg-circle-2"></div>
        <div className="bg-decoration bg-circle-3"></div>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="registration-container"
          >
            <h1>Candidate Registration</h1>
            <p className="registration-subtitle">Choose your profile type</p>

            <div className="candidate-type-selection">
              <motion.div
                className="type-card"
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTypeSelection('Fresher')}
              >
                <div className="type-icon-circle">
                  <FaUserGraduate />
                </div>
                <h2>Fresher</h2>
                <p>For recent graduates and entry-level candidates</p>
                <ul>
                  <li>No work experience required</li>
                  <li>Entry-level opportunities</li>
                  <li>Start your career journey</li>
                </ul>
                <button type="button" className="btn btn-primary">Select</button>
              </motion.div>

              <motion.div
                className="type-card"
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTypeSelection('Experienced')}
              >
                <div className="type-icon-circle">
                  <FaUserTie />
                </div>
                <h2>Experienced</h2>
                <p>For working professionals</p>
                <ul>
                  <li>Career advancement</li>
                  <li>Better opportunities</li>
                  <li>Senior positions</li>
                </ul>
                <button type="button" className="btn btn-primary">Select</button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // MULTI-STEP FORM
  return (
    <div className="registration-page">
      <div className="bg-decoration bg-circle-1"></div>
      <div className="bg-decoration bg-circle-2"></div>
      <div className="bg-decoration bg-circle-3"></div>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="registration-container"
        >
          <div className="registration-header">
            <button className="back-to-selection" onClick={() => {setCandidateType(null); setCurrentStep(0); reset();}}>
              ← Change Type
            </button>
            <h1>Registration - {candidateType}</h1>
            <p className="registration-subtitle">Please fill in all required information</p>
          </div>

          {/* Progress */}
          <div className="registration-progress">
            <div className="progress-bar">
              <motion.div className="progress-fill" animate={{ width: `${progress}%` }} />
            </div>
            <div className="step-indicators">
              {steps.map((step, idx) => (
                <div key={idx} className={`step-indicator ${idx === currentStep ? 'active' : ''} ${idx < currentStep ? 'completed' : ''}`}>
                  <div className="step-icon">{React.createElement(step.icon)}</div>
                  <span className="step-title">{step.title}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
            <AnimatePresence mode="wait">
              {/* Step 0: Personal Information */}
              {currentStep === 0 && (
                <motion.div key="step0" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="form-step">
                  <h2>Personal Information</h2>
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">First Name *</label>
                      <input type="text" className={`form-control ${errors.firstName ? 'error' : ''}`} {...register('firstName', { required: 'Required' })} />
                      {errors.firstName && <span className="form-error">{errors.firstName.message}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Last Name *</label>
                      <input type="text" className={`form-control ${errors.lastName ? 'error' : ''}`} {...register('lastName', { required: 'Required' })} />
                      {errors.lastName && <span className="form-error">{errors.lastName.message}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input type="email" className={`form-control ${errors.email ? 'error' : ''}`} {...register('email', { required: 'Required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} />
                      {errors.email && <span className="form-error">{errors.email.message}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone *</label>
                      <input type="tel" className={`form-control ${errors.phone ? 'error' : ''}`} {...register('phone', { required: 'Required', pattern: { value: /^[6-9]\d{9}$/, message: 'Invalid phone' } })} />
                      {errors.phone && <span className="form-error">{errors.phone.message}</span>}
                    </div>
                    <div className="form-group full-width">
                      <label className="form-label">Full Name as per Aadhar Card *</label>
                      <input type="text" className={`form-control ${errors.fullNameAadhar ? 'error' : ''}`} {...register('fullNameAadhar', { required: 'Required' })} />
                      {errors.fullNameAadhar && <span className="form-error">{errors.fullNameAadhar.message}</span>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 1: Address */}
              {currentStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="form-step">
                  <h2>Address</h2>
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label className="form-label">Address *</label>
                      <textarea className={`form-control ${errors.address ? 'error' : ''}`} rows={3} {...register('address', { required: 'Required' })} />
                      {errors.address && <span className="form-error">{errors.address.message}</span>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Skills */}
              {currentStep === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="form-step">
                  <h2>Skills</h2>
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label className="form-label">Skill Category *</label>
                      <select className={`form-control ${errors.skillCategory ? 'error' : ''}`} {...register('skillCategory', { required: 'Required' })}>
                        <option value="">Select Category</option>
                        <option value="IT">IT</option>
                        <option value="Non-IT">Non-IT</option>
                      </select>
                      {errors.skillCategory && <span className="form-error">{errors.skillCategory.message}</span>}
                    </div>
                    <div className="form-group full-width">
                      <label className="form-label">Skills *</label>
                      <Controller
                        name="skills"
                        control={control}
                        rules={{ required: 'Select at least one skill' }}
                        render={({ field }) => (
                          <Select<OptionType, true>
                            isMulti
                            options={skillOptions.map(s => ({ value: s, label: s }))}
                            value={(field.value || []).map((s: string) => ({ value: s, label: s }))}
                            onChange={(selected) => field.onChange((selected as OptionType[]).map(o => o.value))}
                            className="react-select-container"
                            placeholder="Select skills..."
                          />
                        )}
                      />
                      {errors.skills && <span className="form-error">{errors.skills.message}</span>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Educational Details */}
              {currentStep === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="form-step">
                  <h2>Educational Details</h2>
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Highest Qualification</label>
                      <input type="text" className="form-control" {...register('education.highestQualification')} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Institution</label>
                      <input type="text" className="form-control" {...register('education.institution')} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Graduation Year</label>
                      <input type="number" className="form-control" {...register('education.graduationYear')} min="1980" max="2030" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Experience Details (ONLY for Experienced) */}
              {currentStep === 4 && candidateType === 'Experienced' && (
                <motion.div key="step4" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="form-step">
                  <h2>Experience Details</h2>
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Company Name *</label>
                      <input type="text" className={`form-control ${errors.currentCompany ? 'error' : ''}`} {...register('currentCompany', { required: 'Required' })} />
                      {errors.currentCompany && <span className="form-error">{errors.currentCompany.message}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Designation *</label>
                      <input type="text" className={`form-control ${errors.currentDesignation ? 'error' : ''}`} {...register('currentDesignation', { required: 'Required' })} />
                      {errors.currentDesignation && <span className="form-error">{errors.currentDesignation.message}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Total Experience (Years) *</label>
                      <input type="number" className={`form-control ${errors.totalExperience ? 'error' : ''}`} {...register('totalExperience', { required: 'Required', min: 0 })} step="0.1" />
                      {errors.totalExperience && <span className="form-error">{errors.totalExperience.message}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Current CTC (LPA) *</label>
                      <input type="number" className={`form-control ${errors.currentCTC ? 'error' : ''}`} {...register('currentCTC', { required: 'Required', min: 0 })} step="0.1" />
                      {errors.currentCTC && <span className="form-error">{errors.currentCTC.message}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Expected CTC (LPA) *</label>
                      <input type="number" className={`form-control ${errors.expectedCTC ? 'error' : ''}`} {...register('expectedCTC', { required: 'Required', min: 0 })} step="0.1" />
                      {errors.expectedCTC && <span className="form-error">{errors.expectedCTC.message}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Joining Date</label>
                      <input type="date" className="form-control" {...register('joiningDate')} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Relieving Date</label>
                      <input type="date" className="form-control" {...register('relievingDate')} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Current Salary (LPA)</label>
                      <input type="number" className="form-control" {...register('currentSalary')} min="0" step="0.1" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Notice Period *</label>
                      <select className={`form-control ${errors.noticePeriod ? 'error' : ''}`} {...register('noticePeriod', { required: 'Required' })}>
                        <option value="">Select Notice Period</option>
                        {NOTICE_PERIODS.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                      {errors.noticePeriod && <span className="form-error">{errors.noticePeriod.message}</span>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Final Step: Resume */}
              {((candidateType === 'Fresher' && currentStep === 4) || (candidateType === 'Experienced' && currentStep === 5)) && (
                <motion.div key="stepResume" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="form-step">
                  <h2>Upload Resume</h2>
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label className="form-label">Resume * (PDF/DOC, Max 5MB)</label>
                      <div className="file-upload-container">
                        <input type="file" id="resume" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="file-input" />
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
            </AnimatePresence>

            {/* Navigation */}
            <div className="form-navigation">
              <button type="button" className="btn btn-outline" onClick={handlePrevious} disabled={currentStep === 0 || isSubmitting}>
                Previous
              </button>
              {currentStep === steps.length - 1 ? (
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span> Submitting Application...
                    </>
                  ) : 'Submit Application'}
                </button>
              ) : (
                <button type="button" className="btn btn-primary" onClick={handleNext} disabled={isSubmitting}>
                  Next
                </button>
              )}
            </div>

            {isSubmitting && (
              <div className="submission-overlay">
                <div className="submission-modal">
                  <div className="spinner-large"></div>
                  <h3>Processing Your Application</h3>
                  <p>Please wait while we submit your registration...</p>
                  <div className="submission-steps">
                    <div className="submission-step">✓ Validating information</div>
                    <div className="submission-step">✓ Uploading resume</div>
                    <div className="submission-step active">⏳ Saving to database...</div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CandidateRegistrationPageNew;

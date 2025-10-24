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
  FaUserTie
} from 'react-icons/fa';
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

const CandidateRegistrationNew: React.FC = () => {
  type OptionType = { value: string; label: string };
  const navigate = useNavigate();
  const [candidateType, setCandidateType] = useState<'Fresher' | 'Experienced' | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  
  const { register, handleSubmit, control, watch, formState: { errors }, trigger, reset } = useForm<Candidate>({
    mode: 'onChange'
  });

  const watchSkillCategory = watch('skillCategory');

  // Steps for Fresher
  const fresherSteps = [
    {
      title: 'Personal Information',
      icon: FaUser,
      fields: ['firstName', 'lastName', 'email', 'phone', 'fullNameAadhar']
    },
    {
      title: 'Address',
      icon: FaMapMarkerAlt,
      fields: ['address']
    },
    {
      title: 'Skills',
      icon: FaGraduationCap,
      fields: ['skillCategory', 'skills']
    },
    {
      title: 'Educational Details',
      icon: FaGraduationCap,
      fields: ['education.highestQualification', 'education.institution', 'education.graduationYear']
    },
    {
      title: 'Resume',
      icon: FaUpload,
      fields: ['resume']
    }
  ];

  // Steps for Experienced
  const experiencedSteps = [
    {
      title: 'Personal Information',
      icon: FaUser,
      fields: ['firstName', 'lastName', 'email', 'phone', 'fullNameAadhar']
    },
    {
      title: 'Address',
      icon: FaMapMarkerAlt,
      fields: ['address']
    },
    {
      title: 'Skills',
      icon: FaGraduationCap,
      fields: ['skillCategory', 'skills']
    },
    {
      title: 'Educational Details',
      icon: FaGraduationCap,
      fields: ['education.highestQualification', 'education.institution', 'education.graduationYear']
    },
    {
      title: 'Experience Details',
      icon: FaBriefcase,
      fields: ['currentCompany', 'currentDesignation', 'joiningDate', 'relievingDate', 'currentSalary', 'noticePeriod']
    },
    {
      title: 'Resume',
      icon: FaUpload,
      fields: ['resume']
    }
  ];

  const steps = candidateType === 'Fresher' ? fresherSteps : experiencedSteps;

  const handleTypeSelection = (type: 'Fresher' | 'Experienced') => {
    setCandidateType(type);
    setCurrentStep(0);
    reset();
  };

  const validateStep = async () => {
    if (!candidateType) return false;
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

  const onSubmit = async (data: Candidate) => {
    if (!resumeFile) {
      toast.error('Please upload your resume');
      return;
    }

    if (!candidateType) {
      toast.error('Please select candidate type');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Add candidate type
      formData.append('candidateType', candidateType);

      // Basic details
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('fullNameAadhar', data.fullNameAadhar);
      formData.append('email', data.email);
      formData.append('phone', data.phone);

      // Address
      if (data.address) formData.append('address', data.address);

      // Skills
      if (data.skillCategory) formData.append('skillCategory', data.skillCategory);
      formData.append('skills', (data.skills || []).join(','));

      // Education
      if (data.education?.highestQualification) formData.append('education.highestQualification', data.education.highestQualification);
      if (data.education?.institution) formData.append('education.institution', data.education.institution);
      if (data.education?.graduationYear) formData.append('education.graduationYear', String(data.education.graduationYear));

      // Experience details (only for Experienced)
      if (candidateType === 'Experienced') {
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
        toast.error(msgs || 'Please correct the highlighted errors.');
      } else {
        toast.error(srv?.message || 'Registration failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const skillOptions = watchSkillCategory === 'IT' ? IT_SKILLS : NON_IT_SKILLS;
  const progress = candidateType ? ((currentStep + 1) / steps.length) * 100 : 0;

  // Selection Screen
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
            transition={{ duration: 0.6 }}
            className="registration-container"
          >
            <h1>Candidate Registration</h1>
            <p className="registration-subtitle">Choose your profile type to get started</p>

            <div className="candidate-type-selection">
              <motion.div
                className="type-card"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTypeSelection('Fresher')}
              >
                <FaUserGraduate className="type-icon" />
                <h2>Fresher</h2>
                <p>For candidates with little or no work experience</p>
                <ul>
                  <li>Recent graduates</li>
                  <li>Career starters</li>
                  <li>Entry-level positions</li>
                </ul>
                <button className="btn btn-primary">Register as Fresher</button>
              </motion.div>

              <motion.div
                className="type-card"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTypeSelection('Experienced')}
              >
                <FaUserTie className="type-icon" />
                <h2>Experienced</h2>
                <p>For professionals with work experience</p>
                <ul>
                  <li>Working professionals</li>
                  <li>Career changers</li>
                  <li>Senior positions</li>
                </ul>
                <button className="btn btn-primary">Register as Experienced</button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Rest of the component continues with the existing multi-step form structure...
  // (I'll continue in the next part)
  
  return (
    <div className="registration-page">
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
          <div className="registration-header">
            <button 
              className="back-to-selection"
              onClick={() => setCandidateType(null)}
            >
              ← Change Type
            </button>
            <h1>Candidate Registration - {candidateType}</h1>
            <p className="registration-subtitle">Join us and take the next step in your career</p>
          </div>

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

          {/* Form will continue in next file update... */}
          <p>Form implementation continues...</p>
        </motion.div>
      </div>
    </div>
  );
};

export default CandidateRegistrationNew;

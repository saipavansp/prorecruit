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
  SKILL_CATEGORIES, 
  IT_SKILLS, 
  NON_IT_SKILLS
} from '../utils/constants';
import './CandidateRegistrationPage.css';

const CandidateRegistrationPageDual: React.FC = () => {
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

  // FRESHER Steps (5 steps)
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

  // EXPERIENCED Steps (6 steps)
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
    setValue('candidateType', type);
    setCurrentStep(0);
    reset({ candidateType: type });
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
      if (data.skills && data.skills.length > 0) {
        formData.append('skills', data.skills.join(','));
      }

      // Education
      if (data.education?.highestQualification) formData.append('education.highestQualification', data.education.highestQualification);
      if (data.education?.institution) formData.append('education.institution', data.education.institution);
      if (data.education?.graduationYear) formData.append('education.graduationYear', String(data.education.graduationYear));

      // Experience details (ONLY for Experienced)
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

  // TYPE SELECTION SCREEN
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
            <p className="registration-subtitle">Choose your profile type to continue</p>

            <div className="candidate-type-selection">
              <motion.div
                className="type-card fresher-card"
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTypeSelection('Fresher')}
              >
                <FaUserGraduate className="type-icon" />
                <h2>Fresher</h2>
                <p className="type-desc">For recent graduates and entry-level candidates</p>
                <ul className="type-features">
                  <li>✓ No work experience required</li>
                  <li>✓ Recent graduates welcome</li>
                  <li>✓ Entry-level opportunities</li>
                </ul>
                <button type="button" className="btn btn-primary btn-lg">
                  Register as Fresher
                </button>
              </motion.div>

              <motion.div
                className="type-card experienced-card"
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTypeSelection('Experienced')}
              >
                <FaUserTie className="type-icon" />
                <h2>Experienced</h2>
                <p className="type-desc">For professionals with work experience</p>
                <ul className="type-features">
                  <li>✓ Working professionals</li>
                  <li>✓ Career advancement</li>
                  <li>✓ Senior positions</li>
                </ul>
                <button type="button" className="btn btn-primary btn-lg">
                  Register as Experienced
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // MULTI-STEP FORM (continues in next part...)
  // This file is getting long - I'll split the implementation

  return (
    <div className="registration-page">
      <div className="bg-decoration bg-circle-1"></div>
      <div className="bg-decoration bg-circle-2"></div>
      <div className="bg-decoration bg-circle-3"></div>
      <div className="container">
        <p>Form implementation continues...</p>
      </div>
    </div>
  );
};

export default CandidateRegistrationPageDual;

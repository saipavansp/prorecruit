import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaCheck, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Candidate } from '../../types';
import { FormStep } from '../../types';
import './MultiStepForm.css';

interface MultiStepFormProps {
  steps: FormStep[];
  onSubmit: (data: any) => Promise<void>;
  initialData?: Partial<Candidate>;
  children?: React.ReactNode;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ steps, onSubmit, initialData, children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  const { register, handleSubmit, control, formState: { errors }, watch, trigger, getValues } = useForm({
    defaultValues: initialData || {},
    mode: 'onChange'
  });

  // Save form data to localStorage on change
  const formData = watch();
  useEffect(() => {
    localStorage.setItem('candidateFormData', JSON.stringify(formData));
  }, [formData]);

  // Load saved form data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('candidateFormData');
    if (savedData && !initialData) {
      const parsedData = JSON.parse(savedData);
      Object.keys(parsedData).forEach(key => {
        register(key as any).onChange({ target: { value: parsedData[key] } });
      });
    }
  }, []);

  const validateCurrentStep = async () => {
    const currentFields = steps[currentStep].fields;
    const isValid = await trigger(currentFields as any);
    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleStepClick = async (stepIndex: number) => {
    if (stepIndex < currentStep || completedSteps.includes(stepIndex)) {
      setCurrentStep(stepIndex);
    }
  };

  const handleFormSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      localStorage.removeItem('candidateFormData');
      toast.success('Registration successful! We will contact you soon.');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="multi-step-form">
      {/* Progress Bar */}
      <div className="form-progress">
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="progress-steps">
          {steps.map((step, index) => (
            <button
              key={step.id}
              className={`progress-step ${index === currentStep ? 'active' : ''} ${completedSteps.includes(index) ? 'completed' : ''}`}
              onClick={() => handleStepClick(index)}
              disabled={index > currentStep && !completedSteps.includes(index)}
            >
              <span className="step-number">
                {completedSteps.includes(index) ? <FaCheck /> : index + 1}
              </span>
              <span className="step-title">{step.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="form-step-content"
          >
            <h2>{steps[currentStep].title}</h2>
            <p className="step-description">{steps[currentStep].description}</p>
            
            <div className="form-fields">
              {/* Render form fields based on current step */}
              {/* This will be populated by the parent component */}
              {React.Children.map(children, (child, index) => {
                if (index === currentStep) return child;
                return null;
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="form-navigation">
          <button
            type="button"
            className="btn btn-outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <FaArrowLeft /> Previous
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span> Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleNext}
            >
              Next <FaArrowRight />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;

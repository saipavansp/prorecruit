import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  FaMapMarkerAlt, 
  FaBriefcase, 
  FaClock, 
  FaRupeeSign, 
  FaUsers, 
  FaCalendarAlt,
  FaArrowLeft 
} from 'react-icons/fa';
import { jobAPI } from '../services/api';
import { Job } from '../types';
import './JobDetailPage.css';

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  const fetchJobDetails = async () => {
    setLoading(true);
    try {
      const response = await jobAPI.getById(id!);
      setJob(response.data!);
    } catch (error) {
      console.error('Error fetching job details:', error);
      toast.error('Failed to load job details');
      navigate('/jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    // Direct user to register as candidate
    toast.info('Please register first to apply for this job');
    navigate('/candidates/register');
  };

  if (loading) {
    return (
      <div className="job-detail-page">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading job details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="job-detail-page">
        <div className="container">
          <p>Job not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="job-detail-page">
      <div className="container">
        <button className="back-button" onClick={() => navigate('/jobs')}>
          <FaArrowLeft /> Back to Jobs
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="job-detail-container"
        >
          {/* Header */}
          <div className="job-header">
            <div>
              <h1>{job.title}</h1>
              <p className="company-name">{job.company}</p>
              <div className="job-meta">
                <span className={`job-category ${job.category.toLowerCase()}`}>
                  {job.category}
                </span>
                <span className="job-views">
                  <FaUsers /> {job.views} views
                </span>
                {job.applicationCount !== undefined && (
                  <span className="job-applications">
                    {job.applicationCount} applications
                  </span>
                )}
              </div>
            </div>
            <div className="job-actions">
              <button 
                className="btn btn-primary"
                onClick={handleApply}
                disabled={applying || job.status !== 'Active'}
              >
                {applying ? 'Applying...' : 'Apply Now'}
              </button>
            </div>
          </div>

          {/* Key Information */}
          <div className="job-key-info">
            <div className="info-item">
              <FaMapMarkerAlt />
              <div>
                <span className="info-label">Location</span>
                <span className="info-value">{job.location}</span>
              </div>
            </div>
            <div className="info-item">
              <FaBriefcase />
              <div>
                <span className="info-label">Job Type</span>
                <span className="info-value">{job.jobType}</span>
              </div>
            </div>
            <div className="info-item">
              <FaClock />
              <div>
                <span className="info-label">Experience</span>
                <span className="info-value">{job.experience.min}-{job.experience.max} years</span>
              </div>
            </div>
            {job.salary && (
              <div className="info-item">
                <FaRupeeSign />
                <div>
                  <span className="info-label">Salary</span>
                  <span className="info-value">
                    {job.salary.min}-{job.salary.max} LPA
                    {job.salary.isNegotiable && ' (Negotiable)'}
                  </span>
                </div>
              </div>
            )}
            <div className="info-item">
              <FaUsers />
              <div>
                <span className="info-label">Openings</span>
                <span className="info-value">{job.openings || 1} positions</span>
              </div>
            </div>
            {job.applicationDeadline && (
              <div className="info-item">
                <FaCalendarAlt />
                <div>
                  <span className="info-label">Apply By</span>
                  <span className="info-value">
                    {new Date(job.applicationDeadline).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <section className="job-section">
            <h2>Job Description</h2>
            <p>{job.description}</p>
          </section>

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <section className="job-section">
              <h2>Requirements</h2>
              <ul>
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <section className="job-section">
              <h2>Key Responsibilities</h2>
              <ul>
                {job.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Skills */}
          <section className="job-section">
            <h2>Required Skills</h2>
            <div className="skills-list">
              {job.skills.map(skill => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>
          </section>

          {/* Benefits */}
          {job.benefits && job.benefits.length > 0 && (
            <section className="job-section">
              <h2>Benefits</h2>
              <ul>
                {job.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Apply CTA */}
          <div className="job-cta">
            <p>Interested in this position?</p>
            <button 
              className="btn btn-primary btn-lg"
              onClick={handleApply}
              disabled={applying || job.status !== 'Active'}
            >
              {applying ? 'Applying...' : 'Apply for This Job'}
            </button>
            {job.status !== 'Active' && (
              <p className="job-inactive">This position is no longer accepting applications.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JobDetailPage;

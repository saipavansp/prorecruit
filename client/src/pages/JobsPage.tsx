import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaBriefcase, FaClock, FaRupeeSign, FaFilter } from 'react-icons/fa';
import { jobAPI } from '../services/api';
import { Job } from '../types';
import { JOB_TYPES, SKILL_CATEGORIES } from '../utils/constants';
import './JobsPage.css';

const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    jobType: '',
    location: '',
    minExperience: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await jobAPI.getActive();
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      // If backend is unavailable, show empty state
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      jobType: '',
      location: '',
      minExperience: ''
    });
  };

  // Filter jobs based on selected filters
  const filteredJobs = jobs.filter(job => {
    if (filters.category && job.category !== filters.category) return false;
    if (filters.jobType && job.jobType !== filters.jobType) return false;
    if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.minExperience && job.experience.min > parseInt(filters.minExperience)) return false;
    return true;
  });

  return (
    <div className="jobs-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Current Job Openings</h1>
          <p className="jobs-intro">
            Discover exciting career opportunities with our partner companies
          </p>
        </motion.div>

        <div className="jobs-content">
          {/* Filters */}
          <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
            <div className="filters-header">
              <h3>Filters</h3>
              <button className="clear-filters" onClick={clearFilters}>Clear All</button>
            </div>
            
            <div className="filter-group">
              <label>Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="form-control"
              >
                <option value="">All Categories</option>
                {SKILL_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Job Type</label>
              <select
                value={filters.jobType}
                onChange={(e) => handleFilterChange('jobType', e.target.value)}
                className="form-control"
              >
                <option value="">All Types</option>
                {JOB_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Location</label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                placeholder="Search location..."
                className="form-control"
              />
            </div>

            <div className="filter-group">
              <label>Min Experience (Years)</label>
              <input
                type="number"
                value={filters.minExperience}
                onChange={(e) => handleFilterChange('minExperience', e.target.value)}
                placeholder="0"
                min="0"
                className="form-control"
              />
            </div>
          </aside>

          {/* Job Listings */}
          <div className="jobs-list">
            <div className="jobs-header">
              <p className="jobs-count">{filteredJobs.length} jobs found</p>
              <button
                className="filter-toggle"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter /> Filters
              </button>
            </div>

            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
                <p>Loading jobs...</p>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="no-jobs">
                <p>No jobs found matching your criteria.</p>
                <button className="btn btn-primary" onClick={clearFilters}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <motion.div className="job-cards">
                {filteredJobs.map((job, index) => (
                  <motion.div
                    key={job._id}
                    className="job-card"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="job-card-header">
                      <h3>{job.title}</h3>
                      <span className={`job-category ${job.category.toLowerCase()}`}>
                        {job.category}
                      </span>
                    </div>
                    
                    <p className="company-name">{job.company}</p>
                    
                    <div className="job-details">
                      <span className="job-detail">
                        <FaMapMarkerAlt /> {job.location}
                      </span>
                      <span className="job-detail">
                        <FaBriefcase /> {job.jobType}
                      </span>
                      <span className="job-detail">
                        <FaClock /> {job.experience.min}-{job.experience.max} years
                      </span>
                      {job.salary && (
                        <span className="job-detail">
                          <FaRupeeSign /> {job.salary.min}-{job.salary.max} LPA
                        </span>
                      )}
                    </div>
                    
                    <p className="job-description">
                      {job.description.substring(0, 150)}...
                    </p>
                    
                    <div className="job-skills">
                      {job.skills.slice(0, 3).map(skill => (
                        <span key={skill} className="skill-tag">{skill}</span>
                      ))}
                      {job.skills.length > 3 && (
                        <span className="skill-tag more">+{job.skills.length - 3} more</span>
                      )}
                    </div>
                    
                    <Link to={`/jobs/${job._id}`} className="btn btn-primary">
                      View Details
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;

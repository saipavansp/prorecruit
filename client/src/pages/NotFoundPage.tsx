import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaSearch } from 'react-icons/fa';
import './NotFoundPage.css';

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <motion.div
          className="not-found-content"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="error-code">404</div>
          <h1>Page Not Found</h1>
          <p>
            Oops! The page you're looking for doesn't exist. 
            It might have been moved or deleted.
          </p>
          
          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary">
              <FaHome /> Go to Homepage
            </Link>
            <Link to="/jobs" className="btn btn-outline">
              <FaSearch /> Browse Jobs
            </Link>
          </div>

          <div className="helpful-links">
            <h3>Here are some helpful links:</h3>
            <div className="links-grid">
              <Link to="/about">About Us</Link>
              <Link to="/services">Our Services</Link>
              <Link to="/candidates/register">Register as Candidate</Link>
              <Link to="/contact">Contact Us</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;

import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { COMPANY_INFO } from '../../utils/constants';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>{COMPANY_INFO.name}</h3>
            <p>{COMPANY_INFO.tagline}</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/jobs">Jobs</Link></li>
              <li><Link to="/candidates/register">Register</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul className="footer-links">
              <li><Link to="/services#it-recruitment">IT Recruitment</Link></li>
              <li><Link to="/services#non-it-recruitment">Non-IT Recruitment</Link></li>
              <li><Link to="/services#permanent-staffing">Permanent Staffing</Link></li>
              <li><Link to="/services#contract-staffing">Contract Staffing</Link></li>
              <li><Link to="/services#executive-search">Executive Search</Link></li>
              <li><Link to="/services#volume-hiring">Volume Hiring</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <FaMapMarkerAlt />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="contact-item">
                <FaEnvelope />
                <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
              </div>
              <div className="contact-item">
                <FaPhone />
                <a href={`tel:${COMPANY_INFO.phone}`}>{COMPANY_INFO.phone}</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} CodeLoom Technologies. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-conditions">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

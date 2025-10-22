import React from 'react';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaHeadset, FaBriefcase, FaFileContract, FaUserTie, FaUsers } from 'react-icons/fa';
import { SERVICES, IT_SKILLS, NON_IT_SKILLS } from '../utils/constants';
import './ServicesPage.css';

const ServicesPage: React.FC = () => {
  const serviceDetails = [
    {
      id: 'it-recruitment',
      icon: FaLaptopCode,
      title: SERVICES.IT.title,
      description: SERVICES.IT.description,
      details: 'We specialize in recruiting top IT talent across various technologies and domains.',
      skills: IT_SKILLS.slice(0, 15) // Show first 15 skills
    },
    {
      id: 'non-it-recruitment',
      icon: FaHeadset,
      title: SERVICES.NON_IT.title,
      description: SERVICES.NON_IT.description,
      details: 'Comprehensive recruitment solutions for BPO, KPO, Sales, Marketing, and more.',
      skills: NON_IT_SKILLS.slice(0, 15)
    },
    {
      id: 'permanent-staffing',
      icon: FaBriefcase,
      title: SERVICES.PERMANENT.title,
      description: SERVICES.PERMANENT.description,
      details: 'We help you find permanent employees who align with your company culture and long-term goals.'
    },
    {
      id: 'contract-staffing',
      icon: FaFileContract,
      title: SERVICES.CONTRACT.title,
      description: SERVICES.CONTRACT.description,
      details: 'Flexible staffing solutions for project-based needs, seasonal demands, and specialized assignments.'
    },
    {
      id: 'executive-search',
      icon: FaUserTie,
      title: SERVICES.EXECUTIVE.title,
      description: SERVICES.EXECUTIVE.description,
      details: 'Confidential and targeted search for C-level executives and senior leadership positions.'
    },
    {
      id: 'volume-hiring',
      icon: FaUsers,
      title: SERVICES.VOLUME.title,
      description: SERVICES.VOLUME.description,
      details: 'Efficient large-scale recruitment for startups, expanding businesses, and new project launches.'
    }
  ];

  return (
    <div className="services-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Our Services</h1>
          <p className="services-intro">
            Pro Recruit Technologies offers comprehensive recruitment solutions tailored to meet your specific needs. 
            Whether you're looking for IT specialists, BPO professionals, or executive talent, we have the expertise 
            and network to deliver results.
          </p>
        </motion.div>

        <div className="services-list">
          {serviceDetails.map((service, index) => (
            <motion.section
              key={service.id}
              id={service.id}
              className="service-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
                <div className="service-header">
                {React.createElement(service.icon, { className: 'service-icon' })}
                <div>
                  <h2>{service.title}</h2>
                  <p className="service-description">{service.description}</p>
                </div>
              </div>
              
              <div className="service-content">
                <p>{service.details}</p>
                
                {service.skills && (
                  <div className="skills-showcase">
                    <h3>Key Areas</h3>
                    <div className="skills-list">
                      {service.skills.map((skill) => (
                        <span key={skill} className="skill-tag">{skill}</span>
                      ))}
                      <span className="skill-tag more">And many more...</span>
                    </div>
                  </div>
                )}
                
                <div className="service-benefits">
                  <h3>Why Choose Us</h3>
                  <ul>
                    <li>Extensive network of qualified professionals</li>
                    <li>Rigorous screening and verification process</li>
                    <li>Quick turnaround time</li>
                    <li>Post-placement support</li>
                    <li>Competitive pricing</li>
                  </ul>
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        <motion.section
          className="cta-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Ready to Find Your Perfect Match?</h2>
          <p>Let us help you build your dream team or find your dream job.</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary">Get Started</Link>
            <Link to="/candidates/register" className="btn btn-outline">Register as Candidate</Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ServicesPage;

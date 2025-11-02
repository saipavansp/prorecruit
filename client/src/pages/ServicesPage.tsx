import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaHeadset, FaBriefcase, FaFileContract, FaUserTie, FaUsers } from 'react-icons/fa';
import { SERVICES, IT_SKILLS, NON_IT_SKILLS } from '../utils/constants';
import './ServicesPage.css';

const ServicesPage: React.FC = () => {
  const serviceDetails = [
    {
      id: 'consumer-sector',
      icon: FaBriefcase,
      title: SERVICES.CONSUMER.title,
      items: SERVICES.CONSUMER.items
    },
    {
      id: 'industrial-sector',
      icon: FaUsers,
      title: SERVICES.INDUSTRIAL.title,
      items: SERVICES.INDUSTRIAL.items
    },
    {
      id: 'retail-ecommerce',
      icon: FaLaptopCode,
      title: SERVICES.RETAIL.title,
      items: SERVICES.RETAIL.items
    },
    {
      id: 'emerging-sector',
      icon: FaHeadset,
      title: SERVICES.EMERGING.title,
      items: SERVICES.EMERGING.items
    },
    {
      id: 'it-sector',
      icon: FaLaptopCode,
      title: SERVICES.IT_SECTOR.title,
      items: SERVICES.IT_SECTOR.items
    },
    {
      id: 'telecom-sector',
      icon: FaUserTie,
      title: SERVICES.TELECOM.title,
      items: SERVICES.TELECOM.items
    }
  ];

  return (
    <div className="services-page">
      {/* Services Hero Banner */}
      <div className="services-hero">
        <div className="services-hero-overlay"></div>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="services-hero-content"
          >
            <h1>Our Services</h1>
            <p className="services-intro">
              Pro Recruit Technologies offers comprehensive recruitment solutions tailored to meet your specific needs. 
              Whether you're looking for IT specialists, BPO professionals, or executive talent, we have the expertise 
              and network to deliver results.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container">

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
                </div>
              </div>
              
              <div className="service-content">
                <div className="service-items-list">
                  <ul>
                    {service.items.map((item, idx) => (
                      <li key={idx}>
                        <span className="checkmark">✓</span>
                        {item}
                      </li>
                    ))}
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

import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaEye, FaHandshake, FaStar } from 'react-icons/fa';
import { COMPANY_INFO } from '../utils/constants';
import './AboutPage.css';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>About {COMPANY_INFO.name}</h1>
          
          <section className="about-intro">
            <p className="lead">
              Established in {COMPANY_INFO.established}, {COMPANY_INFO.name} is a {COMPANY_INFO.location}-based 
              recruitment firm dedicated to "{COMPANY_INFO.tagline}". With a team of {COMPANY_INFO.employeeCount} 
              passionate professionals, we specialize in connecting talented individuals with leading organizations 
              across India.
            </p>
          </section>

          <section className="values-section">
            <h2>Our Core Values</h2>
            <div className="values-grid">
              <motion.div
                className="value-card glass"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <FaRocket className="value-icon" />
                <h3>Mission</h3>
                <p>To bridge the gap between talented professionals and organizations, creating mutually beneficial partnerships that drive growth and success.</p>
              </motion.div>

              <motion.div
                className="value-card glass"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <FaEye className="value-icon" />
                <h3>Vision</h3>
                <p>To be India's most trusted recruitment partner, known for our integrity, innovation, and commitment to excellence in talent acquisition.</p>
              </motion.div>

              <motion.div
                className="value-card glass"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <FaHandshake className="value-icon" />
                <h3>Values</h3>
                <p>Integrity, transparency, and professionalism guide everything we do. We believe in building lasting relationships based on trust and mutual respect.</p>
              </motion.div>

              <motion.div
                className="value-card glass"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <FaStar className="value-icon" />
                <h3>Excellence</h3>
                <p>We strive for excellence in every placement, ensuring the right fit for both candidates and organizations through our meticulous screening process.</p>
              </motion.div>
            </div>
          </section>

          <section className="story-section">
            <h2>Our Story</h2>
            <p>
              Pro Recruit Technologies was born from a simple yet powerful idea: recruitment should be more than just 
              filling positions. It should be about making dreams and aspirations come true. Founded in January 2024 
              in Bangalore, we set out to transform the recruitment landscape by focusing on quality over quantity.
            </p>
            <p>
              Our journey began with a small team of dedicated professionals who shared a common vision - to create 
              meaningful connections between job seekers and employers. Today, we've grown to a team of {COMPANY_INFO.employeeCount} 
              experts, each bringing unique insights and expertise to serve our clients better.
            </p>
          </section>

          <section className="team-section">
            <h2>Our Team</h2>
            <p>
              Our diverse team of recruitment specialists, industry experts, and support staff work tirelessly to 
              ensure every placement is a success story. With expertise spanning IT, Non-IT, and specialized sectors, 
              we understand the unique challenges and opportunities in each domain.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;

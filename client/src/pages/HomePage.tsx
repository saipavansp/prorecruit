import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBriefcase, FaUsers, FaHandshake, FaChartLine, FaLaptopCode, FaHeadset } from 'react-icons/fa';
import AnimatedCounter from '../components/Common/AnimatedCounter';
import ServiceCard from '../components/Common/ServiceCard';
import TestimonialSlider from '../components/Common/TestimonialSlider';
import { COMPANY_INFO, COMPANY_STATS, CLIENTS, SERVICES } from '../utils/constants';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-pattern"></div>
          <img src="/images/hero/circle-1.svg" alt="decorative" className="hero-circle hero-circle-1" />
          <img src="/images/hero/circle-2.svg" alt="decorative" className="hero-circle hero-circle-2" />
        </div>
        <div className="container">
          <div className="hero-grid">
            <motion.div
              className="hero-content-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="hero-subtitle">LETS START YOUR CAREERS HERE!</p>
              <h1 className="hero-title">
                Looking for a career change? Browse our job listings now!
              </h1>
              <p className="hero-description">
                {COMPANY_INFO.tagline} - Your trusted partner in recruitment, connecting talented 
                professionals with leading organizations across India.
              </p>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-avatars">
                    <span className="avatar">👤</span>
                    <span className="avatar">👤</span>
                    <span className="avatar">👤</span>
                    <span className="avatar">👤</span>
                    <span className="avatar">👤</span>
                  </div>
                  <span className="stat-text">540 K+ Member Active</span>
                </div>
              </div>

              <div className="hero-buttons">
                <Link to="/candidates/register" className="btn btn-primary btn-lg">
                  REGISTER NOW
                </Link>
                <Link to="/jobs" className="btn btn-outline btn-lg">
                  BROWSE JOBS
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="hero-content-right"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="hero-image-container">
                <div className="hero-shape-bg"></div>
                <img 
                  src="/images/hero/professional-person.png" 
                  alt="Professional" 
                  className="hero-person-image"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section services-overview">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2>Our Services</h2>
            <p>Comprehensive recruitment solutions tailored to your needs</p>
          </motion.div>
          
          <div className="services-grid">
            <ServiceCard
              icon={FaLaptopCode}
              title={SERVICES.IT.title}
              description={SERVICES.IT.description}
              link="/services#it-recruitment"
              delay={0.1}
            />
            <ServiceCard
              icon={FaHeadset}
              title={SERVICES.NON_IT.title}
              description={SERVICES.NON_IT.description}
              link="/services#non-it-recruitment"
              delay={0.2}
            />
            <ServiceCard
              icon={FaBriefcase}
              title={SERVICES.PERMANENT.title}
              description={SERVICES.PERMANENT.description}
              link="/services#permanent-staffing"
              delay={0.3}
            />
            <ServiceCard
              icon={FaHandshake}
              title={SERVICES.CONTRACT.title}
              description={SERVICES.CONTRACT.description}
              link="/services#contract-staffing"
              delay={0.4}
            />
            <ServiceCard
              icon={FaChartLine}
              title={SERVICES.EXECUTIVE.title}
              description={SERVICES.EXECUTIVE.description}
              link="/services#executive-search"
              delay={0.5}
            />
            <ServiceCard
              icon={FaUsers}
              title={SERVICES.VOLUME.title}
              description={SERVICES.VOLUME.description}
              link="/services#volume-hiring"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="section statistics-section bg-light">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2>Our Impact</h2>
            <p>Building careers and empowering organizations</p>
          </motion.div>
          
          <div className="statistics-grid">
            {COMPANY_STATS.map((stat, index) => (
              <AnimatedCounter
                key={stat.label}
                end={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="section clients-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2>Our Trusted Clients</h2>
            <p>Partnering with industry leaders</p>
          </motion.div>
          
          <div className="clients-grid">
            {CLIENTS.map((client, index) => (
              <motion.div
                key={client.name}
                className="client-logo"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src={client.logo} 
                  alt={client.name}
                  className="client-logo-img"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials-section bg-light">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2>Success Stories</h2>
            <p>Hear from candidates who found their dream jobs through us</p>
          </motion.div>
          
          <TestimonialSlider />
        </div>
      </section>

      {/* Join Community Section */}
      <section className="section join-community-section">
        <div className="join-community-overlay"></div>
        <div className="container">
          <motion.div
            className="join-community-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Join our community of talented professionals by applying for a job today!</h2>
            <p>Your trusted partner in recruitment, connecting talented professionals with leading organizations across India.</p>
            <div className="join-community-button">
              <Link to="/jobs" className="btn btn-discover">
                DISCOVER MORE
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Stats Section Below */}
        <div className="community-stats">
          <div className="container">
            <div className="stats-grid">
              <motion.div 
                className="stat-box"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="stat-number green">540K+</h3>
                <p className="stat-label">Member Active</p>
              </motion.div>

              <motion.div 
                className="stat-box"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="stat-number green">14K+</h3>
                <p className="stat-label">Companies</p>
              </motion.div>

              <motion.div 
                className="stat-box"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="stat-number green">270+</h3>
                <p className="stat-label">Expert Trainers</p>
              </motion.div>

              <motion.div 
                className="stat-box"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="stat-number green">15+</h3>
                <p className="stat-label">Years of Experience</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section why-choose-section bg-light">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2>Why Choose Pro Recruit Technologies?</h2>
            <p>Your success is our mission</p>
          </motion.div>
          
          <div className="features-grid">
            <motion.div
              className="feature-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3>Expert Team</h3>
              <p>Our experienced recruiters understand industry needs and match the right talent with the right opportunity.</p>
            </motion.div>
            
            <motion.div
              className="feature-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3>Wide Network</h3>
              <p>Strong connections with leading companies across various industries in India.</p>
            </motion.div>
            
            <motion.div
              className="feature-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3>Quick Turnaround</h3>
              <p>Efficient processes ensure faster placement and reduced time-to-hire.</p>
            </motion.div>
            
            <motion.div
              className="feature-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3>Personalized Service</h3>
              <p>We understand each candidate and company is unique, providing tailored solutions.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

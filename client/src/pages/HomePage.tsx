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
          <div className="hero-overlay"></div>
          <img src="/images/hero/hero-bg.jpg" alt="Pro Recruit Technologies" className="hero-bg-image" />
          <img src="/images/hero/circle-1.svg" alt="decorative" className="hero-circle hero-circle-1" />
          <img src="/images/hero/circle-2.svg" alt="decorative" className="hero-circle hero-circle-2" />
        </div>
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">
              Welcome to <span className="text-primary">{COMPANY_INFO.name}</span>
            </h1>
            <p className="hero-tagline">{COMPANY_INFO.tagline}</p>
            <p className="hero-description">
              Your trusted partner in recruitment, connecting talented professionals with leading organizations across India.
            </p>
            <div className="hero-contact">
              <a href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`} className="hero-phone">
                {COMPANY_INFO.phone}
              </a>
            </div>
            <div className="hero-buttons">
              <Link to="/candidates/register" className="btn btn-primary">
                Register Now
              </Link>
              <Link to="/jobs" className="btn btn-outline">
                View Jobs
              </Link>
            </div>
          </motion.div>
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
                <div className="client-logo-placeholder">
                  <h3>{client.name}</h3>
                </div>
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

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Ready to Take the Next Step in Your Career?</h2>
            <p>Join thousands of professionals who have found their dream jobs through us</p>
            <div className="cta-buttons">
              <Link to="/candidates/register" className="btn btn-primary">
                Register as Candidate
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Contact Us
              </Link>
            </div>
          </motion.div>
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

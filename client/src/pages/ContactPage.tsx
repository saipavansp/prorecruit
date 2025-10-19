import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock } from 'react-icons/fa';
import { contactAPI } from '../services/api';
import { Inquiry } from '../types';
import { COMPANY_INFO, INQUIRY_TYPES } from '../utils/constants';
import './ContactPage.css';

const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inquiry>();

  const onSubmit = async (data: Inquiry) => {
    setIsSubmitting(true);
    try {
      const response = await contactAPI.submitInquiry(data);
      if (response.success) {
        toast.success('Thank you for your inquiry. We will contact you soon!');
        reset();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Contact Us</h1>
          <p className="contact-intro">
            Get in touch with us for any queries about our recruitment services
          </p>
        </motion.div>

        <div className="contact-content">
          {/* Contact Form */}
          <motion.div
            className="contact-form-section"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Name *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'error' : ''}`}
                    {...register('name', { 
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' }
                    })}
                  />
                  {errors.name && <span className="form-error">{errors.name.message}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'error' : ''}`}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && <span className="form-error">{errors.email.message}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className={`form-control ${errors.phone ? 'error' : ''}`}
                    {...register('phone', {
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: 'Invalid Indian phone number'
                      }
                    })}
                  />
                  {errors.phone && <span className="form-error">{errors.phone.message}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Inquiry Type</label>
                  <select
                    className="form-control"
                    {...register('inquiryType')}
                    defaultValue="General"
                  >
                    {INQUIRY_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Subject *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.subject ? 'error' : ''}`}
                    {...register('subject', {
                      required: 'Subject is required',
                      minLength: { value: 5, message: 'Subject must be at least 5 characters' }
                    })}
                  />
                  {errors.subject && <span className="form-error">{errors.subject.message}</span>}
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Message *</label>
                  <textarea
                    className={`form-control ${errors.message ? 'error' : ''}`}
                    rows={6}
                    {...register('message', {
                      required: 'Message is required',
                      minLength: { value: 10, message: 'Message must be at least 10 characters' }
                    })}
                  />
                  {errors.message && <span className="form-error">{errors.message.message}</span>}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="contact-info-section"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2>Get in Touch</h2>
            
            <div className="contact-info-card">
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <h3>Office Address</h3>
                  <p>{COMPANY_INFO.address}</p>
                </div>
              </div>

              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <div>
                  <h3>Email</h3>
                  <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
                </div>
              </div>

              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <div>
                  <h3>Phone</h3>
                  <a href={`tel:${COMPANY_INFO.phone}`}>{COMPANY_INFO.phone}</a>
                </div>
              </div>

              <div className="contact-item">
                <FaClock className="contact-icon" />
                <div>
                  <h3>Business Hours</h3>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 1:00 PM</p>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="map-section">
              <h3>Find Us</h3>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124419.28264585914!2d77.5385!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

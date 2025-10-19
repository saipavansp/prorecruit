import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';
import './ServiceCard.css';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: IconType;
  link?: string;
  delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon: Icon,
  link,
  delay = 0
}) => {
  const cardContent = (
    <motion.div
      className="service-card glass"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <div className="service-icon">
        {React.createElement(Icon)}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {link && (
        <span className="service-link">
          Learn More →
        </span>
      )}
    </motion.div>
  );

  if (link) {
    return <Link to={link} className="service-card-link">{cardContent}</Link>;
  }

  return cardContent;
};

export default ServiceCard;

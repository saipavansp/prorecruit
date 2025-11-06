import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './TestimonialSlider.css';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  image?: string;
  rating: number;
  text: string;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    position: "Software Engineer",
    company: "Sagility",
    rating: 5,
    text: "Pro Recruit Technologies helped me land my dream job! Their team was professional, supportive, and guided me through every step of the process. Highly recommended!",
    location: "Bangalore"
  },
  {
    id: 2,
    name: "Priya Sharma",
    position: "Team Lead",
    company: "Startek",
    rating: 5,
    text: "The best recruitment experience I've ever had. They understood my requirements perfectly and matched me with an excellent opportunity within 2 weeks!",
    location: "Hyderabad"
  },
  {
    id: 3,
    name: "Amit Patel",
    position: "Senior Developer",
    company: "iSON",
    rating: 5,
    text: "Professional, efficient, and genuinely caring. Pro Recruit Technologies transformed my career. Their personalized approach made all the difference.",
    location: "Pune"
  },
  {
    id: 4,
    name: "Sneha Reddy",
    position: "Business Analyst",
    company: "Altruist",
    rating: 5,
    text: "I was impressed by their thorough understanding of both technical and soft skills. They found me a role that perfectly matched my career goals.",
    location: "Chennai"
  }
];

const TestimonialSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  // Show 3 testimonials at a time on desktop, 1 on mobile
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  return (
    <div className="testimonial-slider">
      <div className="testimonials-container">
        <button 
          className="slider-nav slider-nav-left" 
          onClick={goToPrevious}
          aria-label="Previous testimonial"
        >
          <FaChevronLeft />
        </button>

        <div className="testimonials-track">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="testimonials-wrapper"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              {getVisibleTestimonials().map((testimonial, idx) => (
                <div key={testimonial.id} className={`testimonial-card slide-${idx}`}>
                  <div className="quote-icon">
                    <FaQuoteLeft />
                  </div>
                  
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="star-icon" />
                    ))}
                  </div>

                  <p className="testimonial-text">"{testimonial.text}"</p>

                  <div className="testimonial-author">
                    <div className="author-avatar">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="author-info">
                      <h4>{testimonial.name}</h4>
                      <p className="author-position">{testimonial.position}</p>
                      <p className="author-company">{testimonial.company} • {testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <button 
          className="slider-nav slider-nav-right" 
          onClick={goToNext}
          aria-label="Next testimonial"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="slider-dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;

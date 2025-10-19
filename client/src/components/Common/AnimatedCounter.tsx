import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import './AnimatedCounter.css';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  label,
  delay = 0
}) => {
  const [shouldStart, setShouldStart] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => setShouldStart(true), delay * 1000);
    }
  }, [isInView, delay]);

  return (
    <motion.div
      ref={ref}
      className="animated-counter"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="counter-value">
        {prefix}
        <CountUp
          start={0}
          end={shouldStart ? end : 0}
          duration={duration}
          separator=","
          useEasing={true}
        />
        {suffix}
      </div>
      <div className="counter-label">{label}</div>
    </motion.div>
  );
};

export default AnimatedCounter;

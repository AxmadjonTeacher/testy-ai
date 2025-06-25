
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedConnectionLine: React.FC = () => {
  return (
    <motion.div 
      className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent transform -translate-y-1/2"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
      viewport={{ once: true }}
    />
  );
};

export default AnimatedConnectionLine;

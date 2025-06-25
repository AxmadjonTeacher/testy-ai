
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ConnectionLineProps {
  index: number;
  totalSteps: number;
}

const ConnectionLine: React.FC<ConnectionLineProps> = ({ index, totalSteps }) => {
  if (index >= totalSteps - 1) return null;

  return (
    <motion.div 
      className="hidden lg:flex absolute top-1/2 -right-2 transform -translate-y-1/2 z-20"
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.2 + 0.5 }}
      viewport={{ once: true }}
    >
      <motion.div 
        className="bg-white rounded-full p-2 shadow-md border border-gray-200"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.5
        }}
      >
        <ArrowRight size={16} className="text-primary" />
      </motion.div>
    </motion.div>
  );
};

export default ConnectionLine;


import React from 'react';
import { motion } from 'framer-motion';
import { Step } from './types';
import ConnectionLine from './ConnectionLine';

interface StepCardProps {
  step: Step;
  index: number;
  totalSteps: number;
}

const StepCard: React.FC<StepCardProps> = ({ step, index, totalSteps }) => {
  return (
    <motion.div
      className="relative h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -10, 
        transition: { duration: 0.3 },
        scale: 1.02
      }}
    >
      <motion.div 
        className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative z-10 h-full flex flex-col"
        whileHover={{
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
      >
        {/* Enhanced step number with glow effect */}
        <motion.div 
          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg mb-6 shadow-lg relative`}
          whileHover={{ 
            scale: 1.1,
            rotate: 5,
          }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent"
            animate={{
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5
            }}
          />
          {step.number}
        </motion.div>
        
        {/* Animated icon */}
        <motion.div 
          className="text-primary mb-4"
          whileHover={{ scale: 1.2, rotate: 10 }}
          transition={{ duration: 0.2 }}
        >
          {step.icon}
        </motion.div>
        
        <motion.h3 
          className="text-xl font-bold text-neutral-dark mb-4"
          whileHover={{ color: "#009688" }}
          transition={{ duration: 0.2 }}
        >
          {step.title}
        </motion.h3>
        
        <div className="flex-grow">
          <p className="text-neutral-dark/70 leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Subtle glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      
      <ConnectionLine index={index} totalSteps={totalSteps} />
    </motion.div>
  );
};

export default StepCard;

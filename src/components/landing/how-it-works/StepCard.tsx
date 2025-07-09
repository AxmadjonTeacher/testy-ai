
import React from 'react';
import { motion } from 'framer-motion';
import { Step } from './types';
import { GlowingEffect } from '@/components/ui/glowing-effect';
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
    >
      <div className="relative h-full rounded-2xl border border-white/30 p-2">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={2}
        />
        
        <div className="relative flex h-full flex-col bg-white/60 backdrop-blur-md rounded-xl p-8 shadow-xl border border-white/30 overflow-hidden">
          {/* Enhanced step number */}
          <div 
            className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg mb-6 shadow-lg relative z-20`}
          >
            {step.number}
          </div>
          
          {/* Icon */}
          <div className="text-primary mb-4 relative z-20">
            {step.icon}
          </div>
          
          <h3 className="text-xl font-bold text-neutral-dark mb-4 relative z-20">
            {step.title}
          </h3>
          
          <div className="flex-grow relative z-20">
            <p className="text-neutral-dark/70 leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      </div>
      
      <ConnectionLine index={index} totalSteps={totalSteps} />
    </motion.div>
  );
};

export default StepCard;


import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Step } from './types';
import ConnectionLine from './ConnectionLine';

interface StepCardProps {
  step: Step;
  index: number;
  totalSteps: number;
}

const StepCard: React.FC<StepCardProps> = ({ step, index, totalSteps }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      className="relative h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      <div 
        ref={cardRef}
        className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 relative z-10 h-full flex flex-col overflow-hidden transition-all duration-300 ease-out"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: isHovered 
            ? `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.05) 100%)`
            : 'rgba(255, 255, 255, 0.4)',
        }}
      >
        {/* Mouse tracking glow effect */}
        {isHovered && (
          <div
            className="absolute pointer-events-none transition-all duration-200 ease-out"
            style={{
              width: '300px',
              height: '300px',
              background: `radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 30%, rgba(255, 255, 255, 0.1) 60%, transparent 100%)`,
              left: mousePosition.x - 150,
              top: mousePosition.y - 150,
              filter: 'blur(30px)',
              opacity: 0.8,
            }}
          />
        )}

        {/* Step number */}
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
      
      <ConnectionLine index={index} totalSteps={totalSteps} />
    </motion.div>
  );
};

export default StepCard;

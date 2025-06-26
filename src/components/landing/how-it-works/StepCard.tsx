
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
        className="bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/30 relative z-10 h-full flex flex-col overflow-hidden transition-all duration-500 ease-out"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: isHovered 
            ? `radial-gradient(circle 250px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.08) 0%, rgba(79, 70, 229, 0.05) 35%, rgba(255, 255, 255, 0.6) 70%, rgba(255, 255, 255, 0.55) 100%)`
            : 'rgba(255, 255, 255, 0.6)',
          boxShadow: isHovered 
            ? `0 25px 50px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(139, 92, 246, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.1)`
            : '0 8px 32px rgba(0, 0, 0, 0.1)',
          transform: isHovered ? 'translateY(-2px)' : 'translateY(0px)',
        }}
      >
        {/* Smooth professional glow effect */}
        {isHovered && (
          <>
            {/* Main glow */}
            <div
              className="absolute pointer-events-none transition-all duration-700 ease-out"
              style={{
                width: '300px',
                height: '300px',
                background: `radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, rgba(79, 70, 229, 0.08) 25%, rgba(59, 130, 246, 0.04) 50%, transparent 75%)`,
                left: mousePosition.x - 150,
                top: mousePosition.y - 150,
                filter: 'blur(25px)',
                opacity: 0.9,
              }}
            />
            {/* Inner highlight */}
            <div
              className="absolute pointer-events-none transition-all duration-500 ease-out"
              style={{
                width: '120px',
                height: '120px',
                background: `radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(139, 92, 246, 0.15) 40%, transparent 70%)`,
                left: mousePosition.x - 60,
                top: mousePosition.y - 60,
                filter: 'blur(8px)',
                opacity: 0.6,
              }}
            />
          </>
        )}

        {/* Enhanced step number */}
        <div 
          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg mb-6 shadow-lg relative z-20 transition-all duration-300`}
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        >
          {step.number}
        </div>
        
        {/* Icon */}
        <div className="text-primary mb-4 relative z-20 transition-all duration-300" 
             style={{ transform: isHovered ? 'scale(1.02)' : 'scale(1)' }}>
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

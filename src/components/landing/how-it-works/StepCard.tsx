
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
        className="bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/30 relative z-10 h-full flex flex-col overflow-hidden transition-all duration-300"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: isHovered 
            ? `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.1) 0%, rgba(255, 255, 255, 0.6) 40%, rgba(255, 255, 255, 0.5) 100%)`
            : 'rgba(255, 255, 255, 0.6)',
          boxShadow: isHovered 
            ? `0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(99, 102, 241, 0.1), inset 0 0 100px rgba(99, 102, 241, 0.05)`
            : '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Professional mouse tracking glow effect */}
        {isHovered && (
          <div
            className="absolute pointer-events-none transition-all duration-500"
            style={{
              width: '400px',
              height: '400px',
              background: `radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0.08) 30%, rgba(99, 102, 241, 0.02) 60%, transparent 80%)`,
              left: mousePosition.x - 200,
              top: mousePosition.y - 200,
              transform: 'translate3d(0, 0, 0)',
              filter: 'blur(20px)',
              opacity: 0.8,
            }}
          />
        )}

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
      
      <ConnectionLine index={index} totalSteps={totalSteps} />
    </motion.div>
  );
};

export default StepCard;

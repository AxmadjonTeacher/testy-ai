
import React, { useRef, useState, useCallback, useEffect } from 'react';
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
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const animationFrameRef = useRef<number>();

  // Smooth animation using requestAnimationFrame
  const animateMousePosition = useCallback(() => {
    setMousePosition(prev => {
      const dx = targetPosition.x - prev.x;
      const dy = targetPosition.y - prev.y;
      
      // Smooth interpolation with easing
      const ease = 0.15;
      const newX = prev.x + dx * ease;
      const newY = prev.y + dy * ease;
      
      // Continue animation if not close enough to target
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        animationFrameRef.current = requestAnimationFrame(animateMousePosition);
      }
      
      return { x: newX, y: newY };
    });
  }, [targetPosition]);

  useEffect(() => {
    if (isHovered) {
      animationFrameRef.current = requestAnimationFrame(animateMousePosition);
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovered, animateMousePosition]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setTargetPosition({ x, y });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

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
        className="relative h-full flex flex-col overflow-hidden rounded-2xl border border-white/20 shadow-xl backdrop-blur-sm transition-all duration-500 ease-out"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          background: isHovered 
            ? `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.12) 0%, rgba(255, 255, 255, 0.85) 35%, rgba(255, 255, 255, 0.75) 100%)`
            : 'rgba(255, 255, 255, 0.75)',
          boxShadow: isHovered 
            ? `0 20px 40px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(99, 102, 241, 0.08)`
            : '0 8px 24px rgba(0, 0, 0, 0.04)'
        }}
      >
        {/* Smooth glow effect overlay */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none opacity-60 transition-opacity duration-700 ease-out"
            style={{
              background: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.08) 0%, rgba(99, 102, 241, 0.04) 40%, transparent 70%)`,
              filter: 'blur(1px)',
            }}
          />
        )}

        {/* Enhanced step number with better contrast */}
        <div className="relative z-20 p-8">
          <div 
            className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg mb-6 shadow-lg transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}
          >
            {step.number}
          </div>
          
          {/* Icon with hover effect */}
          <div className={`text-primary mb-4 transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}>
            {step.icon}
          </div>
          
          <h3 className="text-xl font-bold text-neutral-dark mb-4 transition-colors duration-300">
            {step.title}
          </h3>
          
          <div className="flex-grow">
            <p className="text-neutral-dark/70 leading-relaxed transition-colors duration-300">
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

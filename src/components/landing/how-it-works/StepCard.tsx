
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

  // Enhanced smooth animation with better easing
  const animateMousePosition = useCallback(() => {
    setMousePosition(prev => {
      const dx = targetPosition.x - prev.x;
      const dy = targetPosition.y - prev.y;
      
      // Smoother interpolation with cubic easing
      const ease = 0.08;
      const newX = prev.x + dx * ease;
      const newY = prev.y + dy * ease;
      
      // Continue animation if not close enough to target
      if (Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3) {
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
        className="relative h-full flex flex-col overflow-hidden rounded-2xl border border-white/30 backdrop-blur-md transition-all duration-500 ease-out"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          background: isHovered 
            ? 'rgba(255, 255, 255, 0.95)'
            : 'rgba(255, 255, 255, 0.85)',
          boxShadow: isHovered 
            ? `0 25px 50px rgba(0, 0, 0, 0.15), 
               0 0 0 1px rgba(255, 255, 255, 0.4),
               inset 0 1px 0 rgba(255, 255, 255, 0.6)`
            : `0 8px 32px rgba(0, 0, 0, 0.08),
               0 0 0 1px rgba(255, 255, 255, 0.2)`
        }}
      >
        {/* Primary focused glow effect with bright core */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 ease-out"
            style={{
              background: `radial-gradient(circle 120px at ${mousePosition.x}px ${mousePosition.y}px, 
                rgba(59, 130, 246, 0.4) 0%, 
                rgba(99, 102, 241, 0.25) 25%, 
                rgba(139, 92, 246, 0.15) 50%, 
                transparent 70%)`,
              opacity: 1,
            }}
          />
        )}

        {/* Secondary ambient glow for depth */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out"
            style={{
              background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, 
                rgba(59, 130, 246, 0.08) 0%, 
                rgba(99, 102, 241, 0.04) 40%, 
                transparent 70%)`,
              opacity: 0.8,
            }}
          />
        )}

        {/* Bright spotlight effect at mouse position */}
        {isHovered && (
          <div
            className="absolute pointer-events-none transition-opacity duration-200 ease-out"
            style={{
              left: mousePosition.x - 30,
              top: mousePosition.y - 30,
              width: 60,
              height: 60,
              background: `radial-gradient(circle, 
                rgba(255, 255, 255, 0.8) 0%, 
                rgba(59, 130, 246, 0.6) 30%, 
                rgba(99, 102, 241, 0.3) 60%, 
                transparent 100%)`,
              borderRadius: '50%',
              filter: 'blur(8px)',
              opacity: 0.7,
            }}
          />
        )}

        {/* Glassmorphism overlay for enhanced depth */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 ease-out"
            style={{
              background: `linear-gradient(135deg, 
                rgba(255, 255, 255, 0.1) 0%, 
                rgba(255, 255, 255, 0.05) 50%, 
                rgba(255, 255, 255, 0.1) 100%)`,
              opacity: 0.6,
            }}
          />
        )}

        {/* Content with enhanced contrast and depth */}
        <div className="relative z-20 p-8">
          <div 
            className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg mb-6 shadow-lg transition-all duration-300 ${
              isHovered ? 'scale-110 shadow-2xl shadow-primary/25' : ''
            }`}
            style={{
              boxShadow: isHovered 
                ? `0 10px 25px rgba(0, 0, 0, 0.15), 0 0 20px rgba(59, 130, 246, 0.3)`
                : '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}
          >
            {step.number}
          </div>
          
          {/* Icon with enhanced hover effect */}
          <div className={`text-primary mb-4 transition-all duration-300 ${
            isHovered ? 'scale-105 text-blue-600' : ''
          }`}>
            {step.icon}
          </div>
          
          <h3 className={`text-xl font-bold mb-4 transition-all duration-300 ${
            isHovered ? 'text-gray-900' : 'text-neutral-dark'
          }`}>
            {step.title}
          </h3>
          
          <div className="flex-grow">
            <p className={`leading-relaxed transition-all duration-300 ${
              isHovered ? 'text-gray-700' : 'text-neutral-dark/70'
            }`}>
              {step.description}
            </p>
          </div>
        </div>

        {/* Inner border highlight on hover */}
        {isHovered && (
          <div 
            className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
            style={{
              border: '1px solid rgba(59, 130, 246, 0.2)',
              opacity: 0.8,
            }}
          />
        )}
      </div>
      
      <ConnectionLine index={index} totalSteps={totalSteps} />
    </motion.div>
  );
};

export default StepCard;

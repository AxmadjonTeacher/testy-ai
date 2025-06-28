
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
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const animationFrameRef = useRef<number>();
  const transitionTimeoutRef = useRef<NodeJS.Timeout>();

  // Smooth mouse tracking with enhanced easing
  const updateMousePosition = useCallback((clientX: number, clientY: number) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    // Smooth interpolation with inertia
    const smoothUpdate = () => {
      setMousePosition(prev => {
        const dx = x - prev.x;
        const dy = y - prev.y;
        
        // Enhanced easing with momentum
        const ease = isTransitioning ? 0.15 : 0.12;
        const newX = prev.x + dx * ease;
        const newY = prev.y + dy * ease;
        
        // Continue animation if not close enough to target
        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
          animationFrameRef.current = requestAnimationFrame(smoothUpdate);
        }
        
        return { x: newX, y: newY };
      });
    };
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(smoothUpdate);
  }, [isTransitioning]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    updateMousePosition(e.clientX, e.clientY);
  }, [updateMousePosition]);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    setIsTransitioning(true);
    
    // Smooth entry animation
    updateMousePosition(e.clientX, e.clientY);
    
    // Remove transition flag after smooth entry
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  }, [updateMousePosition]);

  const handleMouseLeave = useCallback(() => {
    setIsTransitioning(true);
    
    // Smooth exit with fade
    setTimeout(() => {
      setIsHovered(false);
      setIsTransitioning(false);
    }, 200);
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
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
        className="relative h-full flex flex-col overflow-hidden rounded-2xl border border-white/20 backdrop-blur-md transition-all duration-300 ease-out"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          background: isHovered 
            ? 'rgba(255, 255, 255, 0.98)'
            : 'rgba(255, 255, 255, 0.90)',
          boxShadow: isHovered 
            ? `0 20px 40px rgba(0, 0, 0, 0.12), 
               0 0 0 1px rgba(255, 255, 255, 0.5),
               inset 0 1px 0 rgba(255, 255, 255, 0.8)`
            : `0 8px 25px rgba(0, 0, 0, 0.08),
               0 0 0 1px rgba(255, 255, 255, 0.3)`
        }}
      >
        {/* Primary focused glow - smaller and more intense */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle 80px at ${mousePosition.x}px ${mousePosition.y}px, 
                rgba(59, 130, 246, 0.6) 0%, 
                rgba(99, 102, 241, 0.4) 20%, 
                rgba(139, 92, 246, 0.25) 35%, 
                rgba(99, 102, 241, 0.1) 50%,
                transparent 70%)`,
              opacity: isTransitioning ? 0.7 : 1,
              transition: isTransitioning ? 'opacity 0.3s ease-out' : 'none',
            }}
          />
        )}

        {/* Bright core spotlight - follows cursor precisely */}
        {isHovered && (
          <div
            className="absolute pointer-events-none"
            style={{
              left: mousePosition.x - 25,
              top: mousePosition.y - 25,
              width: 50,
              height: 50,
              background: `radial-gradient(circle, 
                rgba(255, 255, 255, 0.9) 0%, 
                rgba(59, 130, 246, 0.8) 20%, 
                rgba(99, 102, 241, 0.6) 40%, 
                rgba(139, 92, 246, 0.3) 60%,
                transparent 80%)`,
              borderRadius: '50%',
              filter: 'blur(4px)',
              opacity: isTransitioning ? 0.6 : 0.9,
              transition: isTransitioning ? 'opacity 0.2s ease-out' : 'none',
            }}
          />
        )}

        {/* Sharp inner light - precise cursor tracking */}
        {isHovered && (
          <div
            className="absolute pointer-events-none"
            style={{
              left: mousePosition.x - 8,
              top: mousePosition.y - 8,
              width: 16,
              height: 16,
              background: `radial-gradient(circle, 
                rgba(255, 255, 255, 1) 0%, 
                rgba(59, 130, 246, 0.9) 30%, 
                rgba(99, 102, 241, 0.7) 60%, 
                transparent 100%)`,
              borderRadius: '50%',
              filter: 'blur(1px)',
              opacity: isTransitioning ? 0.5 : 0.8,
              transition: isTransitioning ? 'opacity 0.15s ease-out' : 'none',
            }}
          />
        )}

        {/* Enhanced glassmorphism overlay */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, 
                rgba(255, 255, 255, 0.15) 0%, 
                rgba(255, 255, 255, 0.05) 50%, 
                rgba(255, 255, 255, 0.15) 100%)`,
              opacity: isTransitioning ? 0.4 : 0.7,
              transition: isTransitioning ? 'opacity 0.25s ease-out' : 'none',
            }}
          />
        )}

        {/* Content with enhanced contrast */}
        <div className="relative z-20 p-8">
          <div 
            className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg mb-6 shadow-lg transition-all duration-300 ${
              isHovered ? 'scale-110 shadow-2xl' : ''
            }`}
            style={{
              boxShadow: isHovered 
                ? `0 10px 25px rgba(0, 0, 0, 0.15), 0 0 20px rgba(59, 130, 246, 0.4)`
                : '0 4px 15px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease-out'
            }}
          >
            {step.number}
          </div>
          
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

        {/* Dynamic border highlight */}
        {isHovered && (
          <div 
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              border: '1px solid rgba(59, 130, 246, 0.3)',
              opacity: isTransitioning ? 0.5 : 0.8,
              transition: isTransitioning ? 'opacity 0.3s ease-out' : 'none',
            }}
          />
        )}
      </div>
      
      <ConnectionLine index={index} totalSteps={totalSteps} />
    </motion.div>
  );
};

export default StepCard;

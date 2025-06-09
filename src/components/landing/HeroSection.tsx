
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.section 
      className="py-16 px-4" 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
    >
      <div className="container mx-auto max-w-4xl text-center">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-neutral-dark mb-6" 
          variants={itemVariants}
        >
          Test Generator for English Language Teaching
        </motion.h1>
        <motion.p 
          className="text-lg text-neutral-dark/80 mb-8 max-w-2xl mx-auto" 
          variants={itemVariants}
        >
          Information about the website and how it helps generate unique tests for all English proficiency levels
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4" 
          variants={itemVariants}
        >
          <Button 
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg rounded-md hover:scale-105 transition-transform" 
            onClick={() => navigate('/generate')}
          >
            Get Started
          </Button>
          <Button 
            className="bg-accent hover:bg-accent/90 text-white px-8 py-3 text-lg rounded-md hover:scale-105 transition-transform" 
            onClick={() => navigate('/admin/upload')}
          >
            Admin Upload
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;

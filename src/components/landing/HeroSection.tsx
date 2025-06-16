
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
      y: 30,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section 
      className="relative py-20 lg:py-32 overflow-hidden"
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-8 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl text-center relative z-10 px-4">
        <motion.div 
          className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white mb-6 border border-white/20"
          variants={itemVariants}
        >
          ✨ AI-Powered Test Generation
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
          variants={itemVariants}
          style={{ letterSpacing: '0.01em', lineHeight: '1.1' }}
        >
          Create Unique Tests and
          <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Craft Smart Classes
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Transform your teaching with AI-powered test generation. Upload sample tests, organize by level, and automatically create unique assessments that engage your students and save you time.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
          variants={itemVariants}
        >
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            onClick={() => navigate('/generate')}
          >
            Start Creating Tests
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-xl transition-all duration-300"
            onClick={() => navigate('/admin/upload')}
          >
            Admin Upload
          </Button>
        </motion.div>

        {/* Stats or trust indicators */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">1000+</div>
            <div className="text-white/70">Tests Generated</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-white/70">Happy Teachers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">5★</div>
            <div className="text-white/70">User Rating</div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;

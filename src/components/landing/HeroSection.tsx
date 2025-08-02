
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SplineScene } from '@/components/ui/splite';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const leftItemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const rightItemVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  return (
    <motion.section 
      className="relative py-20 lg:py-32 overflow-hidden min-h-screen" 
      style={{ backgroundColor: '#E3E3E3' }}
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
    >
      {/* Enhanced background with teal bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating teal bubbles */}
        <motion.div 
          className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-teal-400/20 to-cyan-500/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/3 -left-8 w-96 h-96 bg-gradient-to-tr from-teal-300/15 to-emerald-400/15 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 0.8, 1],
            x: [0, -25, 0],
            y: [0, 15, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Medium teal bubbles */}
        <motion.div
          className="absolute top-20 left-1/4 w-40 h-40 bg-gradient-to-r from-teal-500/25 to-cyan-400/25 rounded-full blur-2xl"
          animate={{
            y: [0, -40, 40, 0],
            x: [0, 20, -20, 0],
            scale: [1, 1.3, 0.7, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute bottom-32 right-1/3 w-32 h-32 bg-gradient-to-bl from-emerald-400/30 to-teal-600/20 rounded-full blur-xl"
          animate={{
            y: [0, 25, -25, 0],
            x: [0, -15, 15, 0],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Small floating teal particles */}
        <motion.div
          className="absolute top-1/2 left-1/6 w-16 h-16 bg-teal-400/40 rounded-full blur-lg"
          animate={{
            y: [0, -20, 20, 0],
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-2/3 w-20 h-20 bg-cyan-300/35 rounded-full blur-lg"
          animate={{
            y: [0, 30, -30, 0],
            x: [0, 10, -10, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
        
        {/* Tiny teal sparkles */}
        <motion.div
          className="absolute top-3/4 right-1/4 w-8 h-8 bg-teal-300/60 rounded-full blur-sm"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
        <motion.div
          className="absolute top-1/4 right-1/6 w-6 h-6 bg-emerald-400/70 rounded-full blur-sm"
          animate={{
            scale: [0, 1.2, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 7
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10 px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Column - Content */}
          <motion.div className="text-left space-y-8" variants={leftItemVariants}>
            <motion.div 
              className="inline-block px-4 py-2 bg-white backdrop-blur-sm rounded-full text-sm font-medium text-primary mb-6 border border-primary/20 shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              ✨ AI-Powered Test Generation
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight"
              style={{ letterSpacing: '0.01em', lineHeight: '1.1' }}
            >
              Interactive Tests
            </motion.h1>
            
            <motion.p className="text-lg md:text-xl text-gray-700 mb-12 max-w-2xl leading-relaxed">
              {t('hero.subtitle')}
            </motion.p>
            
            <motion.div className="flex flex-col sm:flex-row gap-4 mb-16">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => navigate('/generate')}
                >
                  {t('hero.startCreating')}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-accent text-accent hover:bg-accent hover:text-white px-8 py-4 text-lg rounded-xl transition-all duration-300 bg-white"
                  onClick={() => navigate('/admin/upload')}
                >
                  {t('hero.adminUpload')}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - 3D Robot */}
          <motion.div 
            className="relative h-[600px] lg:h-[700px] flex items-center justify-center" 
            variants={rightItemVariants}
          >
            <div className="w-full h-full relative rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm border border-gray-200 shadow-2xl">
              <SplineScene 
                scene="https://prod.spline.design/4QGVSBNgtfAq99YD/scene.splinecode" 
                className="w-full h-full" 
              />
              
              <motion.div 
                className="absolute bottom-4 left-4 bg-white backdrop-blur-sm px-3 py-2 rounded-lg text-sm text-gray-700 font-medium shadow-lg border border-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                🖱️ Click and drag to interact
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;

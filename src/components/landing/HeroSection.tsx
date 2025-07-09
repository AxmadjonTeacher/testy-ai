
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
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
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Generate floating particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <motion.section 
      className="relative py-20 lg:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #94a3b8 75%, #64748b 100%)'
      }}
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
    >
      {/* Enhanced background with floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Original decorative elements with animations */}
        <motion.div 
          className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/3 -left-8 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 0.8, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-primary/20 to-accent/20"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.initialX}%`,
              top: `${particle.initialY}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(particle.id) * 50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Morphing background shapes */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-xl"
          animate={{
            borderRadius: ["50%", "30%", "50%"],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl text-center relative z-10 px-4">
        <motion.div 
          className="inline-block px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-primary mb-6 border border-primary/20"
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 25px -5px rgba(0, 150, 136, 0.3)"
          }}
          transition={{ duration: 0.2 }}
        >
          ✨ AI-Powered Test Generation
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-dark mb-8 leading-tight"
          variants={itemVariants}
          style={{ letterSpacing: '0.01em', lineHeight: '1.1' }}
        >
          {t('hero.title')}
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-neutral-dark/70 mb-12 max-w-3xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          {t('hero.subtitle')}
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => navigate('/generate')}
            >
              {t('hero.startCreating')}
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-accent text-accent hover:bg-accent hover:text-white px-8 py-4 text-lg rounded-xl transition-all duration-300"
              onClick={() => navigate('/admin/upload')}
            >
              {t('hero.adminUpload')}
            </Button>
          </motion.div>
        </motion.div>

        {/* Enhanced stats with hover effects */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          {[
            { number: "1000+", label: t('hero.stats.testsGenerated') },
            { number: "50+", label: t('hero.stats.happyTeachers') },
            { number: "5★", label: t('hero.stats.userRating') }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center"
              whileHover={{ 
                scale: 1.1,
                y: -5,
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="text-3xl font-bold text-primary mb-2"
                whileHover={{ color: "#004D40" }}
              >
                {stat.number}
              </motion.div>
              <div className="text-neutral-dark/60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;

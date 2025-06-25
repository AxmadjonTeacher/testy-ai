
import React from 'react';
import { motion } from 'framer-motion';

const BackgroundAnimations: React.FC = () => {
  return (
    <>
      {/* Enhanced background with morphing blobs */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20"></div>
      
      {/* Morphing decorative elements */}
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"
        animate={{
          borderRadius: ["50%", "30% 70% 60% 40%", "40% 60% 70% 30%", "50%"],
          scale: [1, 1.2, 0.8, 1],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-2xl"
        animate={{
          borderRadius: ["50%", "60% 40% 30% 70%", "70% 30% 40% 60%", "50%"],
          scale: [1, 0.7, 1.3, 1],
          x: [0, 20, -20, 0],
          y: [0, -15, 15, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Additional floating elements */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl"
        animate={{
          y: [0, -30, 30, 0],
          x: [0, 20, -20, 0],
          scale: [1, 1.3, 0.7, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </>
  );
};

export default BackgroundAnimations;

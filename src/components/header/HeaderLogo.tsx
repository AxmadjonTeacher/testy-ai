
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import testyLogoFull from '@/assets/testy-logo-full.png';

const HeaderLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-3 ml-2">
      <motion.img 
        src={testyLogoFull} 
        alt="Testy Logo" 
        className="h-10"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      />
    </Link>
  );
};

export default HeaderLogo;

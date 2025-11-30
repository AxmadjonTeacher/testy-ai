
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeaderLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-3 ml-2">
      <motion.img 
        src="/testy-logo.png" 
        alt="Testy Logo" 
        className="h-14 w-14"
        whileHover={{ rotate: 10, scale: 1.05 }}
        transition={{ duration: 0.2 }}
      />
      <motion.h1 
        className="text-2xl font-black text-foreground"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Testy
      </motion.h1>
    </Link>
  );
};

export default HeaderLogo;

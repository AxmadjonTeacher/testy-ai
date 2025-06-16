
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeaderLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-3 ml-2">
      <motion.img 
        src="/lovable-uploads/86990c82-4285-4b75-a8b6-372915c73199.png" 
        alt="Testy Logo" 
        className="h-10 w-10"
        whileHover={{ rotate: 10, scale: 1.05 }}
        transition={{ duration: 0.2 }}
      />
      <motion.h1 
        className="text-2xl font-bold text-gray-900"
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


import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const HeaderLogo = () => {
  return (
    <Link to="/" className="flex items-center ml-2">
      <Button 
        variant="outline" 
        className="h-10 text-lg font-black bg-[#d4ff00] text-black border-4 border-black px-6 hover:bg-[#c5f000]"
        asChild
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          TESTY
        </motion.div>
      </Button>
    </Link>
  );
};

export default HeaderLogo;

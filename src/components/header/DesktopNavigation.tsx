
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck } from "lucide-react";
import { useTranslation } from 'react-i18next';

interface DesktopNavigationProps {
  isAdmin: boolean;
}

const DesktopNavigation = ({ isAdmin }: DesktopNavigationProps) => {
  const { t } = useTranslation();
  
  const navVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav 
      className="hidden lg:flex items-center justify-center flex-1 mx-8"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-2 py-2 shadow-sm border border-gray-100">
        <motion.div variants={itemVariants}>
          <Link to="/dashboard" className="px-4 py-2 text-neutral-dark hover:text-primary transition-colors rounded-full hover:bg-primary/5 font-medium text-sm">
            {t('nav.dashboard')}
          </Link>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link to="/generate" className="px-4 py-2 text-neutral-dark hover:text-primary transition-colors rounded-full hover:bg-primary/5 font-medium text-sm">
            {t('nav.generate')}
          </Link>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link to="/library" className="px-4 py-2 text-neutral-dark hover:text-primary transition-colors rounded-full hover:bg-primary/5 font-medium text-sm">
            {t('nav.library')}
          </Link>
        </motion.div>
        {isAdmin && (
          <motion.div variants={itemVariants}>
            <Link to="/admin/upload" className="px-4 py-2 text-neutral-dark hover:text-primary transition-colors rounded-full hover:bg-primary/5 font-medium flex items-center gap-2 text-sm">
              <ShieldCheck className="h-4 w-4" />
              {t('nav.admin')}
            </Link>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default DesktopNavigation;

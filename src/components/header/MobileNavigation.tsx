
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ShieldCheck, Plus } from "lucide-react";
import { useTranslation } from 'react-i18next';

interface MobileNavigationProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  isAdmin: boolean;
  user: any;
  handleSignIn: () => void;
  handleContact: () => void;
}

const MobileNavigation = ({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen, 
  isAdmin, 
  user, 
  handleSignIn, 
  handleContact 
}: MobileNavigationProps) => {
  const { t } = useTranslation();
  
  if (!isMobileMenuOpen) return null;

  return (
    <motion.div 
      className="lg:hidden mt-4 pb-4 border-t border-gray-100 pt-4"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
    >
      <div className="flex flex-col space-y-2">
        <Link 
          to="/dashboard" 
          className="px-4 py-2 text-neutral-dark hover:text-primary transition-colors rounded-lg hover:bg-primary/5 font-medium"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {t('nav.dashboard')}
        </Link>
        <Link 
          to="/generate" 
          className="px-4 py-2 text-neutral-dark hover:text-primary transition-colors rounded-lg hover:bg-primary/5 font-medium"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {t('nav.generate')}
        </Link>
        <Link 
          to="/library" 
          className="px-4 py-2 text-neutral-dark hover:text-primary transition-colors rounded-lg hover:bg-primary/5 font-medium"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {t('nav.library')}
        </Link>
        {isAdmin && (
          <Link 
            to="/admin/upload" 
            className="px-4 py-2 text-neutral-dark hover:text-primary transition-colors rounded-lg hover:bg-primary/5 font-medium flex items-center gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <ShieldCheck className="h-4 w-4" />
            {t('nav.admin')}
          </Link>
        )}
        <Link 
          to="/privacy-policy#data-retention" 
          className="px-4 py-2 text-neutral-dark hover:text-primary transition-colors rounded-lg hover:bg-primary/5 font-medium"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {t('nav.help')}
        </Link>
        {!user && (
          <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100 mt-2">
            <Button 
              variant="ghost" 
              className="justify-start text-neutral-dark hover:bg-neutral-dark/5 font-medium" 
              onClick={() => {
                handleSignIn();
                setIsMobileMenuOpen(false);
              }}
            >
              {t('nav.signIn')}
            </Button>
            <Button 
              className="justify-start bg-primary hover:bg-primary/90 text-white font-medium" 
              onClick={() => {
                handleContact();
                setIsMobileMenuOpen(false);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('nav.contact')}
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MobileNavigation;

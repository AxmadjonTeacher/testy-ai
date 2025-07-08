import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import HeaderLogo from './header/HeaderLogo';
import MobileMenuButton from './header/MobileMenuButton';
import DesktopNavigation from './header/DesktopNavigation';
import UserActions from './header/UserActions';
import MobileNavigation from './header/MobileNavigation';
import LanguageSwitcher from './header/LanguageSwitcher';

const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdminCheck();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignIn = () => {
    navigate('/auth');
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleUserMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleContact = () => {
    navigate('/privacy-policy');
  };

  return (
    <motion.header 
      className="w-full bg-white/70 backdrop-blur-2xl border-b border-gray-100 shadow-sm sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Mobile Menu */}
          <motion.div 
            className="flex items-center gap-3 flex-shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <MobileMenuButton 
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
            <HeaderLogo />
          </motion.div>
          
          {/* Desktop Navigation */}
          <DesktopNavigation isAdmin={isAdmin} />

          {/* User Actions and Language Switcher */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <UserActions 
              user={user}
              isAdmin={isAdmin}
              isMenuOpen={isMenuOpen}
              handleUserMenuToggle={handleUserMenuToggle}
              handleSignOut={handleSignOut}
              handleSignIn={handleSignIn}
              handleContact={handleContact}
            />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <MobileNavigation 
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          isAdmin={isAdmin}
          user={user}
          handleSignIn={handleSignIn}
          handleContact={handleContact}
        />
      </div>
    </motion.header>
  );
};

export default Header;

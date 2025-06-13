import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, ShieldCheck, Plus } from "lucide-react";
import { motion } from 'framer-motion';
import { useAdminCheck } from '@/hooks/useAdminCheck';

const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdminCheck();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleGetStarted = () => {
    navigate('/generate');
  };

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

  const getUserInitials = () => {
    if (!user?.email) return 'U';
    return user.email.substring(0, 1).toUpperCase();
  };

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
    <motion.header 
      className="w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="flex items-center gap-3">
            <motion.img 
              src="/lovable-uploads/86990c82-4285-4b75-a8b6-372915c73199.png" 
              alt="Testy Logo" 
              className="h-10 w-10"
              whileHover={{ rotate: 10, scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
            <motion.h1 
              className="text-2xl font-bold text-neutral-dark"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Testy
            </motion.h1>
          </Link>
        </motion.div>
        
        <motion.nav 
          className="hidden md:flex items-center justify-center flex-1 mx-8"
          variants={navVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-2 py-2 shadow-sm border border-gray-100">
            <motion.div variants={itemVariants}>
              <Link to="/dashboard" className="px-6 py-2 text-neutral-dark hover:text-primary transition-colors rounded-full hover:bg-primary/5 font-medium">
                Dashboard
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link to="/generate" className="px-6 py-2 text-neutral-dark hover:text-primary transition-colors rounded-full hover:bg-primary/5 font-medium">
                Generate
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link to="/library" className="px-6 py-2 text-neutral-dark hover:text-primary transition-colors rounded-full hover:bg-primary/5 font-medium">
                Library
              </Link>
            </motion.div>
            {isAdmin && (
              <motion.div variants={itemVariants}>
                <Link to="/admin/upload" className="px-6 py-2 text-neutral-dark hover:text-primary transition-colors rounded-full hover:bg-primary/5 font-medium flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Admin
                </Link>
              </motion.div>
            )}
            <motion.div variants={itemVariants}>
              <Link to="/privacy-policy#data-retention" className="px-6 py-2 text-neutral-dark hover:text-primary transition-colors rounded-full hover:bg-primary/5 font-medium">
                Help
              </Link>
            </motion.div>
          </div>
        </motion.nav>
        
        <motion.div 
          className="flex items-center space-x-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {user ? (
            <DropdownMenu open={isMenuOpen} onOpenChange={handleUserMenuToggle}>
              <DropdownMenuTrigger asChild>
                <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                  <Button variant="ghost" className="relative rounded-full h-10 w-10 p-0 hover:bg-primary/10">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-white font-semibold">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-3">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium text-sm">{user.email}</p>
                    {isAdmin && (
                      <span className="text-xs text-neutral-dark flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3 text-primary" />
                        Admin
                      </span>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>My Tests</span>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem onClick={() => navigate('/admin/upload')} className="cursor-pointer">
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    <span>Admin Panel</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Button variant="ghost" className="text-neutral-dark hover:bg-neutral-dark/5 font-medium" onClick={handleSignIn}>
                  Sign In
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white font-medium rounded-full px-6 py-2 shadow-sm flex items-center gap-2" 
                  onClick={handleContact}
                >
                  <Plus className="h-4 w-4" />
                  Contact
                </Button>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;


import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ShieldCheck, Plus } from "lucide-react";

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
  if (!isMobileMenuOpen) return null;

  return (
    <motion.div 
      className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
    >
      <div className="flex flex-col space-y-2">
        <Link 
          to="/dashboard" 
          className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-50 font-medium"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Dashboard
        </Link>
        <Link 
          to="/generate" 
          className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-50 font-medium"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Generate
        </Link>
        <Link 
          to="/library" 
          className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-50 font-medium"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Library
        </Link>
        {isAdmin && (
          <Link 
            to="/admin/upload" 
            className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-50 font-medium flex items-center gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <ShieldCheck className="h-4 w-4" />
            Admin
          </Link>
        )}
        <Link 
          to="/privacy-policy#data-retention" 
          className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-50 font-medium"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Help
        </Link>
        {!user && (
          <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200 mt-2">
            <Button 
              variant="ghost" 
              className="justify-start text-gray-700 hover:bg-gray-50 font-medium" 
              onClick={() => {
                handleSignIn();
                setIsMobileMenuOpen(false);
              }}
            >
              Sign In
            </Button>
            <Button 
              className="justify-start bg-blue-600 hover:bg-blue-700 text-white font-medium" 
              onClick={() => {
                handleContact();
                setIsMobileMenuOpen(false);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Contact
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MobileNavigation;

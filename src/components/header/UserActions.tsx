
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
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

interface UserActionsProps {
  user: any;
  isAdmin: boolean;
  isMenuOpen: boolean;
  handleUserMenuToggle: () => void;
  handleSignOut: () => void;
  handleSignIn: () => void;
  handleContact: () => void;
}

const UserActions = ({ 
  user, 
  isAdmin, 
  isMenuOpen, 
  handleUserMenuToggle, 
  handleSignOut, 
  handleSignIn, 
  handleContact 
}: UserActionsProps) => {
  const navigate = useNavigate();

  const getUserInitials = () => {
    if (!user?.email) return 'U';
    return user.email.substring(0, 1).toUpperCase();
  };

  return (
    <motion.div 
      className="flex items-center space-x-3 flex-shrink-0"
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
        <div className="hidden sm:flex items-center space-x-3">
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
        </div>
      )}
    </motion.div>
  );
};

export default UserActions;


import React, { useState } from 'react';
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
import { LogOut, User } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
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

  const getUserInitials = () => {
    if (!user?.email) return 'U';
    return user.email.substring(0, 1).toUpperCase();
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/86990c82-4285-4b75-a8b6-372915c73199.png" 
              alt="TestGen Logo" 
              className="h-12 w-12"
            />
            <h1 className="text-xl font-semibold text-primary">TestGen</h1>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/dashboard" className="text-neutral-dark hover:text-primary transition-colors">Dashboard</Link>
          <Link to="/generate" className="text-neutral-dark hover:text-primary transition-colors">Generate</Link>
          <Link to="/admin/upload" className="text-neutral-dark hover:text-primary transition-colors">Admin Upload</Link>
          <Link to="/privacy-policy#data-retention" className="text-neutral-dark hover:text-primary transition-colors">Help</Link>
        </nav>
        <div className="flex items-center space-x-2">
          {user ? (
            <DropdownMenu open={isMenuOpen} onOpenChange={handleUserMenuToggle}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative rounded-full h-8 w-8 p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-white">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>My Tests</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" className="text-neutral-dark" onClick={handleSignIn}>Sign In</Button>
              <Button className="bg-primary hover:bg-primary/90 text-white" onClick={handleGetStarted}>Get Started</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

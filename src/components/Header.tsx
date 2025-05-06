
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Header = () => {
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
          <Link to="/privacy-policy#data-retention" className="text-neutral-dark hover:text-primary transition-colors">Help</Link>
        </nav>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" className="text-neutral-dark">Sign In</Button>
          <Button className="bg-primary hover:bg-primary/90 text-white">Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;


import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <h1 className="text-xl font-semibold text-primary">TestGen</h1>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/dashboard" className="text-neutral-dark hover:text-primary transition-colors">Dashboard</Link>
          <Link to="/" className="text-neutral-dark hover:text-primary transition-colors">My Tests</Link>
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

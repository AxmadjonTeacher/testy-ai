
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { LogIn } from "lucide-react";

const SignInRequired: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-neutral-dark mb-4">Sign In Required</h2>
        <p className="text-neutral-dark/70 mb-6">
          Please sign in to view your saved tests and generate new ones.
        </p>
        <Button 
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white"
          onClick={() => navigate('/auth')}
        >
          <LogIn className="h-4 w-4" />
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default SignInRequired;

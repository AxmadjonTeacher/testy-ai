
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const EmptyTestState: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-12">
      <p className="text-xl font-medium text-neutral-dark mb-6">
        You haven't generated any test yet!
      </p>
      <Button 
        className="bg-primary hover:bg-primary/90 text-white"
        onClick={() => navigate('/generate')}
      >
        Get Started
      </Button>
    </div>
  );
};

export default EmptyTestState;

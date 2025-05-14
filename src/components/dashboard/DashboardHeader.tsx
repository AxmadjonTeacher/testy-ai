
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-bold text-neutral-dark">My Tests</h2>
      <Button 
        className="bg-primary hover:bg-primary/90 text-white"
        onClick={() => navigate('/generate')}
      >
        Generate New Test
      </Button>
    </div>
  );
};

export default DashboardHeader;

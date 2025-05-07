
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="gradient-bg py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            AI-Powered Test Generator for English Language Teachers
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/90">
            Upload sample tests, organize by level, and automatically generate unique tests with mixed questions. Save time and increase variety in your classroom.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90"
              onClick={() => navigate('/generate')}
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent text-white border-white hover:bg-white/10"
              onClick={() => navigate('/dashboard')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

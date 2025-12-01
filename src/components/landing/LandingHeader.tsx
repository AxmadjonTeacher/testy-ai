import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import HeaderLogo from '../header/HeaderLogo';
import { useAuth } from '@/contexts/AuthContext';
import LanguageSwitcher from '../header/LanguageSwitcher';

const LandingHeader = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header className="border-b-4 border-foreground bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
        <HeaderLogo />
        
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Button 
                variant="outline" 
                onClick={() => navigate('/dashboard')}
                className="h-10 text-base font-black bg-card border-4 border-foreground hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
              >
                My Tests
              </Button>
              <LanguageSwitcher />
              <Button 
                onClick={() => navigate('/generate')}
                className="h-10 text-base font-black bg-accent text-accent-foreground border-4 border-foreground hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
              >
                Generate
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={() => navigate('/auth')}
                className="h-10 text-base font-black bg-card border-4 border-foreground hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
              >
                Log in
              </Button>
              <LanguageSwitcher />
              <Button 
                onClick={() => navigate('/generate')}
                className="h-10 text-base font-black bg-accent text-accent-foreground border-4 border-foreground hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
              >
                Generate
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
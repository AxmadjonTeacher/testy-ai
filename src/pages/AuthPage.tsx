
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthForm from '@/components/auth/AuthForm';
import { Button } from '@/components/ui/button';
import { makeSelfAdmin } from '@/utils/adminUtils';
import { useAuth } from '@/contexts/AuthContext';

const AuthPage: React.FC = () => {
  const { user } = useAuth();
  
  const handleMakeAdmin = async () => {
    await makeSelfAdmin();
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-neutral-light flex flex-col items-center justify-center py-10 px-4">
        <AuthForm />
        
        {/* Development tool - only shown when logged in */}
        {user && (
          <div className="mt-8 p-4 border rounded-md bg-white max-w-md w-full">
            <h3 className="text-sm font-medium text-neutral-dark mb-2">Development Tools</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleMakeAdmin}
              className="text-xs"
            >
              Make Myself Admin
            </Button>
            <p className="text-xs text-neutral-dark/70 mt-2">
              This button is for development purposes only. It grants admin privileges to your account.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AuthPage;


import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthForm from '@/components/auth/AuthForm';
import LiquidBackground from '@/components/LiquidBackground';

const AuthPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <LiquidBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center py-10 px-4">
          <AuthForm />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AuthPage;

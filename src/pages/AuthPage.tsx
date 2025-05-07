
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthForm from '@/components/auth/AuthForm';

const AuthPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-neutral-light flex items-center justify-center py-10 px-4">
        <AuthForm />
      </div>
      <Footer />
    </div>
  );
};

export default AuthPage;

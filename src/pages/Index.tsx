
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LandingPage from '@/components/LandingPage';
import LiquidBackground from '@/components/LiquidBackground';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <LiquidBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <LandingPage />
        <Footer />
      </div>
    </div>
  );
};

export default Index;

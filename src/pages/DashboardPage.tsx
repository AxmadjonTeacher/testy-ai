
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Dashboard from '@/components/Dashboard';
import LiquidBackground from '@/components/LiquidBackground';

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <LiquidBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <div className="flex-1">
          <Dashboard />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardPage;


import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Dashboard from '@/components/Dashboard';

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <Dashboard />
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;

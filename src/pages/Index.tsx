
import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Dashboard from '@/components/Dashboard';
import Footer from '@/components/Footer';

const Index = () => {
  const [showDemo, setShowDemo] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {!showDemo ? (
        <>
          <Hero />
          <Features />
          <div className="py-16 container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">Ready to try it out?</h2>
            <button 
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium"
              onClick={() => setShowDemo(true)}
            >
              View Demo Dashboard
            </button>
          </div>
        </>
      ) : (
        <div className="flex-1">
          <Dashboard />
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;

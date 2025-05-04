
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GenerateTest from '@/components/GenerateTest';

const GeneratePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-neutral-light">
        <GenerateTest />
      </div>
      <Footer />
    </div>
  );
};

export default GeneratePage;

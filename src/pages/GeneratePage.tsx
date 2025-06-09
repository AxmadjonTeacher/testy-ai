
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GenerateTest from '@/components/GenerateTest';
import { motion } from 'framer-motion';

const GeneratePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 relative overflow-hidden">
        {/* Background gradient similar to landing page */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-2xl"></div>
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
                ✨ Test Generation
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4">
                Generate Your Test
              </h1>
              <p className="text-lg text-neutral-dark/70 max-w-2xl mx-auto">
                Create unique, customized tests in seconds with our AI-powered platform
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <GenerateTest />
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GeneratePage;


import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Library from '@/components/Library';
import LiquidBackground from '@/components/LiquidBackground';
import { motion } from 'framer-motion';

const LibraryPage = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <LiquidBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 relative overflow-hidden">
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-2xl overflow-hidden"
            >
              <Library />
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LibraryPage;

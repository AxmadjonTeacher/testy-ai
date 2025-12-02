import React from 'react';
import { motion } from 'framer-motion';

const LandingFooter: React.FC = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t-4 border-foreground bg-card">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-mono text-muted-foreground">
            © {new Date().getFullYear()} Testy. All rights reserved.
          </p>
          
          <button
            onClick={scrollToContact}
            className="text-sm font-black text-foreground hover:underline uppercase tracking-wider"
          >
            CONTACT
          </button>
        </motion.div>
      </div>
    </footer>
  );
};

export default LandingFooter;

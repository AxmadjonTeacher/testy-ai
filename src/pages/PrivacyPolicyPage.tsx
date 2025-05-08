
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, User, Telegram } from 'lucide-react';
import { motion } from 'framer-motion';

const PrivacyPolicyPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-neutral-light py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-8">
              <motion.div 
                className="flex items-center justify-center mb-8"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="text-primary h-8 w-8" />
                </div>
              </motion.div>

              <motion.h1 
                className="text-3xl font-bold text-center text-neutral-dark mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                🔒 Privacy & Contact
              </motion.h1>

              <motion.p 
                className="text-lg text-center text-neutral-dark/80 mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                If you have any questions or feedback about this app, feel free to contact the developer:
              </motion.p>

              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <User className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-neutral-dark mb-2">Developer</h3>
                  <p className="text-neutral-dark/80">Axmadjon Yodgorov</p>
                </div>

                <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Mail className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-neutral-dark mb-2">Email</h3>
                  <a 
                    href="mailto:ahmetyadgarovjust@gmail.com" 
                    className="text-primary hover:underline break-all"
                  >
                    ahmetyadgarovjust@gmail.com
                  </a>
                </div>

                <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Telegram className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-neutral-dark mb-2">Telegram</h3>
                  <a 
                    href="https://t.me/ahmet_just" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    @ahmet_just
                  </a>
                </div>
              </motion.div>

              <motion.div 
                className="border-t border-gray-100 pt-10 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 h-6 w-6">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                  <h3 className="text-xl font-semibold text-neutral-dark">Support My Work</h3>
                </div>
                <p className="text-center text-neutral-dark/80 mb-6">
                  If you'd like to support the development of this app:
                </p>
                <a 
                  href="https://www.buymeacoffee.com/axmadjon" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-scale transition-all"
                >
                  <img 
                    src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" 
                    alt="Buy Me a Coffee" 
                    className="h-12 rounded-md" 
                  />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;


import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, User } from 'lucide-react';
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
                    <svg className="text-primary h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22.05 2.31c-0.81 0.36-1.68 0.61-2.59 0.72 0.93-0.56 1.65-1.44 1.99-2.49-0.87 0.52-1.84 0.9-2.86 1.1-0.82-0.88-1.99-1.42-3.29-1.42-2.49 0-4.51 2.02-4.51 4.51 0 0.35 0.04 0.7 0.12 1.03-3.75-0.19-7.08-1.98-9.3-4.71-0.39 0.67-0.61 1.45-0.61 2.28 0 1.56 0.8 2.95 2.01 3.75-0.74-0.02-1.44-0.23-2.05-0.57v0.06c0 2.18 1.55 4.01 3.61 4.42-0.38 0.1-0.78 0.16-1.19 0.16-0.29 0-0.57-0.03-0.85-0.08 0.57 1.79 2.23 3.09 4.2 3.13-1.54 1.21-3.48 1.93-5.59 1.93-0.36 0-0.72-0.02-1.07-0.06 1.99 1.28 4.35 2.02 6.89 2.02 8.27 0 12.79-6.85 12.79-12.79 0-0.19 0-0.39-0.01-0.58 0.88-0.63 1.64-1.42 2.24-2.33z"></path>
                    </svg>
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

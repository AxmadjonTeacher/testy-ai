
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, User, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

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
                    className="text-primary hover:underline"
                  >
                    ahmetyadgarovjust@gmail.com
                  </a>
                </div>

                <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <svg className="text-primary h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.2125 3.65252C21.0825 4.09252 19.9525 4.35752 18.7575 4.53752C19.9525 3.75752 20.895 2.54252 21.33 1.11752C20.13 1.83752 18.8625 2.31752 17.5425 2.62752C16.485 1.47752 14.9925 0.802521 13.32 0.802521C10.14 0.802521 7.54998 3.39252 7.54998 6.57252C7.54998 7.04252 7.61998 7.48252 7.69498 7.89252C2.94748 7.65752 0.872475 5.62752 0.172475 2.48252C0.0974754 2.96752 0.0224953 3.48752 0.0224953 4.03752C0.0224953 5.89752 1.11749 7.52252 2.62498 8.44752C1.96498 8.44752 1.33498 8.24252 0.774975 7.96252V7.99252C0.774975 10.7675 2.69998 13.0425 5.28748 13.4975C4.62748 13.6775 3.96748 13.7175 3.30748 13.6025C4.06498 15.8775 6.07498 17.4825 8.43748 17.5575C6.57748 19.0875 4.19998 19.9425 1.59748 19.9425C1.06998 19.9425 0.577475 19.9175 0.0849854 19.8675C2.45998 21.4575 5.25748 22.3125 8.28748 22.3125C17.0025 22.3125 21.855 14.9975 21.855 8.74252C21.855 8.49752 21.855 8.27752 21.8475 8.03252C23.0475 7.15752 24.0375 6.05252 24.8325 4.82252C23.79 5.24252 22.7025 5.55252 21.57 5.67752L22.2125 3.65252Z" fill="currentColor" />
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
                  <Heart className="text-red-500 h-6 w-6" />
                  <h3 className="text-xl font-semibold text-neutral-dark">Support My Work</h3>
                </div>
                <p className="text-center text-neutral-dark/80 mb-6">
                  If you'd like to support the development of this app:
                </p>
                <a 
                  href="https://www.buymeacoffee.com/ahmetjust" 
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

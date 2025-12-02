import React from 'react';
import { motion } from 'framer-motion';

const ContactSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          className="border-4 border-foreground bg-card p-12 md:p-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-black text-center mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            CONTACT
          </motion.h2>
          
          <motion.p 
            className="text-center text-muted-foreground mb-12 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Get in touch with the creator.
          </motion.p>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div 
              variants={cardVariants}
              className="border-4 border-foreground p-8 bg-[#D4FF00] hover:translate-x-[2px] hover:translate-y-[2px] transition-transform cursor-default"
            >
              <h3 className="text-2xl font-black mb-4 text-foreground">CREATOR</h3>
              <p className="text-foreground font-mono">Yodgorov Axmadjon</p>
            </motion.div>

            <motion.div 
              variants={cardVariants}
              className="border-4 border-foreground p-8 bg-[#7FFF00] hover:translate-x-[2px] hover:translate-y-[2px] transition-transform cursor-default"
            >
              <h3 className="text-2xl font-black mb-4 text-foreground">EMAIL</h3>
              <a 
                href="mailto:ahmetyadgarovjust@gmail.com" 
                className="text-foreground font-mono hover:underline break-all"
              >
                ahmetyadgarovjust@gmail.com
              </a>
            </motion.div>

            <motion.div 
              variants={cardVariants}
              className="border-4 border-foreground p-8 bg-[#3B82F6] hover:translate-x-[2px] hover:translate-y-[2px] transition-transform cursor-default"
            >
              <h3 className="text-2xl font-black mb-4 text-white">TELEGRAM</h3>
              <a 
                href="https://t.me/YodgorovAxmadjon" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-mono hover:underline"
              >
                t.me/YodgorovAxmadjon
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

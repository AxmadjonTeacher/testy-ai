
import React from 'react';
import { motion } from 'framer-motion';

const HowItWorksSection: React.FC = () => {
  const steps = [
    "We have thousands of tests and exercises for all grammar topics",
    "You will choose the topics and the number of questions, teacher's name, grade and english proficiency level",
    "And then AI will generate a test for you",
    "You can download the test in docx format"
  ];

  return (
    <section className="py-12 bg-neutral-light px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.h2 
          className="text-2xl font-bold text-center text-neutral-dark mb-8" 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          viewport={{ once: true }}
        >
          How it works and steps to follow
        </motion.h2>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8" 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 0.8, staggerChildren: 0.2 }} 
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow" 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.5, delay: index * 0.1 }} 
              viewport={{ once: true }} 
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <p className="text-neutral-dark">{step}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

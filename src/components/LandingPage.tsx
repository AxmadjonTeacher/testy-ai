
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <motion.section 
        className="py-16 px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-neutral-dark mb-6"
            variants={itemVariants}
          >
            AI Powered Test Generator for English Language Teaching
          </motion.h1>
          <motion.p 
            className="text-lg text-neutral-dark/80 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Information about the website and how it helps generate unique tests for all English proficiency levels
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            variants={itemVariants}
          >
            <Button 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg rounded-md hover:scale-105 transition-transform" 
              onClick={() => navigate('/generate')}
            >
              Get Started
            </Button>
            <Button 
              className="bg-accent hover:bg-accent/90 text-white px-8 py-3 text-lg rounded-md hover:scale-105 transition-transform" 
              onClick={() => navigate('/admin/upload')}
            >
              Admin Upload
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works Section */}
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
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
            viewport={{ once: true }}
          >
            {[1, 2, 3, 4].map((index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                {index === 1 && (
                  <p className="text-neutral-dark">
                    We have thousands of tests and exercises for all grammar topics
                  </p>
                )}
                {index === 2 && (
                  <p className="text-neutral-dark">
                    You will choose the topics and the number of questions, teacher's name, grade and english proficiency level
                  </p>
                )}
                {index === 3 && (
                  <p className="text-neutral-dark">
                    And then AI will generate a test for you
                  </p>
                )}
                {index === 4 && (
                  <p className="text-neutral-dark">
                    You can edit the document before downloading it
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-xl font-medium text-neutral-dark mb-6">
              Ready to try?
            </p>
            <Button 
              className="bg-primary hover:bg-primary/90 text-white hover:scale-105 transition-transform" 
              onClick={() => navigate('/generate')}
            >
              Generate
            </Button>
          </motion.div>
        </div>
      </section>      
    </div>
  );
};

export default LandingPage;

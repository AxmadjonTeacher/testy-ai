
import React from 'react';
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import FeatureCard from '@/components/FeatureCard';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shuffle, Upload, Settings } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const features = [
    {
      icon: <Shuffle size={32} />,
      title: "Question Shuffling",
      description: "AI automatically mixes questions from your uploaded content to create unique tests every time, ensuring no two tests are exactly the same."
    },
    {
      icon: <Upload size={32} />,
      title: "Easy Test Upload",
      description: "Simply upload your existing tests in Excel or CSV format. Our system intelligently parses and organizes your questions by topic and difficulty."
    },
    {
      icon: <Settings size={32} />,
      title: "Customizable Tests",
      description: "Choose specific topics, set question counts, select difficulty levels, and customize teacher information to match your exact requirements."
    }
  ];

  const faqItems = [
    {
      question: "What types of questions can I upload?",
      answer: "You can upload multiple choice questions, fill-in-the-blank, true/false, and short answer questions. Our system supports Excel (.xlsx) and CSV formats with proper question formatting."
    },
    {
      question: "How does the question shuffling work?",
      answer: "Our AI intelligently selects questions from your uploaded content based on the topics and difficulty level you choose. It ensures variety by mixing questions and avoiding repetition across different test generations."
    },
    {
      question: "Can I customize the difficulty level?",
      answer: "Yes! You can organize your questions by English proficiency levels (Beginner, Intermediate, Advanced) and select the appropriate level when generating tests. You can also mix different levels in a single test."
    }
  ];

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
            Test Generator for English Language Teaching
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

      {/* Key Features Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.h2 
            className="text-2xl font-bold text-center text-neutral-dark mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Key Features
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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
            {[1, 2, 3, 4].map(index => (
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
                    You can download the test in docx format
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

      {/* FAQ Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.h2 
            className="text-2xl font-bold text-center text-neutral-dark mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-neutral-light">
                  <AccordionTrigger className="text-left text-neutral-dark hover:text-primary transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-neutral-dark/80 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

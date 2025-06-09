
import React from 'react';
import { motion } from 'framer-motion';
import { Shuffle, Upload, Settings } from 'lucide-react';
import FeatureCard from '@/components/FeatureCard';

const KeyFeaturesSection: React.FC = () => {
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

  return (
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
  );
};

export default KeyFeaturesSection;


import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import BackgroundAnimations from './how-it-works/BackgroundAnimations';
import StepCard from './how-it-works/StepCard';
import AnimatedConnectionLine from './how-it-works/AnimatedConnectionLine';
import { steps } from './how-it-works/stepsData';

const HowItWorksSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <BackgroundAnimations />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-block px-4 py-2 bg-accent/10 rounded-full text-sm font-medium text-accent mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {t('howItWorks.ourProcess')}
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-6">
            {t('howItWorks.title')}
          </h2>
          <p className="text-lg text-neutral-dark/70 max-w-2xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </motion.div>

        <div className="relative">
          <AnimatedConnectionLine />
          
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
            viewport={{ once: true }}
          >
            {steps.map((step, index) => (
              <StepCard
                key={index}
                step={step}
                index={index}
                totalSteps={steps.length}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

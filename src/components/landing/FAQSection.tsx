
import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FAQSection: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const faqItems = [
    {
      question: t('faqQuestions.q1'),
      answer: t('faqQuestions.a1')
    },
    {
      question: t('faqQuestions.q2'),
      answer: t('faqQuestions.a2')
    },
    {
      question: t('faqQuestions.q3'),
      answer: t('faqQuestions.a3')
    },
    {
      question: t('faqQuestions.q4'),
      answer: t('faqQuestions.a4')
    },
    {
      question: t('faqQuestions.q5'),
      answer: t('faqQuestions.a5')
    }
  ];

  const handleContactClick = () => {
    navigate('/privacy-policy');
  };

  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden">
      {/* Enhanced background with ripple effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl transform -translate-x-1/2"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl transform translate-x-1/2"
          animate={{
            scale: [1, 0.7, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Ripple effects */}
        <motion.div
          className="absolute top-1/3 right-1/3 w-32 h-32 border-2 border-primary/20 rounded-full"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-32 h-32 border-2 border-accent/20 rounded-full"
          animate={{
            scale: [1, 2.5, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-24 h-24 border border-secondary/30 rounded-full"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <HelpCircle size={16} />
            </motion.div>
            {t('faq.faqLabel')}
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-6">
            {t('faq.title')}
          </h2>
          <p className="text-lg text-neutral-dark/70 max-w-2xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </motion.div>
        
        <motion.div
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileHover={{
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border-b border-gray-100 last:border-b-0"
              >
                <AccordionTrigger className="text-left px-8 py-6 text-lg font-semibold text-neutral-dark hover:text-primary transition-colors hover:no-underline group">
                  <span className="flex items-start gap-4">
                    <motion.span 
                      className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-sm group-hover:bg-primary group-hover:text-white transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </motion.span>
                    <span className="text-left">{item.question}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6 text-neutral-dark/80 leading-relaxed">
                  <motion.div 
                    className="pl-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.answer}
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Enhanced call to action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-neutral-dark/70 mb-4">{t('faq.stillHaveQuestions')}</p>
          <motion.button 
            onClick={handleContactClick}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors cursor-pointer"
            whileHover={{ 
              scale: 1.05,
              x: 5,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {t('faq.getInTouch')}
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight size={16} />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;

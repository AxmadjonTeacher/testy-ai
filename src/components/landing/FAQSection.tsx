
import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQSection: React.FC = () => {
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
  );
};

export default FAQSection;

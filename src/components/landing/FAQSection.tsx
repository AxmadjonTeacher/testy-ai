
import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FAQSection: React.FC = () => {
  const navigate = useNavigate();

  const faqItems = [
    {
      question: "What types of questions can I upload?",
      answer: "You can upload multiple choice questions, fill-in-the-blank, true/false, and short answer questions. Our system supports Excel (.xlsx) and CSV formats with proper question formatting. The AI recognizes different question types and maintains their structure when generating new tests."
    },
    {
      question: "How does the question shuffling work?",
      answer: "Our advanced AI intelligently selects questions from your uploaded content based on the topics and difficulty level you choose. It ensures variety by mixing questions while maintaining educational coherence and avoiding repetition across different test generations. The algorithm also balances question types for optimal learning assessment."
    },
    {
      question: "Can I customize the difficulty level?",
      answer: "Absolutely! You can organize your questions by English proficiency levels (Beginner, Intermediate, Advanced) and select the appropriate level when generating tests. You can also mix different levels in a single test to create progressive difficulty or accommodate diverse classroom needs."
    },
    {
      question: "Is my content secure and private?",
      answer: "Yes, we take data security seriously. All uploaded content is encrypted and stored securely. Your test materials remain private and are only used to generate tests for your account. We never share or use your content for any other purpose."
    },
    {
      question: "How quickly can I generate a test?",
      answer: "Test generation is nearly instantaneous! Once you've uploaded your content and selected your preferences, our AI can generate a complete, formatted test in under 10 seconds. The system is optimized for speed without compromising quality."
    }
  ];

  const handleContactClick = () => {
    navigate('/privacy-policy');
  };

  return (
    <section className="py-20 px-4 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-sm font-medium text-green-600 mb-4">
            <HelpCircle size={16} />
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Questions & Answers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our AI-powered test generation platform. Can't find what you're looking for? Contact our support team.
          </p>
        </motion.div>
        
        <motion.div
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border-b border-gray-100 last:border-b-0"
              >
                <AccordionTrigger className="text-left px-8 py-6 text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors hover:no-underline group">
                  <span className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-left">{item.question}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6 text-gray-600 leading-relaxed">
                  <div className="pl-12">
                    {item.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button 
            onClick={handleContactClick}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors cursor-pointer"
          >
            Get in touch with our team
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;

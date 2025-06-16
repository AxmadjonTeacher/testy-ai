
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileUp, Settings, Shuffle, Download } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: "01",
      icon: <FileUp size={24} />,
      title: "Upload Your Content",
      description: "Upload thousands of test questions and exercises for all grammar topics in Excel or CSV format. Our system intelligently organizes them by subject and difficulty.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      number: "02", 
      icon: <Settings size={24} />,
      title: "Customize Your Test",
      description: "Choose specific topics, set the number of questions, select teacher's name, grade level, and English proficiency level to match your curriculum requirements.",
      color: "from-purple-500 to-pink-500"
    },
    {
      number: "03",
      icon: <Shuffle size={24} />,
      title: "AI Generates Unique Tests",
      description: "Our advanced AI algorithm intelligently selects and combines questions to create a completely unique test that maintains educational quality and coherence.",
      color: "from-green-500 to-teal-500"
    },
    {
      number: "04",
      icon: <Download size={24} />,
      title: "Download & Use",
      description: "Get your professionally formatted test in DOCX format, ready to print or share digitally with your students. No additional formatting required.",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-4 py-2 bg-purple-100 rounded-full text-sm font-medium text-purple-600 mb-4">
            Our Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            How It Works: Simple Steps to Success
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From upload to download in just four easy steps. Our streamlined process ensures you get professional results every time.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-200 to-transparent transform -translate-y-1/2"></div>
          
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
            viewport={{ once: true }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative z-10">
                  {/* Step number */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg mb-6 shadow-lg`}>
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="text-blue-600 mb-4">
                    {step.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-2 transform -translate-y-1/2 z-20">
                    <div className="bg-white rounded-full p-2 shadow-md border border-gray-200">
                      <ArrowRight size={16} className="text-blue-600" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

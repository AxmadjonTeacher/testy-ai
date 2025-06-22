
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
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Enhanced background with morphing blobs */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20"></div>
      
      {/* Morphing decorative elements */}
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"
        animate={{
          borderRadius: ["50%", "30% 70% 60% 40%", "40% 60% 70% 30%", "50%"],
          scale: [1, 1.2, 0.8, 1],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-2xl"
        animate={{
          borderRadius: ["50%", "60% 40% 30% 70%", "70% 30% 40% 60%", "50%"],
          scale: [1, 0.7, 1.3, 1],
          x: [0, 20, -20, 0],
          y: [0, -15, 15, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Additional floating elements */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl"
        animate={{
          y: [0, -30, 30, 0],
          x: [0, 20, -20, 0],
          scale: [1, 1.3, 0.7, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

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
            Our Process
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-6">
            How It Works: Simple Steps to Success
          </h2>
          <p className="text-lg text-neutral-dark/70 max-w-2xl mx-auto">
            From upload to download in just four easy steps. Our streamlined process ensures you get professional results every time.
          </p>
        </motion.div>

        <div className="relative">
          {/* Animated connection line */}
          <motion.div 
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent transform -translate-y-1/2"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            viewport={{ once: true }}
          />
          
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
                className="relative h-full" // Added h-full to make container full height
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10, 
                  transition: { duration: 0.3 },
                  scale: 1.02
                }}
              >
                <motion.div 
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative z-10 h-full flex flex-col" // Added h-full and flex flex-col
                  whileHover={{
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                >
                  {/* Enhanced step number with glow effect */}
                  <motion.div 
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg mb-6 shadow-lg relative`}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent"
                      animate={{
                        opacity: [0, 0.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                    />
                    {step.number}
                  </motion.div>
                  
                  {/* Animated icon */}
                  <motion.div 
                    className="text-primary mb-4"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {step.icon}
                  </motion.div>
                  
                  <motion.h3 
                    className="text-xl font-bold text-neutral-dark mb-4"
                    whileHover={{ color: "#009688" }}
                    transition={{ duration: 0.2 }}
                  >
                    {step.title}
                  </motion.h3>
                  
                  <div className="flex-grow"> {/* Added flex-grow to push content to fill available space */}
                    <p className="text-neutral-dark/70 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Subtle glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                
                {/* Enhanced arrow with pulse animation */}
                {index < steps.length - 1 && (
                  <motion.div 
                    className="hidden lg:flex absolute top-1/2 -right-2 transform -translate-y-1/2 z-20"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.2 + 0.5 }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="bg-white rounded-full p-2 shadow-md border border-gray-200"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                    >
                      <ArrowRight size={16} className="text-primary" />
                    </motion.div>
                  </motion.div>
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

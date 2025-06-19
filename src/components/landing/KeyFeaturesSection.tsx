
import React from 'react';
import { motion } from 'framer-motion';
import { Shuffle, Upload, Settings, Zap, Shield, Clock } from 'lucide-react';

const KeyFeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Shuffle size={28} />,
      title: "Intelligent Question Shuffling",
      description: "Our AI automatically combines and randomizes questions from your uploaded content, ensuring every test is unique and prevents memorization.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Upload size={28} />,
      title: "Seamless Content Upload",
      description: "Upload your existing tests in Excel or CSV format. Our smart parsing technology organizes questions by topic and difficulty automatically.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Settings size={28} />,
      title: "Advanced Customization",
      description: "Fine-tune every aspect: select topics, set question counts, choose difficulty levels, and customize teacher information to match your needs.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Zap size={28} />,
      title: "Lightning Fast Generation",
      description: "Generate professional tests in seconds, not hours. Our optimized AI processes your requirements instantly.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Shield size={28} />,
      title: "Quality Assurance",
      description: "Built-in validation ensures grammatical accuracy and appropriate difficulty progression in every generated test.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: <Clock size={28} />,
      title: "Time-Saving Workflow",
      description: "Reduce test preparation time by 90%. Focus on teaching while our AI handles the repetitive task of test creation.",
      color: "from-teal-500 to-cyan-500"
    }
  ];

  // Duplicate features for seamless infinite scroll
  const duplicatedFeatures = [...features, ...features];

  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden">
      {/* Enhanced Liquid Animation Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          {/* Main liquid blobs */}
          <motion.div
            className="absolute w-96 h-96 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, -50, 80, 0],
              y: [0, -80, 50, -30, 0],
              scale: [1, 1.2, 0.8, 1.1, 1],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ top: '10%', left: '10%' }}
          />
          <motion.div
            className="absolute w-80 h-80 bg-gradient-to-r from-secondary/30 to-primary/30 rounded-full blur-2xl"
            animate={{
              x: [0, -120, 80, -60, 0],
              y: [0, 90, -40, 70, 0],
              scale: [1, 0.7, 1.3, 0.9, 1],
              rotate: [360, 270, 180, 90, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            style={{ top: '60%', right: '15%' }}
          />
          <motion.div
            className="absolute w-72 h-72 bg-gradient-to-r from-accent/25 to-secondary/25 rounded-full blur-3xl"
            animate={{
              x: [0, 150, -100, 120, 0],
              y: [0, -60, 120, -40, 0],
              scale: [1, 1.4, 0.6, 1.2, 1],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
            style={{ bottom: '20%', left: '40%' }}
          />
          <motion.div
            className="absolute w-64 h-64 bg-gradient-to-r from-primary/15 to-secondary/15 rounded-full blur-2xl"
            animate={{
              x: [0, -80, 60, -40, 0],
              y: [0, 100, -80, 50, 0],
              scale: [1, 0.9, 1.1, 0.8, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            style={{ top: '30%', right: '30%' }}
          />
          
          {/* Additional smaller floating elements */}
          <motion.div
            className="absolute w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -40, 30, 0],
              scale: [1, 1.3, 0.7, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 6
            }}
            style={{ top: '80%', left: '20%' }}
          />
          <motion.div
            className="absolute w-40 h-40 bg-gradient-to-r from-green-400/15 to-teal-400/15 rounded-full blur-2xl"
            animate={{
              x: [0, -60, 40, 0],
              y: [0, 80, -50, 0],
              scale: [1, 0.8, 1.2, 1],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 8
            }}
            style={{ top: '5%', right: '5%' }}
          />
        </div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Why Choose Our Platform
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-6">
            Powerful Features for Modern Educators
          </h2>
          <p className="text-lg text-neutral-dark/70 max-w-2xl mx-auto">
            Everything you need to create engaging, unique tests that challenge your students and streamline your workflow.
          </p>
        </motion.div>
        
        {/* Fixed animated icons and titles container */}
        <div className="relative overflow-hidden mb-8 py-4">
          <motion.div 
            className="flex gap-12 px-6"
            animate={{
              x: [0, -(320) * features.length] // Increased width to 320px per item for better spacing
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: features.length * 4,
                ease: "linear",
              },
            }}
          >
            {duplicatedFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-80 text-center px-4" // Increased width and added padding
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${feature.color} p-5 mb-4 text-white shadow-lg mx-auto flex items-center justify-center`} // Increased size and added flex centering
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {React.cloneElement(feature.icon, { size: 32 })} {/* Increased icon size */}
                </motion.div>
                <motion.h3 
                  className="text-lg font-bold text-neutral-dark px-2" // Added horizontal padding
                  whileHover={{ color: "#009688" }}
                  transition={{ duration: 0.2 }}
                >
                  {feature.title}
                </motion.h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default KeyFeaturesSection;

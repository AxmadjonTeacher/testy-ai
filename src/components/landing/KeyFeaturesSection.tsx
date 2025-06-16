
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
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            Why Choose Our Platform
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-6">
            Powerful Features for Modern Educators
          </h2>
          <p className="text-lg text-neutral-dark/70 max-w-2xl mx-auto">
            Everything you need to create engaging, unique tests that challenge your students and streamline your workflow.
          </p>
        </motion.div>
        
        {/* Animated sliding container */}
        <div className="relative overflow-hidden">
          <motion.div 
            className="flex gap-8"
            animate={{
              x: [0, -100 * features.length]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {duplicatedFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative flex-shrink-0 w-80"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index % features.length) * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} p-4 mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-dark mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-dark/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default KeyFeaturesSection;

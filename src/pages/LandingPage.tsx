import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap, Layers, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import LandingHeader from '@/components/landing/LandingHeader';
import Footer from '@/components/Footer';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "GENERATE TESTS EASILY",
      description: "Leverage AI assistance and multiple question types to create diverse tests in a fraction of the time."
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "MANAGE YOUR QUESTIONS",
      description: "Easily organize, review, and maintain a comprehensive and searchable library for all your subjects."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "TRACK STUDENT PROGRESS",
      description: "Get instant insights with automated grading, detailed analytics, and performance tracking for every student."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 max-w-6xl">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            STREAMLINE YOUR<br />TEST CREATION
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            The smartest way to build assessments. Our app saves teachers time and effort, allowing you to focus on what matters most.
          </p>
          <Button 
            onClick={() => navigate('/generate')}
            className="h-14 px-8 text-lg font-bold bg-accent text-accent-foreground border-4 border-foreground neo-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            GET STARTED FOR FREE
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            POWERFUL FEATURES BUILT FOR<br />EDUCATORS
          </h2>
          <p className="text-lg">
            Everything you need to create, manage, and analyze tests efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border-4 border-foreground p-8 neo-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              <div className="mb-4 text-accent">
                {feature.icon}
              </div>
              <h3 className="text-xl font-black mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="container mx-auto px-4 py-20 max-w-6xl">
        <motion.div 
          className="bg-secondary border-4 border-foreground p-12 neo-shadow-lg text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-black mb-4">
            "THIS APP HAS COMPLETELY TRANSFORMED MY WORKFLOW. I'M SAVING HOURS EVERY WEEK ON TEST PREPARATION."
          </h3>
          <p className="text-sm font-medium">
            - Sarah Teacher, IELTS Instructor at Midtown School
          </p>
        </motion.div>
      </section>

      {/* Final CTA Section */}
      <section className="container mx-auto px-4 py-20 max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-8">
            READY TO RECLAIM YOUR TIME?
          </h2>
          <Button 
            onClick={() => navigate('/generate')}
            className="h-14 px-8 text-lg font-bold bg-accent text-accent-foreground border-4 border-foreground neo-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            CREATE YOUR FIRST TEST
          </Button>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
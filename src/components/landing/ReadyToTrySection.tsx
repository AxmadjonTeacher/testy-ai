
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ReadyToTrySection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 bg-neutral-light px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div 
          className="text-center" 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 0.8 }} 
          viewport={{ once: true }}
        >
          <p className="text-xl font-medium text-neutral-dark mb-6">
            Ready to try?
          </p>
          <Button 
            className="bg-primary hover:bg-primary/90 text-white hover:scale-105 transition-transform" 
            onClick={() => navigate('/generate')}
          >
            Generate
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ReadyToTrySection;

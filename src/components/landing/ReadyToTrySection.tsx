import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
const ReadyToTrySection: React.FC = () => {
  const navigate = useNavigate();
  const {
    t
  } = useTranslation();
  const scrollToAdminRequest = () => {
    const element = document.getElementById('admin-request');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section className="py-20 px-4 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent"></div>
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-8 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div className="text-center" initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} viewport={{
        once: true
      }}>
          <motion.div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white mb-6" initial={{
          opacity: 0,
          scale: 0.9
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} viewport={{
          once: true
        }}>
            <Sparkles size={16} />
            {t('cta.transformTeaching')}
          </motion.div>

          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.3
        }} viewport={{
          once: true
        }}>
            {t('cta.title')}
          </motion.h2>

          <motion.p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }} viewport={{
          once: true
        }}>
            {t('cta.subtitle')}
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row justify-center gap-4" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.5
        }} viewport={{
          once: true
        }}>
            <Button size="lg" onClick={() => navigate('/generate')} className="bg-white text-primary hover:bg-white/90 text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold mx-[11px] px-[44px] py-[18px] my-0">
              <span className="flex items-center gap-2">
                {t('cta.startGenerating')}
                <ArrowRight size={20} />
              </span>
            </Button>
            
            
          </motion.div>

          {/* Trust indicators */}
          <motion.div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-8 text-white/80" initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} transition={{
          duration: 0.8,
          delay: 0.6
        }} viewport={{
          once: true
        }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-sm">{t('cta.trustIndicators.noCard')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-sm">{t('cta.trustIndicators.quickSetup')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-sm">{t('cta.trustIndicators.cancelAnytime')}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>;
};
export default ReadyToTrySection;
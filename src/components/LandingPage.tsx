
import React from 'react';
import HeroSection from '@/components/landing/HeroSection';
import KeyFeaturesSection from '@/components/landing/KeyFeaturesSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import FAQSection from '@/components/landing/FAQSection';
import ReadyToTrySection from '@/components/landing/ReadyToTrySection';
import AdminRequestForm from '@/components/AdminRequestForm';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <KeyFeaturesSection />
      <HowItWorksSection />
      <FAQSection />
      <ReadyToTrySection />
      <AdminRequestForm />
    </div>
  );
};

export default LandingPage;

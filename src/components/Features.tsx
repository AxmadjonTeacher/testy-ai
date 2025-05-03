
import React from 'react';
import FeatureCard from './FeatureCard';
import { Button } from '@/components/ui/button';
import { Check, FileUp, Mix, Download, FolderOpen } from './Icons';

const Features: React.FC = () => {
  return (
    <div className="py-16 bg-neutral-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-dark">How It Works</h2>
          <p className="mt-4 text-lg text-neutral-dark/80 max-w-2xl mx-auto">
            Our AI-powered system makes test creation simple and efficient. Follow these steps to generate unique tests for your students.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<FileUp size={24} />}
            title="1. Upload Sample Tests"
            description="Upload 4 sample tests for each topic and level. Our system accepts DOCX and PDF formats."
            action={<Button variant="link" className="text-primary p-0">Learn how to format tests</Button>}
          />
          
          <FeatureCard 
            icon={<FolderOpen size={24} />}
            title="2. Organize by Level & Topic"
            description="Neatly organize tests by level (0-4, IELTS), topic, teacher name, and date for easy access."
          />
          
          <FeatureCard 
            icon={<Mix size={24} />}
            title="3. Generate New Tests"
            description="Our AI algorithm combines questions from your sample tests to create unique new tests."
          />
          
          <FeatureCard 
            icon={<Check size={24} />}
            title="4. Preview Generated Tests"
            description="Review the generated test online before finalizing to ensure quality and relevance."
          />
          
          <FeatureCard 
            icon={<Download size={24} />}
            title="5. Download Ready-to-Use Tests"
            description="Download the generated tests as DOCX or PDF with preserved formatting and layout."
          />
        </div>
      </div>
    </div>
  );
};

export default Features;

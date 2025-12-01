
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTestGeneration } from '@/hooks/useTestGeneration';
import TestGenerationForm from '@/components/generate/TestGenerationForm';
import Header from '@/components/Header';

const GeneratePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isGenerating, generateTest } = useTestGeneration();

  const handleGenerate = async (testParams: any) => {
    const success = await generateTest(testParams);
    if (success) {
      navigate('/dashboard');
    }
    return success;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="border-4 border-foreground p-8 md:p-12 bg-card neo-shadow">
          <TestGenerationForm 
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        </div>
      </main>
    </div>
  );
};

export default GeneratePage;

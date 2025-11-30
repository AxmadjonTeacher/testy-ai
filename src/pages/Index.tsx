import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTestGeneration } from '@/hooks/useTestGeneration';
import TestGenerationForm from '@/components/generate/TestGenerationForm';

const Index = () => {
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

  const handleMyTests = () => {
    if (!user) {
      navigate('/auth', { state: { from: '/dashboard' } });
      return;
    }
    navigate('/dashboard');
  };

  const handleAdminUpload = () => {
    navigate('/auth', { state: { from: '/admin/upload' } });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-4 border-foreground bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
          <Button 
            variant="outline" 
            onClick={handleMyTests}
            className="h-12 text-base font-black bg-card"
          >
            My Tests
          </Button>
          
          <Button 
            variant="outline" 
            className="h-12 text-xl font-black bg-[#d4ff00] text-black border-4 border-black absolute left-1/2 transform -translate-x-1/2 px-8 hover:bg-[#c5f000] pointer-events-none"
          >
            TESTY
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleAdminUpload}
            className="h-12 text-base font-black bg-card"
          >
            Admin upload
          </Button>
        </div>
      </header>

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

export default Index;

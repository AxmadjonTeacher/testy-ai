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
            className="px-6 h-12 border-4 border-foreground text-base font-bold neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-neo-sm transition-all"
          >
            My Tests
          </Button>
          
          <h1 className="text-3xl font-black">Testy</h1>
          
          <Button 
            variant="outline" 
            onClick={handleAdminUpload}
            className="px-6 h-12 border-4 border-foreground text-base font-bold neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-neo-sm transition-all"
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

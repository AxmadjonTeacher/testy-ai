import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTestGeneration } from '@/hooks/useTestGeneration';
import TestGenerationForm from '@/components/generate/TestGenerationForm';
import { useAdminCheck } from '@/hooks/useAdminCheck';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin } = useAdminCheck();
  const { isGenerating, generateTest } = useTestGeneration();

  const handleGenerate = async (testParams: any) => {
    if (!user) {
      navigate('/auth', { state: { from: '/' } });
      return false;
    }
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
    if (!user) {
      navigate('/auth', { state: { from: '/admin/upload' } });
      return;
    }
    if (!isAdmin) {
      return;
    }
    navigate('/admin/upload');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-2 border-border">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between max-w-6xl">
          <Button 
            variant="outline" 
            onClick={handleMyTests}
            className="rounded-full px-8 h-12 border-2 text-base"
          >
            My Tests
          </Button>
          
          <h1 className="text-3xl font-bold">Testy</h1>
          
          {isAdmin ? (
            <Button 
              variant="outline" 
              onClick={handleAdminUpload}
              className="rounded-full px-8 h-12 border-2 text-base"
            >
              Admin upload
            </Button>
          ) : (
            <div className="w-40" />
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="border-2 border-border rounded-3xl p-8 md:p-12 bg-card">
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

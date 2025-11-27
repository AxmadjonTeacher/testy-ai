import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import TestList from '@/components/dashboard/TestList';
import LoadingState from '@/components/dashboard/LoadingState';
import SignInRequired from '@/components/dashboard/SignInRequired';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const { data: tests, isLoading } = useQuery({
    queryKey: ['generated-tests', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('generated_tests')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  if (authLoading) {
    return <LoadingState />;
  }

  if (!user) {
    return <SignInRequired />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-4 border-foreground bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
          <h1 className="text-3xl font-black">My Tests</h1>
          
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="px-6 h-12 border-4 border-foreground text-base font-bold neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-neo-sm transition-all flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="border-4 border-foreground p-8 bg-card neo-shadow">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-foreground mx-auto"></div>
              <p className="mt-4 font-bold">Loading...</p>
            </div>
          ) : tests && tests.length > 0 ? (
            <TestList tests={tests} />
          ) : (
            <div className="text-center py-12">
              <p className="text-xl font-bold text-muted-foreground">No tests generated yet</p>
              <p className="text-muted-foreground mt-2">Generate your first test to get started!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;

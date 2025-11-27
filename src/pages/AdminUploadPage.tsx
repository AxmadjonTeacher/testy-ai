
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import AdminUpload from '@/components/AdminUpload';

const AdminUploadPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/auth', { state: { from: '/admin/upload' } });
      } else if (user.email === 'ahmetyadgarovjust@gmail.com') {
        setHasAccess(true);
      } else {
        setHasAccess(false);
      }
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-foreground mx-auto"></div>
          <p className="mt-4 font-bold">Loading...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="border-4 border-foreground p-8 bg-card neo-shadow text-center space-y-6">
            <h1 className="text-2xl font-black">Access Denied</h1>
            <p className="text-lg font-bold">
              You need a specific passcode to be eligible to access this page!
            </p>
            <p className="text-base font-bold">
              Help Contact:{' '}
              <a 
                href="https://t.me/YodgorovAxmadjon" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                t.me/YodgorovAxmadjon
              </a>
            </p>
            <Button
              onClick={() => navigate('/')}
              className="w-full h-12 text-base font-bold border-4 border-foreground neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-neo-sm transition-all"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b-4 border-foreground bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
          <h1 className="text-3xl font-black">Admin upload</h1>
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

      <div className="container mx-auto px-4 py-8">
        <div className="border-4 border-foreground p-8 bg-card neo-shadow">
          <AdminUpload />
        </div>
      </div>
    </div>
  );
};

export default AdminUploadPage;

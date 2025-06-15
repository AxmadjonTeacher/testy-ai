
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminUpload from '@/components/AdminUpload';
import LiquidBackground from '@/components/LiquidBackground';
import { useAdminAccess } from '@/hooks/useAdminAccess';
import { Button } from '@/components/ui/button';
import { Shield, ArrowLeft } from 'lucide-react';

const AdminUploadPage = () => {
  const { isVerifying, hasAccess, redirectToHome } = useAdminAccess();

  return (
    <div className="min-h-screen flex flex-col relative">
      <LiquidBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <div className="flex-1">
          {isVerifying ? (
            <div className="container mx-auto px-4 py-8 flex justify-center items-center h-full">
              <div className="text-center glass-card p-8 rounded-2xl">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-foreground">Verifying admin access...</p>
              </div>
            </div>
          ) : hasAccess ? (
            <AdminUpload />
          ) : (
            <div className="container mx-auto px-4 py-8 flex justify-center items-center h-full">
              <div className="text-center max-w-md glass-card p-8 rounded-2xl">
                <Shield className="h-16 w-16 text-red-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-4">Access Denied</h2>
                <p className="text-muted-foreground mb-6">
                  You need admin privileges to access this page. Please contact an administrator if you believe this is an error.
                </p>
                <Button onClick={redirectToHome} className="flex items-center gap-2 liquid-button">
                  <ArrowLeft className="h-4 w-4" />
                  Return to Home
                </Button>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AdminUploadPage;

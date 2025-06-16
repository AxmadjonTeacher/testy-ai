
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminUpload from '@/components/AdminUpload';
import { useAdminAccess } from '@/hooks/useAdminAccess';
import { Button } from '@/components/ui/button';
import { Shield, ArrowLeft } from 'lucide-react';

const AdminUploadPage = () => {
  const { isVerifying, hasAccess, redirectToHome } = useAdminAccess();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-neutral-light">
        {isVerifying ? (
          <div className="container mx-auto px-4 py-8 flex justify-center items-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-neutral-dark">Verifying admin access...</p>
            </div>
          </div>
        ) : hasAccess ? (
          <AdminUpload />
        ) : (
          <div className="container mx-auto px-4 py-8 flex justify-center items-center h-full">
            <div className="text-center max-w-md">
              <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">Access Denied</h2>
              <p className="text-neutral-dark mb-6">
                You need admin privileges to access this page. Please contact an administrator if you believe this is an error.
              </p>
              <Button onClick={redirectToHome} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Return to Home
              </Button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminUploadPage;

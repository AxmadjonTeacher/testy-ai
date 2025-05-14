
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminUpload from '@/components/AdminUpload';
import { useAdminAccess } from '@/hooks/useAdminAccess';
import AdminAccessDialog from '@/components/admin/AdminAccessDialog';
import { Button } from '@/components/ui/button';

const AdminUploadPage = () => {
  const { 
    isVerifying, 
    showPasswordDialog, 
    hasAccess, 
    verifyPassword, 
    cancelVerification, 
    setShowPasswordDialog 
  } = useAdminAccess();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-neutral-light">
        {isVerifying ? (
          <div className="container mx-auto px-4 py-8 flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : hasAccess ? (
          <AdminUpload />
        ) : (
          <div className="container mx-auto px-4 py-8 flex justify-center items-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">Admin Authentication Required</h2>
              <p className="text-neutral-dark mb-4">You need to verify your admin credentials to access this page.</p>
              <Button onClick={() => setShowPasswordDialog(true)}>Enter Admin Password</Button>
            </div>
          </div>
        )}
      </div>
      <Footer />
      
      <AdminAccessDialog 
        open={showPasswordDialog}
        onOpenChange={setShowPasswordDialog}
        onVerify={verifyPassword}
        onCancel={cancelVerification}
      />
    </div>
  );
};

export default AdminUploadPage;

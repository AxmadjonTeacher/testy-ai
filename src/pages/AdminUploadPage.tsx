
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminUpload from '@/components/AdminUpload';
import { useAdminAccess } from '@/hooks/useAdminAccess';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AdminUploadPage = () => {
  const { isVerifying, hasAccess } = useAdminAccess();
  const { user } = useAuth();
  const navigate = useNavigate();

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
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">Admin Access Required</h2>
              {!user ? (
                <>
                  <p className="text-neutral-dark mb-4">You need to sign in to access this page.</p>
                  <Button onClick={() => navigate('/auth')}>Sign In</Button>
                </>
              ) : (
                <>
                  <p className="text-neutral-dark mb-4">You do not have admin privileges to access this page.</p>
                  <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminUploadPage;

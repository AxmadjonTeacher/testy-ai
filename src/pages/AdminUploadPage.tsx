
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminUpload from '@/components/AdminUpload';

const AdminUploadPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-neutral-light">
        <AdminUpload />
      </div>
      <Footer />
    </div>
  );
};

export default AdminUploadPage;


import React from 'react';
import AdminUploadTabs from './admin/AdminUploadTabs';

const AdminUpload = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-neutral-dark mb-6">Admin Upload Portal</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <AdminUploadTabs />
      </div>
    </div>
  );
};

export default AdminUpload;

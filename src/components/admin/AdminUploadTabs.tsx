
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminUploadForm from './AdminUploadForm';
import AdminUploadHistory from './AdminUploadHistory';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import { useUploadHistory } from '@/hooks/useUploadHistory';
import { useQuestionDelete } from '@/hooks/useQuestionDelete';
import { useQuestionEdit } from '@/hooks/useQuestionEdit';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminVerificationDialog from './AdminVerificationDialog';
import { toast } from 'sonner';

const AdminUploadTabs = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [isAdminVerificationOpen, setIsAdminVerificationOpen] = useState(false);
  const { isAdmin, setIsAdmin } = useAdminCheck();
  
  const { 
    uploadedFiles, 
    fetchUploadHistory, 
    addUploadToHistory 
  } = useUploadHistory();
  
  const {
    deleteItemId,
    isDeleteDialogOpen,
    isDeleting,
    handleDeleteItem,
    confirmDelete,
    setIsDeleteDialogOpen
  } = useQuestionDelete();
  
  const {
    editItemId,
    editData,
    handleEditItem,
    handleEditComplete
  } = useQuestionEdit();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'history') {
      fetchUploadHistory();
    }
  };

  // Updated to ensure proper refresh after delete
  const handleDeleteConfirm = async () => {
    await confirmDelete(() => {
      console.log("Delete confirmed, refreshing history");
      fetchUploadHistory();
    });
  };

  const handleUploadComplete = () => {
    fetchUploadHistory();
    setActiveTab("history");
  };

  const handleAdminVerification = (password: string) => {
    // This function is now just for backwards compatibility
    // Real admin verification is handled by the role-based system
    toast.info("Admin access is now managed through user roles. Contact your administrator to get admin privileges.");
    setIsAdminVerificationOpen(false);
  };

  // Initial load of history data
  useEffect(() => {
    if (activeTab === 'history') {
      fetchUploadHistory();
    }
  }, [activeTab, fetchUploadHistory]);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Tabs value={activeTab} className="w-full" onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="upload">{editItemId ? "Edit Questions" : "Upload Questions"}</TabsTrigger>
            <TabsTrigger value="history">Upload History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <AdminUploadForm 
              addUploadToHistory={addUploadToHistory} 
              isEditMode={!!editItemId}
              editData={editData}
              onEditComplete={handleEditComplete}
              onUploadComplete={handleUploadComplete}
            />
          </TabsContent>
          
          <TabsContent value="history">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Upload History</h3>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => setIsAdminVerificationOpen(true)}
              >
                <Shield className="h-4 w-4" />
                {isAdmin ? "Admin" : "Admin Access"}
              </Button>
            </div>
            <AdminUploadHistory 
              uploadedFiles={uploadedFiles} 
              onDeleteItem={handleDeleteItem}
              isAdmin={isAdmin}
            />
          </TabsContent>
        </Tabs>
      </div>

      <DeleteConfirmationDialog 
        open={isDeleteDialogOpen} 
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />

      <AdminVerificationDialog
        open={isAdminVerificationOpen}
        onOpenChange={setIsAdminVerificationOpen}
        onVerify={handleAdminVerification}
      />
    </>
  );
};

export default AdminUploadTabs;

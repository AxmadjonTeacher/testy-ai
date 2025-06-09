
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
import { toast } from 'sonner';
import { verifyAdminRole } from '@/services/authService';

const AdminUploadTabs = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const { isAdmin, setIsAdmin, checkingAdmin } = useAdminCheck();
  
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

  const handleAdminVerification = async () => {
    const hasAdminRole = await verifyAdminRole();
    if (hasAdminRole) {
      setIsAdmin(true);
      toast.success("Admin privileges verified");
    } else {
      toast.error("You do not have admin privileges");
    }
  };

  useEffect(() => {
    if (activeTab === 'history') {
      fetchUploadHistory();
    }
  }, [activeTab, fetchUploadHistory]);

  if (checkingAdmin) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

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
                onClick={handleAdminVerification}
              >
                <Shield className="h-4 w-4" />
                {isAdmin ? "Admin Verified" : "Verify Admin"}
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
    </>
  );
};

export default AdminUploadTabs;


import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminUploadForm from './AdminUploadForm';
import AdminUploadHistory from './AdminUploadHistory';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import { useUploadHistory } from '@/hooks/useUploadHistory';
import { useQuestionDelete } from '@/hooks/useQuestionDelete';
import { useQuestionEdit } from '@/hooks/useQuestionEdit';

const AdminUploadTabs = () => {
  const [activeTab, setActiveTab] = useState("upload");
  
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

  const handleDeleteConfirm = () => {
    confirmDelete(fetchUploadHistory);
  };

  const handleUploadComplete = () => {
    fetchUploadHistory();  // Refresh history after successful upload
    setActiveTab("history"); // Switch to history tab
  };

  // Initial load of history data
  useEffect(() => {
    if (activeTab === 'history') {
      fetchUploadHistory();
    }
  }, [activeTab, fetchUploadHistory]);

  return (
    <>
      <Tabs value={activeTab} className="w-full" onValueChange={handleTabChange}>
        <TabsList className="mb-4">
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
          <AdminUploadHistory 
            uploadedFiles={uploadedFiles} 
            onDeleteItem={handleDeleteItem}
            onEditItem={handleEditItem}
          />
        </TabsContent>
      </Tabs>

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

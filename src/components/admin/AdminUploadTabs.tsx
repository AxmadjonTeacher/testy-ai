import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminUploadForm from './AdminUploadForm';
import AdminUploadHistory from './AdminUploadHistory';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";

const AdminUploadTabs = () => {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("upload");
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any | null>(null);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'history') {
      fetchUploadHistory();
    }
  };

  // Load upload history
  const fetchUploadHistory = async () => {
    try {
      const { data, error } = await supabase
        .from("questions")
        .select("level, topic, created_at")
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Group by level, topic and date (same day)
      const groupedData = data.reduce((acc: any, item) => {
        const date = new Date(item.created_at).toLocaleDateString();
        const key = `${item.level}-${item.topic}-${date}`;
        
        if (!acc[key]) {
          acc[key] = {
            id: key,
            level: item.level,
            topic: item.topic,
            date,
            questionCount: 0,
            filename: `${item.topic}_questions.xlsx`
          };
        }
        
        acc[key].questionCount++;
        return acc;
      }, {});
      
      setUploadedFiles(Object.values(groupedData));
    } catch (error) {
      console.error("Error fetching upload history:", error);
    }
  };

  // We're keeping the editItem functionality in the code even though
  // we've removed the edit button from the UI. This allows for
  // future reintroduction of the feature if needed.
  const handleEditItem = async (itemId: string) => {
    try {
      // Parse the composite id to get level, topic, and date
      const [level, topic, date] = itemId.split('-');
      
      // Fetch questions for editing
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("level", level)
        .eq("topic", topic);
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        setEditData({
          level,
          topic,
          questions: data
        });
        
        setEditItemId(itemId);
        setActiveTab("upload"); // Switch to upload tab for editing
        toast.info(`Loaded ${data.length} questions for editing`);
      } else {
        toast.error("No questions found for editing");
      }
    } catch (error) {
      console.error("Error loading questions for edit:", error);
      toast.error("Failed to load questions for editing");
    }
  };

  const handleDeleteItem = (itemId: string) => {
    setDeleteItemId(itemId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteItemId) return;

    try {
      // Parse the composite id to get level, topic
      const [level, topic, date] = deleteItemId.split('-');
      
      // Delete questions matching the level and topic
      const { error } = await supabase
        .from("questions")
        .delete()
        .eq("level", level)
        .eq("topic", topic);
        
      if (error) throw error;
      
      toast.success("Questions deleted successfully");
      
      // Remove the item from the local state
      setUploadedFiles(prev => prev.filter(item => item.id !== deleteItemId));
      setDeleteItemId(null);
    } catch (error) {
      console.error("Error deleting questions:", error);
      toast.error("Failed to delete questions");
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const addUploadToHistory = (newUpload: any) => {
    setUploadedFiles(prev => [newUpload, ...prev]);
  };

  const handleEditComplete = () => {
    setEditItemId(null);
    setEditData(null);
    toast.success("Questions updated successfully");
    fetchUploadHistory();
  };

  // Initial load of history data
  useEffect(() => {
    if (activeTab === 'history') {
      fetchUploadHistory();
    }
  }, [activeTab]);

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
          />
        </TabsContent>
        
        <TabsContent value="history">
          <AdminUploadHistory 
            uploadedFiles={uploadedFiles} 
            onDeleteItem={handleDeleteItem}
          />
        </TabsContent>
      </Tabs>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete these questions?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected questions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AdminUploadTabs;

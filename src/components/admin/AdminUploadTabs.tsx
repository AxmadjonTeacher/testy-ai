
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminUploadForm from './AdminUploadForm';
import AdminUploadHistory from './AdminUploadHistory';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminUploadTabs = () => {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("upload");
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any | null>(null);

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
          onEditItem={handleEditItem}
        />
      </TabsContent>
    </Tabs>
  );
};

export default AdminUploadTabs;

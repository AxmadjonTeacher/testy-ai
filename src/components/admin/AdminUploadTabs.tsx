import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminUploadForm from './AdminUploadForm';
import AdminUploadHistory from './AdminUploadHistory';
import { supabase } from "@/integrations/supabase/client";

const AdminUploadTabs = () => {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  const handleTabChange = (value: string) => {
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

  const addUploadToHistory = (newUpload: any) => {
    setUploadedFiles(prev => [newUpload, ...prev]);
  };

  return (
    <Tabs defaultValue="upload" className="w-full" onValueChange={handleTabChange}>
      <TabsList className="mb-4">
        <TabsTrigger value="upload">Upload Questions</TabsTrigger>
        <TabsTrigger value="history">Upload History</TabsTrigger>
      </TabsList>
      
      <TabsContent value="upload">
        <AdminUploadForm addUploadToHistory={addUploadToHistory} />
      </TabsContent>
      
      <TabsContent value="history">
        <AdminUploadHistory uploadedFiles={uploadedFiles} />
      </TabsContent>
    </Tabs>
  );
};

export default AdminUploadTabs;

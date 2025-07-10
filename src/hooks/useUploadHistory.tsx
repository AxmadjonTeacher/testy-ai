
import { useState, useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UploadHistoryItem {
  id: string;
  level: string;
  topic: string;
  date: string;
  questionCount: number;
  filename: string;
  subject: string;
}

export function useUploadHistory() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUploadHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("questions")
        .select("level, topic, created_at, subject")
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Group by subject, level, topic and date (same day)
      const groupedData = data.reduce((acc: any, item) => {
        const date = new Date(item.created_at).toLocaleDateString();
        const subject = item.subject || 'English';
        const key = `${subject}-${item.level}-${item.topic}-${date}`;
        
        if (!acc[key]) {
          acc[key] = {
            id: key,
            level: item.level,
            topic: item.topic,
            date,
            questionCount: 0,
            filename: `${item.topic}_questions.xlsx`,
            subject: subject
          };
        }
        
        acc[key].questionCount++;
        return acc;
      }, {});
      
      const result = Object.values(groupedData) as UploadHistoryItem[];
      setUploadedFiles(result);
    } catch (error) {
      console.error("Error fetching upload history:", error);
      toast.error("Failed to load upload history");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addUploadToHistory = useCallback((newUpload: UploadHistoryItem) => {
    setUploadedFiles(prev => [newUpload, ...prev]);
  }, []);

  return {
    uploadedFiles,
    isLoading,
    fetchUploadHistory,
    addUploadToHistory
  };
}

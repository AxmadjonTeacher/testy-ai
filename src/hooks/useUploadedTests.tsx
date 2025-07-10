
import { useState, useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UploadedTest {
  id: string;
  title?: string;
  subject: string;
  level?: string;
  grade: string;
  topics: string[];
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export function useUploadedTests() {
  const [uploadedTests, setUploadedTests] = useState<UploadedTest[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUploadedTests = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("uploaded_tests")
        .select("*")
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setUploadedTests(data || []);
    } catch (error) {
      console.error("Error fetching uploaded tests:", error);
      toast.error("Failed to load uploaded tests");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    uploadedTests,
    isLoading,
    fetchUploadedTests
  };
}

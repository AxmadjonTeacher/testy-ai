
import { useState, useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UploadedTest {
  id: string;
  title: string;
  level: string;
  grade: string;
  topics: string[];
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  created_at: string;
  updated_at: string;
}

export function useUploadedTests() {
  const [uploadedTests, setUploadedTests] = useState<UploadedTest[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUploadedTests = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log("Fetching uploaded tests");
      const { data, error } = await supabase
        .from("uploaded_tests")
        .select("*")
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      console.log("Fetched uploaded tests:", data);
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

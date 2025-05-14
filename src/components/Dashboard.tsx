
import React, { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { generateWordDocument, downloadDocument, TestExportData } from '@/services/documentExportService';
import type { Database } from "@/integrations/supabase/types";
import type { Question } from '@/services/documentTypes';

// Import new smaller components
import SignInRequired from './dashboard/SignInRequired';
import LoadingState from './dashboard/LoadingState';
import EmptyTestState from './dashboard/EmptyTestState';
import TestList from './dashboard/TestList';
import DashboardHeader from './dashboard/DashboardHeader';

type GeneratedTest = Database["public"]["Tables"]["generated_tests"]["Row"];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [tests, setTests] = useState<GeneratedTest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      fetchTests();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchTests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("generated_tests")
        .select("*")
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setTests(data || []);
    } catch (err) {
      console.error("Error fetching tests:", err);
      toast.error("Failed to load tests");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTest = async (id: string) => {
    try {
      toast.loading("Deleting test...");
      const { error } = await supabase
        .from("generated_tests")
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Update local state after successful deletion
      setTests(tests.filter(test => test.id !== id));
      toast.dismiss();
      toast.success("Test deleted successfully!");
    } catch (err) {
      toast.dismiss();
      console.error("Error deleting test:", err);
      toast.error("Failed to delete test");
    }
  };
  
  const handleDownloadTest = async (test: GeneratedTest) => {
    try {
      toast.loading("Preparing your document for download...");
      
      // Parse the questions_json and ensure it's properly typed
      const questionsData = test.questions_json as unknown;
      const questions = Array.isArray(questionsData) 
        ? questionsData as Question[]
        : [];
      
      // Extract grade from topics array if it exists
      const gradeFromTopics = test.topics?.find(topic => topic.startsWith('Grade'))?.replace('Grade ', '') || '';
      
      const docData: TestExportData = {
        title: test.name,
        teacher: test.teacher_name || "",
        level: test.level,
        grade: gradeFromTopics,  // Use the extracted grade or empty string
        questions: questions,
        includeAnswers: test.include_answers || true,
        dateGenerated: new Date(test.created_at).toLocaleDateString()
      };
      
      console.log(`Generating document with ${questions.length} questions`);
      
      const blob = await generateWordDocument(docData);
      downloadDocument(blob, `${test.name.toLowerCase().replace(/\s+/g, '_')}.docx`);
      toast.dismiss();
      toast.success("Test downloaded successfully!");
    } catch (error) {
      toast.dismiss();
      console.error("Error downloading test:", error);
      toast.error("Failed to download test");
    }
  };

  // Show login prompt if user is not authenticated
  if (!user) {
    return <SignInRequired />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader />
      
      {loading ? (
        <LoadingState />
      ) : tests.length === 0 ? (
        <EmptyTestState />
      ) : (
        <TestList 
          tests={tests}
          onDeleteTest={handleDeleteTest}
          onDownloadTest={handleDownloadTest}
        />
      )}
    </div>
  );
};

export default Dashboard;

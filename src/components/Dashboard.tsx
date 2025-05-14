
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Download, Trash, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { generateWordDocument, downloadDocument, TestExportData } from '@/services/documentExportService';
import type { Database } from "@/integrations/supabase/types";
import type { Question } from '@/services/documentTypes';

type GeneratedTest = Database["public"]["Tables"]["generated_tests"]["Row"];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
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
      // The data comes as Json type from database, so we need to cast it to Question[]
      const questionsData = test.questions_json as unknown;
      const questions = Array.isArray(questionsData) 
        ? questionsData as Question[]
        : [];
      
      const docData: TestExportData = {
        title: test.name,
        teacher: test.teacher_name || "",
        level: test.level,
        grade: test.grade || "",  // Make sure grade is properly handled
        questions: questions,
        includeAnswers: test.include_answers || true,
        dateGenerated: new Date(test.created_at).toLocaleDateString()
      };
      
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
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-neutral-dark mb-4">Sign In Required</h2>
          <p className="text-neutral-dark/70 mb-6">
            Please sign in to view your saved tests and generate new ones.
          </p>
          <Button 
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white"
            onClick={() => navigate('/auth')}
          >
            <LogIn className="h-4 w-4" />
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-neutral-dark">My Tests</h2>
        <Button 
          className="bg-primary hover:bg-primary/90 text-white"
          onClick={() => navigate('/generate')}
        >
          Generate New Test
        </Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <p>Loading tests...</p>
        </div>
      ) : tests.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl font-medium text-neutral-dark mb-6">
            You haven't generated any test yet!
          </p>
          <Button 
            className="bg-primary hover:bg-primary/90 text-white"
            onClick={() => navigate('/generate')}
          >
            Get Started
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {tests.map(test => (
            <div key={test.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-medium">{test.name}</h3>
                  <p className="text-neutral-dark/70">
                    Generated on: {new Date(test.created_at).toLocaleDateString()}
                  </p>
                  {test.teacher_name && (
                    <p className="text-neutral-dark/70">Teacher: {test.teacher_name}</p>
                  )}
                  <p className="text-neutral-dark/70">Questions: {test.question_count}</p>
                </div>
                <div className="flex flex-row space-x-3">
                  <Button
                    variant="destructive"
                    className="flex items-center gap-2"
                    onClick={() => handleDeleteTest(test.id)}
                  >
                    <Trash className="h-4 w-4" />
                    Delete
                  </Button>
                  <Button 
                    className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white"
                    onClick={() => handleDownloadTest(test)}
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

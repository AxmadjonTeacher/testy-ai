
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';
import { generateWordDocument, downloadDocument, TestExportData } from '@/services/documentExportService';
import type { Database } from "@/integrations/supabase/types";

type GeneratedTest = Database["public"]["Tables"]["generated_tests"]["Row"];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState<GeneratedTest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("generated_tests")
        .select("*")
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

  const handleEditTest = (id: string) => {
    navigate(`/generate?edit=${id}`);
  };
  
  const handleDownloadTest = async (test: GeneratedTest) => {
    try {
      toast.loading("Preparing your document for download...");
      
      const questions = Array.isArray(test.questions_json) 
        ? test.questions_json 
        : [];
      
      const docData: TestExportData = {
        title: test.name,
        teacher: test.teacher_name,
        level: test.level,
        grade: "",  // The grade information might be in the teacher_name, or we need to add it
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
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => handleEditTest(test.id)}
                  >
                    <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                    Edit
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

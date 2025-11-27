import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Download } from 'lucide-react';
import { format } from 'date-fns';
import { generateWordDocument, downloadDocument, TestExportData } from '@/services/documentExportService';
import type { Question } from '@/services/documentTypes';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface Test {
  id: string;
  name: string;
  subject: string;
  level: string;
  question_count: number;
  created_at: string;
  questions_json: any;
  teacher_name: string | null;
  include_answers: boolean | null;
  topics: string[] | null;
}

interface TestListProps {
  tests: Test[];
}

const TestList: React.FC<TestListProps> = ({ tests }) => {
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      toast.loading("Deleting test...");
      
      const { error } = await supabase
        .from('generated_tests')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.dismiss();
      toast.success("Test deleted successfully!");
      
      // Refresh the page to update the list
      window.location.reload();
    } catch (error) {
      toast.dismiss();
      console.error("Error deleting test:", error);
      toast.error("Failed to delete test");
    } finally {
      setDeletingId(null);
    }
  };

  const handleDownload = async (test: Test) => {
    try {
      toast.loading("Preparing your document for download...");
      
      const questionsData = test.questions_json as unknown;
      const questions = Array.isArray(questionsData) 
        ? questionsData as Question[]
        : [];
      
      const gradeFromTopics = test.topics?.find(topic => topic.startsWith('Grade'))?.replace('Grade ', '') || '';
      
      const docData: TestExportData = {
        title: test.name,
        teacher: test.teacher_name || "",
        subject: test.subject,
        level: test.level,
        grade: gradeFromTopics,
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
    <div className="space-y-4">
      {tests.map((test) => (
        <div
          key={test.id}
          className="border-4 border-foreground p-6 bg-card neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-neo-sm transition-all"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-1">
              <h3 className="text-lg font-black">{test.subject} level {test.level.replace('level', '')} test</h3>
              <p className="font-bold text-sm">
                Generated on: {format(new Date(test.created_at), 'dd/MM/yyyy')}
              </p>
              <p className="font-bold text-sm">Questions: {test.question_count}</p>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(test.id)}
                disabled={deletingId === test.id}
                className="border-4 border-foreground font-bold neo-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => handleDownload(test)}
                className="border-4 border-foreground font-bold neo-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestList;

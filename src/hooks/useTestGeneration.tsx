
import { useState } from 'react';
import { toast } from 'sonner';
import { fetchQuestions, saveGeneratedTest, TestParams } from '@/services/testGenerationService';
import type { Database } from "@/integrations/supabase/types";

type Question = Database["public"]["Tables"]["questions"]["Row"];

export interface GeneratedTestData {
  id: string;
  level: string;
  teacherName: string;
  grade: string;
  numQuestions: number;
  topics: string[];
  dateGenerated: string;
}

export const useTestGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTest, setGeneratedTest] = useState<GeneratedTestData | null>(null);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);

  const generateTest = async (testParams: TestParams) => {
    if (!testParams.level) {
      toast.error("Please select an English level");
      return false;
    }

    if (testParams.topics.length === 0) {
      toast.error("Please select at least one topic");
      return false;
    }

    setIsGenerating(true);
    
    try {
      // Fetch questions from Supabase
      const questions = await fetchQuestions(testParams);
      
      if (questions.length === 0) {
        toast.error("No questions found for the selected criteria");
        setIsGenerating(false);
        return false;
      }
      
      if (questions.length < testParams.numQuestions) {
        toast.warning(`Only ${questions.length} questions available with the selected criteria`);
      }
      
      // Save the generated test
      const testName = `English Level ${testParams.level} Test`;
      const testId = await saveGeneratedTest(testName, testParams, questions);
      
      setGeneratedQuestions(questions);
      
      // Set the generated test data for preview
      setGeneratedTest({
        id: testId,
        level: testParams.level,
        teacherName: testParams.teacherName || "Not specified",
        grade: testParams.grade || "Not specified",
        numQuestions: questions.length,
        topics: testParams.topics,
        dateGenerated: new Date().toLocaleDateString(),
      });
      
      toast.success("Test generated successfully!");
      return true;
    } catch (error) {
      console.error("Error generating test:", error);
      toast.error("Failed to generate test. Please try again.");
      return false;
    } finally {
      setIsGenerating(false);
    }
  };

  const resetForm = () => {
    setGeneratedTest(null);
    setGeneratedQuestions([]);
  };

  return {
    isGenerating,
    generatedTest,
    generatedQuestions,
    generateTest,
    resetForm
  };
};

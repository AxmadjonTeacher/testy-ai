
import React from 'react';
import TestPreview from './TestPreview';
import TestGenerationForm from './generate/TestGenerationForm';
import { generateWordDocument, downloadDocument } from '@/services/documentExportService';
import { useTestGeneration } from '@/hooks/useTestGeneration';
import { toast } from 'sonner';

const GenerateTest: React.FC = () => {
  const { 
    isGenerating, 
    generatedTest, 
    generatedQuestions, 
    generateTest, 
    resetForm 
  } = useTestGeneration();

  const handleDownload = async () => {
    try {
      if (!generatedTest) return;
      
      const docData = {
        title: `English Level ${generatedTest.level} Test`,
        teacher: generatedTest.teacherName || null,
        level: generatedTest.level,
        grade: generatedTest.grade || undefined,
        questions: generatedQuestions,
        includeAnswers: true,
        dateGenerated: new Date().toLocaleDateString()
      };
      
      const blob = await generateWordDocument(docData);
      downloadDocument(blob, `english_level_${generatedTest.level}_test.docx`);
      
      toast.success("Test downloaded successfully!");
    } catch (error) {
      console.error("Error downloading test:", error);
      toast.error("Failed to download test. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-neutral-dark mb-6">Generate a new test</h2>
      
      {!generatedTest ? (
        <TestGenerationForm
          onGenerate={generateTest}
          isGenerating={isGenerating}
        />
      ) : (
        <TestPreview 
          test={generatedTest} 
          questions={generatedQuestions}
          onBack={resetForm}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
};

export default GenerateTest;

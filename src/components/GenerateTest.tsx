
import React, { useEffect, useState } from 'react';
import TestPreview from './TestPreview';
import TestGenerationForm from './generate/TestGenerationForm';
import { generateWordDocument, downloadDocument } from '@/services/documentExportService';
import { useTestGeneration } from '@/hooks/useTestGeneration';
import { toast } from 'sonner';
import { useLocation, useNavigate } from 'react-router-dom';

const GenerateTest: React.FC = () => {
  const { 
    isGenerating, 
    generatedTest, 
    generatedQuestions, 
    generateTest, 
    resetForm 
  } = useTestGeneration();
  
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTestId, setEditTestId] = useState<string | null>(null);
  
  // Check if we're in edit mode by looking at URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const editId = searchParams.get('edit');
    
    if (editId) {
      setIsEditMode(true);
      setEditTestId(editId);
      // Here you would fetch the test data based on the ID
      // For now we'll just show a toast
      toast.info(`Loading test #${editId} for editing`);
      // In a real implementation you would load the test data
    } else {
      setIsEditMode(false);
      setEditTestId(null);
    }
  }, [location]);

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
      
      toast.info("Preparing your document for download...");
      const blob = await generateWordDocument(docData);
      downloadDocument(blob, `english_level_${generatedTest.level}_test.docx`);
      
      // Navigate back to dashboard after successful download
      toast.success("Test downloaded successfully!");
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      console.error("Error downloading test:", error);
      toast.error("Failed to download test. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-neutral-dark mb-6">
        {isEditMode ? "Edit test" : "Generate a new test"}
      </h2>
      
      {!generatedTest ? (
        <TestGenerationForm
          onGenerate={generateTest}
          isGenerating={isGenerating}
          isEditMode={isEditMode}
          editTestId={editTestId}
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

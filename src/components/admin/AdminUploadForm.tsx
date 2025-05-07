
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { formatQuestionsForDatabase } from '@/utils/adminUploadUtils';
import { QuestionFormData } from './QuestionForm';
import QuestionFormSection from './QuestionFormSection';

interface AdminUploadFormProps {
  addUploadToHistory: (newUpload: any) => void;
  isEditMode?: boolean;
  editData?: any;
  onEditComplete?: () => void;
  onUploadComplete?: () => void;
}

const AdminUploadForm: React.FC<AdminUploadFormProps> = ({ 
  addUploadToHistory, 
  isEditMode = false, 
  editData = null,
  onEditComplete,
  onUploadComplete
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [parsedData, setParsedData] = useState<QuestionFormData[] | null>(null);
  
  const onSubmit = async (data: { level: string; topic: string }) => {
    const { level, topic } = data;
    
    if (!level || !topic) {
      toast.error("Please select both level and topic");
      return;
    }
    
    if (!parsedData || parsedData.length === 0) {
      toast.error("Please upload and parse a file first");
      return;
    }
    
    setIsUploading(true);
    
    try {
      // File upload logic
      const formattedQuestions = formatQuestionsForDatabase(parsedData, level, topic);
      
      if (formattedQuestions && formattedQuestions.length > 0) {
        const { error } = await supabase.from("questions").insert(formattedQuestions);
        
        if (error) {
          console.error("Error detail:", error);
          throw error;
        }
        
        addUploadToHistory({
          id: `${level}-${topic}-${new Date().toLocaleDateString()}`,
          level,
          topic,
          date: new Date().toLocaleDateString(),
          questionCount: formattedQuestions.length,
          filename: `${topic}_questions.xlsx`
        });
        
        toast.success(`Successfully uploaded ${formattedQuestions.length} questions`);
        
        // Reset form state
        setParsedData(null);
      }
      
      // Call the onUploadComplete callback if provided
      if (onUploadComplete) {
        onUploadComplete();
      }
    } catch (error) {
      console.error("Error uploading questions:", error);
      toast.error("Failed to upload questions. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveQuestions = async (questions: QuestionFormData[]) => {
    if (!questions || questions.length === 0) {
      toast.error("No questions to save");
      return;
    }

    // Extract level and topic
    const { level, topic } = editData || {};
    
    if (!level || !topic) {
      toast.error("Please select both level and topic");
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Format the questions for the database
      const formattedQuestions = questions.map(q => ({
        ...q,
        level,
        topic
      }));
      
      // Insert the questions into the database
      const { error } = await supabase.from("questions").insert(formattedQuestions);
      
      if (error) {
        throw error;
      }
      
      addUploadToHistory({
        id: `${level}-${topic}-${new Date().toLocaleDateString()}`,
        level,
        topic,
        date: new Date().toLocaleDateString(),
        questionCount: formattedQuestions.length,
        filename: `${topic}_file_upload.xlsx` // Updated filename
      });
      
      toast.success(`Successfully saved ${formattedQuestions.length} questions`);
      
      if (onUploadComplete) {
        onUploadComplete();
      }
    } catch (error) {
      console.error("Error saving questions:", error);
      toast.error("Failed to save questions. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleQuestionsLoaded = (questions: QuestionFormData[]) => {
    setParsedData(questions);
  };
  
  const handleFileUpload = () => {
    if (!parsedData || parsedData.length === 0) {
      toast.error("No questions loaded. Please upload a file first.");
      return;
    }
    
    // This triggers the form submission which will handle the actual upload
    const submitButton = document.querySelector('form button[type="submit"]');
    if (submitButton instanceof HTMLButtonElement) {
      submitButton.click();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditMode ? "Edit Questions" : "Upload Questions"}</CardTitle>
        <CardDescription>
          {isEditMode 
            ? "Edit existing questions for the selected level and topic" 
            : "Upload questions from a file for the selected level and topic"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <QuestionFormSection 
          onSubmit={onSubmit}
          addUploadToHistory={addUploadToHistory}
          handleSaveQuestions={handleSaveQuestions}
          isEditMode={isEditMode}
          editData={editData}
          onEditComplete={onEditComplete}
          isUploading={isUploading}
          onFileUpload={handleFileUpload}
          onQuestionsLoaded={handleQuestionsLoaded}
        />
      </CardContent>
    </Card>
  );
};

export default AdminUploadForm;

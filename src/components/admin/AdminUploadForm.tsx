
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import LevelSelector from './LevelSelector';
import TopicSelector from './TopicSelector';
import FileUploadInput from './FileUploadInput';
import FileFormatGuide from './FileFormatGuide';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { parseFileContent, validateQuestionData, formatQuestionsForDatabase } from '@/utils/adminUploadUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionBatchManager from './QuestionBatchManager';
import { QuestionFormData } from './QuestionForm';

interface EnhancedAdminUploadFormProps {
  addUploadToHistory: (newUpload: any) => void;
  isEditMode?: boolean;
  editData?: any;
  onEditComplete?: () => void;
  onUploadComplete?: () => void;
}

const EnhancedAdminUploadForm: React.FC<EnhancedAdminUploadFormProps> = ({ 
  addUploadToHistory, 
  isEditMode = false, 
  editData = null,
  onEditComplete,
  onUploadComplete
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any[] | null>(null);
  const [currentTab, setCurrentTab] = useState<string>("manual-entry");
  
  const form = useForm({
    defaultValues: {
      level: "",
      topic: ""
    }
  });
  
  // When in edit mode, populate the form with edit data
  useEffect(() => {
    if (isEditMode && editData) {
      form.reset({
        level: editData.level,
        topic: editData.topic
      });
      
      // If we have questions data, set it as parsed data
      if (editData.questions && editData.questions.length > 0) {
        setParsedData(editData.questions);
      }
    }
  }, [isEditMode, editData, form]);

  const onFileChange = async (file: File) => {
    setSelectedFile(file);
    
    if (file) {
      try {
        const data = await parseFileContent(file);
        
        // Validate the parsed data
        const validation = validateQuestionData(data);
        if (!validation.valid) {
          toast.error(`File validation failed: ${validation.errors.join(', ')}`);
          setParsedData(null);
          return;
        }
        
        setParsedData(data);
        toast.success(`Successfully parsed ${data.length} questions`);
      } catch (error) {
        console.error("Error parsing file:", error);
        toast.error("Failed to parse file. Please check the format.");
        setParsedData(null);
      }
    } else {
      setParsedData(null);
    }
  };
  
  const onSubmit = async (data: { level: string; topic: string }) => {
    const { level, topic } = data;
    
    if (!level || !topic) {
      toast.error("Please select both level and topic");
      return;
    }
    
    if ((!parsedData || parsedData.length === 0) && currentTab === "file-upload") {
      toast.error("Please upload and parse a file first");
      return;
    }
    
    setIsUploading(true);
    
    try {
      if (isEditMode && editData) {
        // Edit mode logic - already handled in the batch manager
        if (onEditComplete) {
          onEditComplete();
        }
      } else if (currentTab === "file-upload" && parsedData) {
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
            filename: selectedFile?.name || `${topic}_questions.xlsx`
          });
          
          toast.success(`Successfully uploaded ${formattedQuestions.length} questions`);
          
          // Reset form
          form.reset();
          setSelectedFile(null);
          setParsedData(null);
        }
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
    const { level, topic } = form.getValues();
    
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
        filename: `${topic}_manual_entry.xlsx` // A placeholder filename for tracking
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
  
  const level = form.watch("level");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditMode ? "Edit Questions" : "Upload Questions"}</CardTitle>
        <CardDescription>
          {isEditMode 
            ? "Edit existing questions for the selected level and topic" 
            : "Add new questions using our user-friendly interface or upload from a file"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>English Level</FormLabel>
                    <FormControl>
                      <LevelSelector 
                        value={field.value} 
                        onChange={field.onChange}
                        disabled={isEditMode}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <TopicSelector 
                        value={field.value}
                        onChange={field.onChange}
                        level={level}
                        disabled={isEditMode}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            {!isEditMode && (
              <Tabs value={currentTab} onValueChange={setCurrentTab}>
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="manual-entry">Manual Entry</TabsTrigger>
                  <TabsTrigger value="file-upload">File Upload</TabsTrigger>
                </TabsList>
                
                <TabsContent value="manual-entry" className="pt-4">
                  <QuestionBatchManager
                    level={level}
                    topic={form.getValues().topic}
                    onSave={handleSaveQuestions}
                    isSubmitting={isUploading}
                  />
                </TabsContent>
                
                <TabsContent value="file-upload" className="pt-4">
                  <FileUploadInput onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      onFileChange(e.target.files[0]);
                    }
                  }} />
                  
                  {parsedData && parsedData.length > 0 ? (
                    <div className="border p-4 rounded-md mt-4">
                      <h3 className="font-medium mb-2">
                        {parsedData.length} questions parsed from file
                      </h3>
                      <div className="max-h-60 overflow-y-auto">
                        {parsedData.slice(0, 3).map((q, idx) => (
                          <div key={idx} className="mb-2 pb-2 border-b">
                            <p><strong>Q{idx + 1}:</strong> {q.question_text || q.Question}</p>
                            <div className="grid grid-cols-2 gap-2 text-sm mt-1">
                              <p>A: {q.option_a || q.A}</p>
                              <p>B: {q.option_b || q.B}</p>
                              <p>C: {q.option_c || q.C}</p>
                              <p>D: {q.option_d || q.D}</p>
                            </div>
                            <p className="text-sm font-medium mt-1">
                              Answer: {q.correct_answer || q['Correct Answer']}
                            </p>
                          </div>
                        ))}
                        
                        {parsedData.length > 3 && (
                          <p className="text-center text-neutral-dark">
                            ... and {parsedData.length - 3} more questions
                          </p>
                        )}
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full mt-4"
                        disabled={isUploading}
                      >
                        {isUploading ? "Uploading..." : `Upload ${parsedData.length} Questions`}
                      </Button>
                    </div>
                  ) : (
                    <FileFormatGuide />
                  )}
                </TabsContent>
              </Tabs>
            )}
            
            {isEditMode && editData && editData.questions && editData.questions.length > 0 && (
              <QuestionBatchManager
                initialQuestions={editData.questions}
                level={editData.level}
                topic={editData.topic}
                onSave={handleSaveQuestions}
                isSubmitting={isUploading}
              />
            )}
            
            {isEditMode && (!editData || !editData.questions || editData.questions.length === 0) && (
              <div className="text-center py-8 border rounded-md">
                <p className="text-neutral-dark">No questions loaded for editing.</p>
                {onEditComplete && (
                  <Button 
                    variant="outline"
                    className="mt-4"
                    onClick={onEditComplete}
                  >
                    Back to History
                  </Button>
                )}
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EnhancedAdminUploadForm;

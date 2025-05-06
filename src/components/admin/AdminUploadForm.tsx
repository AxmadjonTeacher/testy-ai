
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { topicsByLevel } from '@/utils/testTopics';
import { parseFileContent, validateQuestionData, formatQuestionsForDatabase } from '@/utils/adminUploadUtils';
import LevelSelector from './LevelSelector';
import TopicSelector from './TopicSelector';
import FileUploadInput from './FileUploadInput';
import FileFormatGuide from './FileFormatGuide';
import UploadButton from './UploadButton';

interface AdminUploadFormProps {
  addUploadToHistory: (upload: any) => void;
}

const AdminUploadForm: React.FC<AdminUploadFormProps> = ({ addUploadToHistory }) => {
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [availableTopics, setAvailableTopics] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Update available topics when level changes
  useEffect(() => {
    if (level && topicsByLevel[level]) {
      setAvailableTopics(topicsByLevel[level]);
      setTopic(""); // Reset topic when level changes
    } else {
      setAvailableTopics([]);
    }
  }, [level]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    if (!level) {
      toast.error("Please select a level");
      return;
    }

    if (!topic) {
      toast.error("Please select a topic");
      return;
    }

    setIsUploading(true);

    try {
      // Parse file content (CSV or Excel)
      const parsedData = await parseFileContent(file);
      
      // Validate the parsed data
      const validation = validateQuestionData(parsedData);
      
      if (!validation.valid) {
        toast.error(validation.errors[0]);
        console.error("Validation errors:", validation.errors);
        setIsUploading(false);
        return;
      }
      
      // Format the data for Supabase
      const questions = formatQuestionsForDatabase(parsedData, level, topic);
      
      // Insert questions into Supabase
      const { data, error } = await supabase
        .from("questions")
        .insert(questions);
      
      if (error) {
        throw error;
      }
      
      const newUpload = {
        id: Math.random().toString(36).substring(2, 9),
        filename: file.name,
        level,
        topic,
        date: new Date().toLocaleDateString(),
        questionCount: questions.length,
      };

      addUploadToHistory(newUpload);
      
      toast.success(`Successfully uploaded ${questions.length} questions!`);
      setFile(null);
      
      // Reset the file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error: any) {
      toast.error(`Failed to upload file: ${error.message || "Unknown error"}`);
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Upload Test Questions</CardTitle>
        <CardDescription>
          Upload CSV or Excel files with questions organized by level and topic.
          Make sure your file follows the required format.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <LevelSelector value={level} onChange={setLevel} />
          <TopicSelector 
            value={topic} 
            onChange={setTopic} 
            availableTopics={availableTopics} 
            disabled={availableTopics.length === 0} 
          />
          <FileUploadInput onChange={handleFileChange} />
          <FileFormatGuide />
          <UploadButton 
            onClick={handleUpload} 
            isUploading={isUploading} 
            disabled={!file || !topic} 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminUploadForm;

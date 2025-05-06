
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { topicsByLevel } from '@/utils/testTopics';
import { parseFileContent } from '@/utils/adminUploadUtils';

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
      
      if (!parsedData || parsedData.length === 0) {
        toast.error("No data found in the uploaded file");
        setIsUploading(false);
        return;
      }
      
      // Validate and format the data for Supabase
      const questions = parsedData.map((row: any) => {
        // Check for required fields
        if (!row.Question || !row.A || !row.B || !row.C || !row.D || !row['Correct Answer']) {
          throw new Error("Missing required fields in data");
        }
        
        return {
          question_text: row.Question,
          option_a: row.A,
          option_b: row.B,
          option_c: row.C,
          option_d: row.D,
          correct_answer: row['Correct Answer'],
          level,
          topic
        };
      });
      
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
          <div className="space-y-2">
            <Label htmlFor="english-level">English Level</Label>
            <Select 
              value={level} 
              onValueChange={setLevel}
            >
              <SelectTrigger id="english-level">
                <SelectValue placeholder="Select a level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Level 0</SelectItem>
                <SelectItem value="1">Level 1</SelectItem>
                <SelectItem value="2">Level 2</SelectItem>
                <SelectItem value="3">Level 3</SelectItem>
                <SelectItem value="4">Level 4</SelectItem>
                <SelectItem value="IELTS">IELTS</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Select
              value={topic}
              onValueChange={setTopic}
              disabled={availableTopics.length === 0}
            >
              <SelectTrigger id="topic">
                <SelectValue placeholder={availableTopics.length === 0 ? "Select a level first" : "Select a topic"} />
              </SelectTrigger>
              <SelectContent>
                {availableTopics.map((topicOption) => (
                  <SelectItem key={topicOption} value={topicOption}>
                    {topicOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file-upload">Upload Questions File</Label>
            <div className="flex items-center gap-2">
              <Input
                id="file-upload"
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
            </div>
            <p className="text-xs text-neutral-dark mt-1">
              Supported formats: .csv, .xlsx, .xls
            </p>
          </div>
          
          <div className="bg-neutral-light p-4 rounded-md border border-neutral-light/50">
            <h3 className="text-sm font-medium mb-2">Required File Format:</h3>
            <p className="text-xs text-neutral-dark mb-2">
              Your file should contain these columns:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead className="bg-neutral-dark text-white">
                  <tr>
                    <th className="border border-neutral-light px-2 py-1 text-left">Question</th>
                    <th className="border border-neutral-light px-2 py-1 text-center">A</th>
                    <th className="border border-neutral-light px-2 py-1 text-center">B</th>
                    <th className="border border-neutral-light px-2 py-1 text-center">C</th>
                    <th className="border border-neutral-light px-2 py-1 text-center">D</th>
                    <th className="border border-neutral-light px-2 py-1 text-center">Correct Answer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-neutral-light px-2 py-1">She ____ to school every day.</td>
                    <td className="border border-neutral-light px-2 py-1 text-center">go</td>
                    <td className="border border-neutral-light px-2 py-1 text-center">goes</td>
                    <td className="border border-neutral-light px-2 py-1 text-center">going</td>
                    <td className="border border-neutral-light px-2 py-1 text-center">gone</td>
                    <td className="border border-neutral-light px-2 py-1 text-center">B</td>
                  </tr>
                  <tr>
                    <td className="border border-neutral-light px-2 py-1">This is ____ apple.</td>
                    <td className="border border-neutral-light px-2 py-1 text-center">a</td>
                    <td className="border border-neutral-light px-2 py-1 text-center">an</td>
                    <td className="border border-neutral-light px-2 py-1 text-center">the</td>
                    <td className="border border-neutral-light px-2 py-1 text-center">no</td>
                    <td className="border border-neutral-light px-2 py-1 text-center">B</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-white"
            disabled={isUploading || !file || !topic}
            onClick={handleUpload}
          >
            {isUploading ? (
              "Uploading..."
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" /> 
                Upload Questions
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminUploadForm;

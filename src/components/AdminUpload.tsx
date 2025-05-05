
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import * as XLSX from 'xlsx';

const AdminUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const parseFileContent = async (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          resolve(json);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = (error) => reject(error);
      reader.readAsBinaryString(file);
    });
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
      toast.error("Please enter a topic");
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
        if (!row.Question || !row['Option A'] || !row['Option B'] || !row['Option C'] || !row['Option D'] || !row['Correct Answer']) {
          throw new Error("Missing required fields in data");
        }
        
        return {
          question_text: row.Question,
          option_a: row['Option A'],
          option_b: row['Option B'],
          option_c: row['Option C'],
          option_d: row['Option D'],
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

      setUploadedFiles(prev => [newUpload, ...prev]);
      
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

  // Load upload history
  const fetchUploadHistory = async () => {
    try {
      const { data, error } = await supabase
        .from("questions")
        .select("level, topic, created_at")
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Group by level, topic and date (same day)
      const groupedData = data.reduce((acc: any, item) => {
        const date = new Date(item.created_at).toLocaleDateString();
        const key = `${item.level}-${item.topic}-${date}`;
        
        if (!acc[key]) {
          acc[key] = {
            id: key,
            level: item.level,
            topic: item.topic,
            date,
            questionCount: 0,
            filename: `${item.topic}_questions.xlsx`
          };
        }
        
        acc[key].questionCount++;
        return acc;
      }, {});
      
      setUploadedFiles(Object.values(groupedData));
    } catch (error) {
      console.error("Error fetching upload history:", error);
    }
  };

  // Load history when tab changes
  const handleTabChange = (value: string) => {
    if (value === 'history') {
      fetchUploadHistory();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-neutral-dark mb-6">Admin Upload Portal</h2>
      
      <Tabs defaultValue="upload" className="w-full" onValueChange={handleTabChange}>
        <TabsList className="mb-4">
          <TabsTrigger value="upload">Upload Questions</TabsTrigger>
          <TabsTrigger value="history">Upload History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload">
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
                  <Input
                    id="topic"
                    placeholder="e.g., Present Simple, Past Tense"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
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
                    Your file should contain these columns in order:
                  </p>
                  <div className="overflow-x-auto">
                    <div className="text-xs text-neutral-dark font-mono bg-white p-2 rounded border">
                      ID | Question | Option A | Option B | Option C | Option D | Correct Answer
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  disabled={isUploading || !file}
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
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Upload History</CardTitle>
              <CardDescription>
                View all previously uploaded question files.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {uploadedFiles.length > 0 ? (
                <div className="space-y-4">
                  {uploadedFiles.map((upload) => (
                    <div key={upload.id} className="flex items-center justify-between p-4 bg-white rounded-md border">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">{upload.filename}</p>
                          <p className="text-sm text-neutral-dark">
                            Level: {upload.level} | Topic: {upload.topic} | Questions: {upload.questionCount}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-neutral-dark">{upload.date}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-neutral-dark">
                  <p>No files have been uploaded yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminUpload;

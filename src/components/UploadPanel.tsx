
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';

interface UploadPanelProps {
  level: string;
}

const UploadPanel: React.FC<UploadPanelProps> = ({ level }) => {
  const [topic, setTopic] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(e.target.files);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!files || files.length === 0) {
      toast.error("Please select files to upload");
      return;
    }
    
    if (!topic) {
      toast.error("Please enter a topic");
      return;
    }

    setUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      toast.success(`${files.length} files uploaded successfully for ${level} - ${topic}`);
      
      // Reset form
      setTopic("");
      setTeacherName("");
      setFiles(null);
      
      // Reset the input file
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }, 2000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-primary">Upload Test Files</CardTitle>
        <CardDescription>Upload up to 4 test files for {level}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Topic *</Label>
            <Input
              id="topic"
              placeholder="e.g., Present Simple, Adjectives"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="teacher">Teacher Name (optional)</Label>
            <Input
              id="teacher"
              placeholder="Enter teacher name"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file-upload">Upload Files *</Label>
            <Input
              id="file-upload"
              type="file"
              accept=".doc,.docx,.pdf"
              multiple
              onChange={handleFilesChange}
              className="cursor-pointer"
            />
            <p className="text-xs text-neutral-dark mt-1">Supported formats: .doc, .docx, .pdf (Max 4 files)</p>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-white"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Files"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UploadPanel;

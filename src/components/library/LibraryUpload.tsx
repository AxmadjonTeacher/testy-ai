
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';
import { Upload, X, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from "@/integrations/supabase/client";
import { motion } from 'framer-motion';

interface LibraryUploadProps {
  onUploadSuccess: () => void;
}

const LibraryUpload: React.FC<LibraryUploadProps> = ({ onUploadSuccess }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    level: '',
    grade: '',
    topics: [] as string[],
  });
  const [currentTopic, setCurrentTopic] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);

  const levels = ['0', '1', '2', '3', '4', 'IELTS'];
  const grades = ['1-2', '3-4', '5-6', '7-8', '9-11'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      // Validate file types
      const validFiles = Array.from(selectedFiles).filter(file => {
        const extension = file.name.split('.').pop()?.toLowerCase();
        return extension === 'pdf' || extension === 'docx';
      });
      
      if (validFiles.length !== selectedFiles.length) {
        toast.error('Only PDF and DOCX files are allowed');
        return;
      }
      
      // Create a new FileList-like object with only valid files
      const dt = new DataTransfer();
      validFiles.forEach(file => dt.items.add(file));
      setFiles(dt.files);
    }
  };

  const addTopic = () => {
    if (currentTopic.trim() && !formData.topics.includes(currentTopic.trim())) {
      setFormData(prev => ({
        ...prev,
        topics: [...prev.topics, currentTopic.trim()]
      }));
      setCurrentTopic('');
    }
  };

  const removeTopic = (topicToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.filter(topic => topic !== topicToRemove)
    }));
  };

  const handleUpload = async () => {
    if (!user) {
      toast.error('Please sign in to upload tests');
      return;
    }

    if (!files || files.length === 0) {
      toast.error('Please select at least one file');
      return;
    }

    if (!formData.title || !formData.level || !formData.grade || formData.topics.length === 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const fileExt = file.name.split('.').pop()?.toLowerCase();
        const fileName = `${user.id}/${Date.now()}-${file.name}`;
        
        // Upload file to storage
        const { error: uploadError } = await supabase.storage
          .from('uploaded-tests')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Save metadata to database
        const { error: dbError } = await supabase
          .from('uploaded_tests')
          .insert({
            user_id: user.id,
            title: formData.title,
            level: formData.level,
            grade: formData.grade,
            topics: formData.topics,
            file_name: file.name,
            file_path: fileName,
            file_type: fileExt || '',
            file_size: file.size,
          });

        if (dbError) throw dbError;
      });

      await Promise.all(uploadPromises);
      
      toast.success(`Successfully uploaded ${files.length} test file(s)`);
      
      // Reset form
      setFormData({
        title: '',
        level: '',
        grade: '',
        topics: [],
      });
      setFiles(null);
      
      // Reset file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      onUploadSuccess();
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload test files');
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Test Files
          </CardTitle>
          <CardDescription>
            Upload PDF or DOCX test files and organize them by level, grade, and topics.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Test Title *</Label>
            <Input
              id="title"
              placeholder="Enter test title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="level">Level *</Label>
              <Select value={formData.level} onValueChange={(value) => setFormData(prev => ({ ...prev, level: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      Level {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="grade">Grade *</Label>
              <Select value={formData.grade} onValueChange={(value) => setFormData(prev => ({ ...prev, grade: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {grades.map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      Grade {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Topics *</Label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Enter topic (e.g., Present Simple)"
                value={currentTopic}
                onChange={(e) => setCurrentTopic(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTopic())}
              />
              <Button type="button" onClick={addTopic} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.topics.map((topic) => (
                <Badge key={topic} variant="secondary" className="flex items-center gap-1">
                  {topic}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeTopic(topic)} />
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="file-upload">Upload Files * (PDF, DOCX)</Label>
            <Input
              id="file-upload"
              type="file"
              accept=".pdf,.docx"
              multiple
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            {files && (
              <p className="text-sm text-neutral-dark mt-1">
                {files.length} file(s) selected
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleUpload} 
            disabled={uploading}
            className="w-full"
          >
            {uploading ? 'Uploading...' : 'Upload Tests'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default LibraryUpload;

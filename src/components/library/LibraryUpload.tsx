
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';
import { Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { requiresLevel } from '@/utils/subjectConfig';
import { FormData } from '@/utils/uploadValidation';
import SubjectSelector from './upload/SubjectSelector';
import LevelSelector from './upload/LevelSelector';
import GradeInput from './upload/GradeInput';
import TopicsManager from './upload/TopicsManager';
import FileUploadInput from './upload/FileUploadInput';
import { useFileUpload } from './upload/useFileUpload';

interface LibraryUploadProps {
  onUploadSuccess: () => void;
}

const LibraryUpload: React.FC<LibraryUploadProps> = ({ onUploadSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    subject: '',
    level: '',
    grade: '',
    topics: [],
  });
  const [currentTopic, setCurrentTopic] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);

  const { uploading, uploadFiles } = useFileUpload(onUploadSuccess);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const dt = new DataTransfer();
      Array.from(selectedFiles).forEach(file => dt.items.add(file));
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

  const handleSubjectChange = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subject,
      level: '',
      grade: '',
      topics: []
    }));
  };

  const handleUpload = async () => {
    const success = await uploadFiles(formData, files);
    if (success) {
      // Reset form
      setFormData({
        subject: '',
        level: '',
        grade: '',
        topics: [],
      });
      setFiles(null);
      
      // Reset file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
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
            Upload PDF or DOCX test files and organize them by subject, level, grade, and topics.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SubjectSelector 
            value={formData.subject} 
            onChange={handleSubjectChange} 
          />

          <div className="grid grid-cols-2 gap-4">
            {requiresLevel(formData.subject) && (
              <LevelSelector
                value={formData.level}
                onChange={(value) => setFormData(prev => ({ ...prev, level: value }))}
                subject={formData.subject}
              />
            )}

            <GradeInput
              value={formData.grade}
              onChange={(value) => setFormData(prev => ({ ...prev, grade: value }))}
              className={requiresLevel(formData.subject) ? '' : 'col-span-2'}
            />
          </div>

          <TopicsManager
            topics={formData.topics}
            currentTopic={currentTopic}
            onCurrentTopicChange={setCurrentTopic}
            onAddTopic={addTopic}
            onRemoveTopic={removeTopic}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTopic())}
          />

          <FileUploadInput
            files={files}
            onChange={handleFileChange}
          />
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

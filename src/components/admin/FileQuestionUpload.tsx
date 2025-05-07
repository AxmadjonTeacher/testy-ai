
import React, { useState } from 'react';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import FileUploadInput from './FileUploadInput';
import FileFormatGuide from './FileFormatGuide';
import { parseFileContent, validateQuestionData } from '@/utils/adminUploadUtils';
import { QuestionFormData } from './QuestionForm';

interface FileQuestionUploadProps {
  onQuestionsLoaded: (questions: QuestionFormData[]) => void;
  onUpload: () => void;
  isUploading: boolean;
}

const FileQuestionUpload: React.FC<FileQuestionUploadProps> = ({ 
  onQuestionsLoaded, 
  onUpload,
  isUploading 
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<QuestionFormData[] | null>(null);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
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
        onQuestionsLoaded(data);
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

  return (
    <div className="space-y-4">
      <FileUploadInput onChange={onFileChange} />
      
      {parsedData && parsedData.length > 0 ? (
        <div className="border p-4 rounded-md mt-4">
          <h3 className="font-medium mb-2">
            {parsedData.length} questions parsed from file
          </h3>
          <div className="max-h-60 overflow-y-auto">
            {parsedData.slice(0, 3).map((q, idx) => (
              <div key={idx} className="mb-2 pb-2 border-b">
                <p><strong>Q{idx + 1}:</strong> {q.question_text}</p>
                <div className="grid grid-cols-2 gap-2 text-sm mt-1">
                  <p>A: {q.option_a}</p>
                  <p>B: {q.option_b}</p>
                  <p>C: {q.option_c}</p>
                  <p>D: {q.option_d}</p>
                </div>
                <p className="text-sm font-medium mt-1">
                  Answer: {q.correct_answer}
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
            onClick={onUpload}
          >
            {isUploading ? "Uploading..." : `Upload ${parsedData.length} Questions`}
          </Button>
        </div>
      ) : (
        <FileFormatGuide />
      )}
    </div>
  );
};

export default FileQuestionUpload;


import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";
import { toast } from 'sonner';
import UploadHistorySearch from './upload-history/UploadHistorySearch';
import SubjectTabs from './upload-history/SubjectTabs';

interface UploadHistoryItem {
  id: string;
  filename: string;
  level: string;
  topic: string;
  date: string;
  questionCount: number;
  subject?: string;
}

interface AdminUploadHistoryProps {
  uploadedFiles: UploadHistoryItem[];
  onDeleteItem?: (itemId: string) => void;
  isAdmin?: boolean;
}

const AdminUploadHistory: React.FC<AdminUploadHistoryProps> = ({ 
  uploadedFiles, 
  onDeleteItem,
  isAdmin = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFiles, setFilteredFiles] = useState<UploadHistoryItem[]>(uploadedFiles);

  // Filter files when search term or uploaded files change
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredFiles(uploadedFiles);
      return;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();
    const results = uploadedFiles.filter(file => 
      file.filename.toLowerCase().includes(lowerCaseSearch) ||
      file.topic.toLowerCase().includes(lowerCaseSearch) ||
      (file.subject && file.subject.toLowerCase().includes(lowerCaseSearch))
    );
    
    setFilteredFiles(results);
  }, [searchTerm, uploadedFiles]);

  // Group files by subject first, then by level
  const filesBySubject = React.useMemo(() => {
    return filteredFiles.reduce((acc: {[key: string]: {[key: string]: UploadHistoryItem[]}}, file) => {
      const subject = file.subject || 'English'; // Default to English for backward compatibility
      const level = file.level;
      
      if (!acc[subject]) {
        acc[subject] = {};
      }
      if (!acc[subject][level]) {
        acc[subject][level] = [];
      }
      acc[subject][level].push(file);
      return acc;
    }, {});
  }, [filteredFiles]);

  // Get unique subjects sorted
  const subjects = React.useMemo(() => {
    return Object.keys(filesBySubject).sort();
  }, [filesBySubject]);

  const handleDeleteAttempt = (itemId: string) => {
    if (!isAdmin) {
      toast.error("You don't have permission to delete files");
      return;
    }
    
    if (onDeleteItem) {
      onDeleteItem(itemId);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardDescription>
          View all previously uploaded question files organized by subject and level.
          {!isAdmin && (
            <div className="mt-2 flex items-center text-amber-500 text-sm">
              <ShieldAlert className="h-4 w-4 mr-1" />
              You need admin permissions to delete files
            </div>
          )}
        </CardDescription>
        <UploadHistorySearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </CardHeader>
      <CardContent>
        {filteredFiles.length > 0 ? (
          <SubjectTabs
            filesBySubject={filesBySubject}
            subjects={subjects}
            onDeleteAttempt={handleDeleteAttempt}
            onDeleteItem={onDeleteItem}
            isAdmin={isAdmin}
          />
        ) : (
          <div className="text-center py-8 text-neutral-dark">
            <p>
              {uploadedFiles.length > 0 
                ? "No matching files found. Try a different search term." 
                : "No files have been uploaded yet."
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminUploadHistory;

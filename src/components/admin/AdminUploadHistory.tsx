
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UploadHistoryItem {
  id: string;
  filename: string;
  level: string;
  topic: string;
  date: string;
  questionCount: number;
}

interface AdminUploadHistoryProps {
  uploadedFiles: UploadHistoryItem[];
  onDeleteItem?: (itemId: string) => void;
}

const AdminUploadHistory: React.FC<AdminUploadHistoryProps> = ({ 
  uploadedFiles, 
  onDeleteItem
}) => {
  // Group files by level
  const filesByLevel = React.useMemo(() => {
    return uploadedFiles.reduce((acc: {[key: string]: UploadHistoryItem[]}, file) => {
      if (!acc[file.level]) {
        acc[file.level] = [];
      }
      acc[file.level].push(file);
      return acc;
    }, {});
  }, [uploadedFiles]);

  // Get unique levels sorted
  const levels = React.useMemo(() => {
    return Object.keys(filesByLevel).sort((a, b) => {
      // Try to sort numerically if possible
      const numA = Number(a);
      const numB = Number(b);
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB;
      }
      return a.localeCompare(b);
    });
  }, [filesByLevel]);

  // Function to render files for a specific level
  const renderLevelFiles = (level: string, files: UploadHistoryItem[]) => {
    return (
      <div className="space-y-4">
        {files.map((upload) => (
          <div key={upload.id} className="flex items-center justify-between p-4 bg-white rounded-md border">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">{upload.filename}</p>
                <p className="text-sm text-neutral-dark">
                  Topic: {upload.topic} | Questions: {upload.questionCount}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {onDeleteItem && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => {
                    console.log("Delete button clicked for:", upload.id);
                    onDeleteItem(upload.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              )}
              <p className="text-sm text-neutral-dark ml-2">{upload.date}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload History</CardTitle>
        <CardDescription>
          View all previously uploaded question files.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {uploadedFiles.length > 0 ? (
          <Tabs defaultValue={levels.length > 0 ? levels[0] : undefined}>
            <TabsList className="mb-4">
              {levels.map(level => (
                <TabsTrigger key={level} value={level}>
                  Level {level}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {levels.map(level => (
              <TabsContent key={level} value={level}>
                {renderLevelFiles(level, filesByLevel[level])}
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="text-center py-8 text-neutral-dark">
            <p>No files have been uploaded yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminUploadHistory;

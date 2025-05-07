
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  onEditItem?: (itemId: string) => void;
}

const AdminUploadHistory: React.FC<AdminUploadHistoryProps> = ({ 
  uploadedFiles, 
  onDeleteItem,
  onEditItem
}) => {
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
                <div className="flex items-center gap-2">
                  {onEditItem && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => onEditItem(upload.id)}
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                  )}
                  {onDeleteItem && (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => onDeleteItem(upload.id)}
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

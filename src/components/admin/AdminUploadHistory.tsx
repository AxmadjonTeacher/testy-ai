
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

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
}

const AdminUploadHistory: React.FC<AdminUploadHistoryProps> = ({ uploadedFiles }) => {
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
  );
};

export default AdminUploadHistory;

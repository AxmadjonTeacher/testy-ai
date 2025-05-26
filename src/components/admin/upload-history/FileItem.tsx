
import React from 'react';
import { FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadHistoryItem {
  id: string;
  filename: string;
  level: string;
  topic: string;
  date: string;
  questionCount: number;
  subject?: string;
}

interface FileItemProps {
  upload: UploadHistoryItem;
  onDeleteAttempt: (itemId: string) => void;
  onDeleteItem?: (itemId: string) => void;
  isAdmin: boolean;
}

const FileItem: React.FC<FileItemProps> = ({
  upload,
  onDeleteAttempt,
  onDeleteItem,
  isAdmin
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-md border">
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
            onClick={() => onDeleteAttempt(upload.id)}
            disabled={!isAdmin}
            title={!isAdmin ? "Admin permission required" : "Delete file"}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        )}
        <p className="text-sm text-neutral-dark ml-2">{upload.date}</p>
      </div>
    </div>
  );
};

export default FileItem;

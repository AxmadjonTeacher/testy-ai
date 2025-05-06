
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FileUploadInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUploadInput: React.FC<FileUploadInputProps> = ({ onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="file-upload">Upload Questions File</Label>
      <div className="flex items-center gap-2">
        <Input
          id="file-upload"
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={onChange}
          className="cursor-pointer"
        />
      </div>
      <p className="text-xs text-neutral-dark mt-1">
        Supported formats: .csv, .xlsx, .xls
      </p>
    </div>
  );
};

export default FileUploadInput;

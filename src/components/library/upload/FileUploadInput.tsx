
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FileUploadInputProps {
  files: FileList | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUploadInput: React.FC<FileUploadInputProps> = ({ files, onChange }) => {
  return (
    <div>
      <Label htmlFor="file-upload">Upload Files * (PDF, DOCX)</Label>
      <Input
        id="file-upload"
        type="file"
        accept=".pdf,.docx"
        multiple
        onChange={onChange}
        className="cursor-pointer"
      />
      {files && (
        <p className="text-sm text-neutral-dark mt-1">
          {files.length} file(s) selected
        </p>
      )}
    </div>
  );
};

export default FileUploadInput;

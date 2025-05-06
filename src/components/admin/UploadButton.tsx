
import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface UploadButtonProps {
  onClick: () => void;
  isUploading: boolean;
  disabled: boolean;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onClick, isUploading, disabled }) => {
  return (
    <Button 
      className="w-full bg-primary hover:bg-primary/90 text-white"
      disabled={isUploading || disabled}
      onClick={onClick}
    >
      {isUploading ? (
        "Uploading..."
      ) : (
        <>
          <Upload className="w-4 h-4 mr-2" /> 
          Upload Questions
        </>
      )}
    </Button>
  );
};

export default UploadButton;

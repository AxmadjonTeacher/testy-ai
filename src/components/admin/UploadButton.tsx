
import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload, Save } from "lucide-react";

interface UploadButtonProps {
  isUploading: boolean;
  isEditMode?: boolean;
}

const UploadButton: React.FC<UploadButtonProps> = ({ isUploading, isEditMode = false }) => {
  return (
    <Button 
      type="submit" 
      className="w-full bg-primary hover:bg-primary/90 text-white"
      disabled={isUploading}
    >
      {isUploading ? (
        isEditMode ? "Saving..." : "Uploading..."
      ) : (
        <>
          {isEditMode ? (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload Questions
            </>
          )}
        </>
      )}
    </Button>
  );
};

export default UploadButton;

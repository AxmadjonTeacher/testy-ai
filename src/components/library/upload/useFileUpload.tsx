
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/contexts/AuthContext';
import { validateUploadForm, validateFileTypes, FormData } from '@/utils/uploadValidation';
import { requiresLevel } from '@/utils/subjectConfig';

export const useFileUpload = (onUploadSuccess: () => void) => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);

  const uploadFiles = async (formData: FormData, files: FileList | null) => {
    if (!user) {
      toast.error('Please sign in to upload tests');
      return;
    }

    const validationError = validateUploadForm(formData, files, requiresLevel(formData.subject));
    if (validationError) {
      toast.error(validationError);
      return;
    }

    const validFiles = validateFileTypes(files!);
    if (validFiles.length !== files!.length) {
      toast.error('Only PDF and DOCX files are allowed');
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = validFiles.map(async (file) => {
        const fileExt = file.name.split('.').pop()?.toLowerCase();
        const fileName = `${user.id}/${Date.now()}-${file.name}`;
        
        // Upload file to storage
        const { error: uploadError } = await supabase.storage
          .from('uploaded-tests')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Save metadata to database
        const { error: dbError } = await supabase
          .from('uploaded_tests')
          .insert({
            user_id: user.id,
            title: file.name.split('.')[0],
            subject: formData.subject,
            level: requiresLevel(formData.subject) ? formData.level : null,
            grade: formData.grade,
            topics: formData.topics,
            file_name: file.name,
            file_path: fileName,
            file_type: fileExt || '',
            file_size: file.size,
          });

        if (dbError) throw dbError;
      });

      await Promise.all(uploadPromises);
      
      toast.success(`Successfully uploaded ${validFiles.length} test file(s)`);
      
      onUploadSuccess();
      return true;
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload test files');
      return false;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    uploadFiles
  };
};

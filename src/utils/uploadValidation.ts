
export interface FormData {
  subject: string;
  level: string;
  grade: string;
  topics: string[];
}

export const validateUploadForm = (
  formData: FormData,
  files: FileList | null,
  requiresLevel: boolean
): string | null => {
  if (!files || files.length === 0) {
    return 'Please select at least one file';
  }

  if (!formData.subject || !formData.grade || formData.topics.length === 0) {
    return 'Please fill in all required fields';
  }

  if (requiresLevel && !formData.level) {
    return `Please select a level for ${formData.subject}`;
  }

  return null;
};

export const validateFileTypes = (files: FileList): File[] => {
  const validFiles = Array.from(files).filter(file => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    return extension === 'pdf' || extension === 'docx';
  });
  
  return validFiles;
};

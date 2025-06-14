
import React, { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';
import DeleteTestDialog from './DeleteTestDialog';
import { useTestDelete } from '@/hooks/useTestDelete';
import TestCard from './TestCard';
import TestGridSkeleton from './TestGridSkeleton';
import TestGridEmptyState from './TestGridEmptyState';

interface UploadedTest {
  id: string;
  title?: string;
  subject: string;
  level?: string;
  grade: string;
  topics: string[];
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  created_at: string;
  user_id: string;
}

interface CompactTestGridProps {
  tests: UploadedTest[];
  isLoading: boolean;
  onTestDeleted?: () => void;
}

const CompactTestGrid: React.FC<CompactTestGridProps> = ({ tests, isLoading, onTestDeleted }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [testToDelete, setTestToDelete] = useState<UploadedTest | null>(null);
  const { deleteTest, isDeleting } = useTestDelete();

  const handleDownload = async (test: UploadedTest) => {
    try {
      const { data, error } = await supabase.storage
        .from('uploaded-tests')
        .download(test.file_path);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = test.file_name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('File downloaded successfully');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download file');
    }
  };

  const handleDeleteClick = (test: UploadedTest) => {
    console.log("Delete button clicked for test:", test.id);
    setTestToDelete(test);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (testToDelete) {
      console.log("Confirming delete for test:", testToDelete.id);
      const success = await deleteTest(testToDelete);
      if (success) {
        setDeleteDialogOpen(false);
        setTestToDelete(null);
        if (onTestDeleted) {
          onTestDeleted();
        }
      }
    }
  };

  const handleDeleteCancel = () => {
    console.log("Delete cancelled");
    setDeleteDialogOpen(false);
    setTestToDelete(null);
  };

  if (isLoading) {
    return <TestGridSkeleton />;
  }

  if (tests.length === 0) {
    return <TestGridEmptyState />;
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {tests.map((test, index) => (
          <TestCard
            key={test.id}
            test={test}
            index={index}
            onDownload={handleDownload}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      <DeleteTestDialog
        isOpen={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        testTitle={testToDelete?.title || testToDelete?.file_name || ''}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default CompactTestGrid;

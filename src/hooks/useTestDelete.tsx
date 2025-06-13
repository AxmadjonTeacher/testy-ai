
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UploadedTest {
  id: string;
  title?: string;
  file_name: string;
  file_path: string;
}

export function useTestDelete() {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteTest = async (test: UploadedTest) => {
    try {
      setIsDeleting(true);
      console.log("Deleting test:", test.id);

      // First, delete the file from storage
      const { error: storageError } = await supabase.storage
        .from('uploaded-tests')
        .remove([test.file_path]);

      if (storageError) {
        console.error('Storage deletion error:', storageError);
        // Continue with database deletion even if storage fails
      }

      // Then delete the database record
      const { error: dbError } = await supabase
        .from('uploaded_tests')
        .delete()
        .eq('id', test.id);

      if (dbError) throw dbError;

      console.log("Test deleted successfully");
      toast.success('Test deleted successfully');
      return true;
    } catch (error) {
      console.error("Error deleting test:", error);
      toast.error('Failed to delete test');
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteTest,
    isDeleting
  };
}

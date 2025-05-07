
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useQuestionDelete() {
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteItem = (itemId: string) => {
    console.log("Delete requested for item with ID:", itemId);
    setDeleteItemId(itemId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async (onDeleteSuccess: () => void) => {
    if (!deleteItemId) return;

    try {
      setIsDeleting(true);
      const toastId = toast.loading("Deleting questions...");
      
      // Parse the composite id to get level, topic
      const parts = deleteItemId.split('-');
      const level = parts[0];
      const topic = parts[1];
      
      console.log(`Deleting questions with level: ${level}, topic: ${topic}`);
      
      // Delete questions matching the level and topic
      const { error } = await supabase
        .from("questions")
        .delete()
        .eq("level", level)
        .eq("topic", topic);
        
      if (error) {
        console.error("Deletion error:", error);
        throw error;
      }
      
      console.log("Delete operation completed, updating UI");
      
      toast.dismiss(toastId);
      toast.success("Questions deleted successfully");
      
      // Call the onDeleteSuccess callback
      onDeleteSuccess();
      
    } catch (error: any) {
      console.error("Error during deletion:", error);
      toast.error(`Failed to delete questions: ${error.message || "Unknown error"}`);
    } finally {
      setIsDeleting(false);
      setDeleteItemId(null);
      setIsDeleteDialogOpen(false);
    }
  };

  return {
    deleteItemId,
    isDeleteDialogOpen,
    isDeleting,
    handleDeleteItem,
    confirmDelete,
    setIsDeleteDialogOpen
  };
}

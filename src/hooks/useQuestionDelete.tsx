
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
      
      // Parse the composite id to get level, topic, and date
      const parts = deleteItemId.split('-');
      if (parts.length < 2) {
        throw new Error("Invalid item ID format");
      }
      
      const level = parts[0];
      // Fix the issue with topic parsing - it might contain hyphens
      // Get the topic part (everything between the first hyphen and the last hyphen)
      const lastHyphenIndex = deleteItemId.lastIndexOf('-');
      const topic = deleteItemId.substring(deleteItemId.indexOf('-') + 1, lastHyphenIndex);
      
      console.log(`Attempting to delete questions with level: ${level}, topic: ${topic}`);
      
      // First, get a count of how many questions will be deleted
      const { data: countData, error: countError } = await supabase
        .from("questions")
        .select("id", { count: 'exact' })
        .eq("level", level)
        .eq("topic", topic);

      if (countError) {
        console.error("Error counting questions:", countError);
        throw countError;
      }
      
      const count = countData ? countData.length : 0;
      
      // Now perform the delete operation without returning the count
      const { error } = await supabase
        .from("questions")
        .delete()
        .eq("level", level)
        .eq("topic", topic);
        
      if (error) {
        console.error("Deletion error:", error);
        throw error;
      }
      
      console.log(`Delete operation completed. Deleted ${count} questions. Updating UI...`);
      
      toast.dismiss(toastId);
      toast.success(`${count} questions deleted successfully`);
      
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

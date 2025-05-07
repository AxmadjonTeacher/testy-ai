
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface EditData {
  level: string;
  topic: string;
  questions: any[];
}

export function useQuestionEdit() {
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [editData, setEditData] = useState<EditData | null>(null);

  const handleEditItem = async (itemId: string) => {
    try {
      // Parse the composite id to get level, topic, and date
      const [level, topic, date] = itemId.split('-');
      
      // Fetch questions for editing
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("level", level)
        .eq("topic", topic);
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        setEditData({
          level,
          topic,
          questions: data
        });
        
        setEditItemId(itemId);
        toast.info(`Loaded ${data.length} questions for editing`);
      } else {
        toast.error("No questions found for editing");
      }
    } catch (error) {
      console.error("Error loading questions for edit:", error);
      toast.error("Failed to load questions for editing");
    }
  };

  const handleEditComplete = () => {
    setEditItemId(null);
    setEditData(null);
  };

  return {
    editItemId,
    editData,
    handleEditItem,
    handleEditComplete,
    setEditItemId,
    setEditData
  };
}

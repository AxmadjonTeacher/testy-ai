
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { QuestionFormData } from '@/components/admin/QuestionForm';

interface EditData {
  level: string;
  topic: string;
  questions: QuestionFormData[];
}

export function useQuestionEdit() {
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [editData, setEditData] = useState<EditData | null>(null);

  const handleEditItem = async (itemId: string) => {
    try {
      const [level, topic, date] = itemId.split('-');
      
      const { data, error } = await supabase
        .from("questions")
        .select("id, question_text, option_a, option_b, option_c, option_d, correct_answer")
        .eq("level", level)
        .eq("topic", topic);
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        const formattedQuestions = data.map(q => ({
          id: q.id,
          question_text: q.question_text,
          option_a: q.option_a,
          option_b: q.option_b,
          option_c: q.option_c,
          option_d: q.option_d,
          correct_answer: q.correct_answer
        }));
        
        setEditData({
          level,
          topic,
          questions: formattedQuestions
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


import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Question = Database["public"]["Tables"]["questions"]["Row"];
type GeneratedTest = Database["public"]["Tables"]["generated_tests"]["Row"];

export interface TestParams {
  level: string;
  teacherName?: string;
  grade?: string;
  numQuestions: number;
  includeReading: boolean;
  topics?: string[];
}

/**
 * Fetches questions from Supabase based on specified criteria
 */
export const fetchQuestions = async (params: TestParams): Promise<Question[]> => {
  const { level, topics, numQuestions } = params;
  
  let query = supabase
    .from("questions")
    .select("*")
    .eq("level", level);
  
  if (topics && topics.length > 0) {
    query = query.in("topic", topics);
  }
  
  const { data, error } = await query.limit(100);
  
  if (error) {
    console.error("Error fetching questions:", error);
    throw new Error(`Failed to fetch questions: ${error.message}`);
  }
  
  // Randomize and limit to requested number
  return shuffleArray(data || []).slice(0, numQuestions);
};

/**
 * Saves a generated test to Supabase
 */
export const saveGeneratedTest = async (
  name: string,
  params: TestParams,
  questions: Question[]
): Promise<string> => {
  const { level, teacherName, numQuestions, includeReading } = params;
  
  const topics = Array.from(new Set(questions.map(q => q.topic)));
  
  const { data, error } = await supabase
    .from("generated_tests")
    .insert({
      name,
      teacher_name: teacherName || null,
      level,
      topics,
      include_answers: includeReading,
      question_count: numQuestions,
      questions_json: questions
    })
    .select();
  
  if (error) {
    console.error("Error saving test:", error);
    throw new Error(`Failed to save test: ${error.message}`);
  }
  
  return data?.[0]?.id || "";
};

/**
 * Retrieves a generated test by ID
 */
export const getGeneratedTest = async (testId: string): Promise<GeneratedTest | null> => {
  const { data, error } = await supabase
    .from("generated_tests")
    .select("*")
    .eq("id", testId)
    .single();
  
  if (error) {
    console.error("Error retrieving test:", error);
    return null;
  }
  
  return data;
};

/**
 * Helper function to shuffle an array randomly
 */
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

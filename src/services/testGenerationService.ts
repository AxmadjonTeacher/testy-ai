
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Question = Database["public"]["Tables"]["questions"]["Row"];
type GeneratedTest = Database["public"]["Tables"]["generated_tests"]["Row"];

export interface TestParams {
  level: string;
  teacherName?: string;
  grade?: string;
  numQuestions: number;
  topics: string[];
}

/**
 * Fetches questions from Supabase based on specified criteria
 */
export const fetchQuestions = async (params: TestParams): Promise<Question[]> => {
  const { level, topics, numQuestions } = params;
  
  // Fetch questions for all selected topics
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("level", level)
    .in("topic", topics)
    .eq("question_type", "regular") // Ensure we only get regular questions, not reading questions
    .limit(100);
  
  if (error) {
    console.error("Error fetching questions:", error);
    throw new Error(`Failed to fetch questions: ${error.message}`);
  }
  
  // Shuffle and limit to requested number of questions
  const shuffledQuestions = shuffleArray(data || []);
  
  console.log(`Generated test with ${Math.min(shuffledQuestions.length, numQuestions)} questions at timestamp: ${Date.now()}`);
  
  return shuffledQuestions.slice(0, numQuestions);
};

/**
 * Saves a generated test to Supabase
 */
export const saveGeneratedTest = async (
  name: string,
  params: TestParams,
  questions: Question[]
): Promise<string> => {
  const { level, teacherName, numQuestions } = params;
  
  const topics = Array.from(new Set(questions.map(q => q.topic)));
  
  // Get current user's ID if authenticated
  const { data: { session } } = await supabase.auth.getSession();
  const userId = session?.user?.id;
  
  const { data, error } = await supabase
    .from("generated_tests")
    .insert({
      name,
      teacher_name: teacherName || null,
      level,
      topics,
      include_answers: true, // Default to true since we're removing the checkbox
      question_count: numQuestions,
      questions_json: questions,
      user_id: userId // Associate test with current user
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
 * Helper function to shuffle an array randomly using Fisher-Yates algorithm
 * with added entropy from current timestamp
 */
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  
  // Add current timestamp as additional entropy source
  const timestamp = Date.now();
  
  for (let i = newArray.length - 1; i > 0; i--) {
    // Use complex formula with timestamp to make each shuffle truly unique
    const j = Math.floor((Math.random() * (i + 1) + (timestamp % (i + 1))) % (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  
  return newArray;
};

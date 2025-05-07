
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
  
  // Calculate questions per topic to ensure a balanced distribution
  const questionsPerTopic = Math.ceil(numQuestions / topics.length);
  const allQuestions: Question[] = [];
  
  // Fetch questions for each topic separately to ensure coverage
  for (const topic of topics) {
    let query = supabase
      .from("questions")
      .select("*")
      .eq("level", level)
      .eq("topic", topic);
    
    const { data, error } = await query.limit(100);
    
    if (error) {
      console.error(`Error fetching questions for topic ${topic}:`, error);
      continue;
    }
    
    // Add shuffled questions from this topic to the overall collection
    if (data && data.length > 0) {
      const shuffledTopicQuestions = shuffleArray(data);
      // Add up to questionsPerTopic from each topic
      allQuestions.push(...shuffledTopicQuestions.slice(0, questionsPerTopic));
    }
  }
  
  // If we don't have enough questions, fetch any remaining from all topics
  if (allQuestions.length < numQuestions) {
    console.log(`Only collected ${allQuestions.length} questions from specific topics, fetching additional...`);
    
    const alreadyFetchedIds = allQuestions.map(q => q.id);
    
    const { data: additionalData, error: additionalError } = await supabase
      .from("questions")
      .select("*")
      .eq("level", level)
      .in("topic", topics)
      .not("id", "in", `(${alreadyFetchedIds.join(',')})`);
    
    if (!additionalError && additionalData && additionalData.length > 0) {
      const shuffledAdditional = shuffleArray(additionalData);
      const remainingNeeded = numQuestions - allQuestions.length;
      allQuestions.push(...shuffledAdditional.slice(0, remainingNeeded));
    }
  }
  
  // Final shuffle of all questions to mix topics together
  const finalShuffledQuestions = shuffleArray(allQuestions);
  
  // Timestamp the shuffle with current time (milliseconds) to ensure uniqueness
  console.log(`Generated test with ${finalShuffledQuestions.length} questions at timestamp: ${Date.now()}`);
  
  // Return the requested number of questions or all we could find if less
  return finalShuffledQuestions.slice(0, numQuestions);
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
  
  const { data, error } = await supabase
    .from("generated_tests")
    .insert({
      name,
      teacher_name: teacherName || null,
      level,
      topics,
      include_answers: true, // Default to true since we're removing the checkbox
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

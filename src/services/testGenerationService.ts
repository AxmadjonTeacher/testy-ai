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
  
  // Check if Reading topic is selected
  const includesReading = topics.includes("Reading");
  const regularTopics = topics.filter(topic => topic !== "Reading");
  const allQuestions: Question[] = [];
  
  // Handle Reading questions separately if selected
  if (includesReading) {
    // Fetch reading passages with associated questions
    const { data: readingData, error: readingError } = await supabase
      .from("questions")
      .select("*")
      .eq("level", level)
      .eq("topic", "Reading")
      .eq("question_type", "reading")
      .order('reading_passage', { ascending: false })
      .limit(20);
    
    if (readingError) {
      console.error("Error fetching reading questions:", readingError);
    }
    
    // Group questions by reading passage to keep questions from same passage together
    if (readingData && readingData.length > 0) {
      const passageMap: Record<string, Question[]> = {};
      
      readingData.forEach(question => {
        if (question.reading_passage) {
          if (!passageMap[question.reading_passage]) {
            passageMap[question.reading_passage] = [];
          }
          passageMap[question.reading_passage].push(question);
        }
      });
      
      // Select complete passages (with at least 5 questions)
      for (const passage in passageMap) {
        if (passageMap[passage].length >= 5) {
          // Take exactly 5 questions per passage to maintain consistent reading test format
          allQuestions.push(...passageMap[passage].slice(0, 5));
          
          // If we have enough reading questions, break
          if (allQuestions.length >= 5) {
            break;
          }
        }
      }
    }
  }
  
  // Calculate remaining questions needed for regular topics
  const remainingNeeded = Math.max(0, numQuestions - allQuestions.length);
  
  if (regularTopics.length > 0 && remainingNeeded > 0) {
    // Calculate questions per topic to ensure a balanced distribution
    const questionsPerTopic = Math.ceil(remainingNeeded / regularTopics.length);
    
    // Fetch questions for each regular topic separately
    for (const topic of regularTopics) {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("level", level)
        .eq("topic", topic)
        .eq("question_type", "regular") // Ensure we get only regular questions
        .limit(100);
      
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
  }
  
  // If we still don't have enough questions, fetch any remaining from all topics
  if (allQuestions.length < numQuestions) {
    console.log(`Only collected ${allQuestions.length} questions from specific topics, fetching additional...`);
    
    const alreadyFetchedIds = allQuestions.map(q => q.id);
    
    const { data: additionalData, error: additionalError } = await supabase
      .from("questions")
      .select("*")
      .eq("level", level)
      .in("topic", topics)
      .eq("question_type", "regular")
      .not("id", "in", `(${alreadyFetchedIds.join(',')})`)
      .limit(numQuestions - allQuestions.length);
    
    if (!additionalError && additionalData && additionalData.length > 0) {
      const shuffledAdditional = shuffleArray(additionalData);
      const remainingNeeded = numQuestions - allQuestions.length;
      allQuestions.push(...shuffledAdditional.slice(0, remainingNeeded));
    }
  }
  
  // Final shuffle while maintaining reading questions in passage groups
  const readingQuestions = allQuestions.filter(q => q.question_type === 'reading');
  const regularQuestions = allQuestions.filter(q => q.question_type === 'regular');
  const shuffledRegular = shuffleArray(regularQuestions);
  
  // Group reading questions by passage
  const passageGroups: Record<string, Question[]> = {};
  readingQuestions.forEach(q => {
    if (!q.reading_passage) return;
    if (!passageGroups[q.reading_passage]) {
      passageGroups[q.reading_passage] = [];
    }
    passageGroups[q.reading_passage].push(q);
  });
  
  // Build final question set with reading questions grouped together
  const finalQuestions: Question[] = [];
  Object.values(passageGroups).forEach(group => {
    finalQuestions.push(...group);
  });
  finalQuestions.push(...shuffledRegular);
  
  // Timestamp the shuffle with current time (milliseconds) to ensure uniqueness
  console.log(`Generated test with ${finalQuestions.length} questions at timestamp: ${Date.now()}`);
  
  // Return the requested number of questions or all we could find if less
  return finalQuestions.slice(0, numQuestions);
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

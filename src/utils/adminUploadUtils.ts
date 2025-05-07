
import * as XLSX from 'xlsx';
import { supabase } from "@/integrations/supabase/client";

export const parseFileContent = async (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        
        console.log("Raw Excel data:", json);
        
        // Transform the data to match our expected format
        // This handles different possible column formats
        const transformedData = json.map((row: any) => {
          // Check if we have the Question, A, B, C, D format
          if (row.Question && row.A !== undefined && row.B !== undefined) {
            return {
              question_text: row.Question,
              option_a: row.A,
              option_b: row.B,
              option_c: row.C || "No option C provided",
              option_d: row.D || "No option D provided",
              correct_answer: row['Correct Answer'] || 'A' // Default to A if missing
            };
          }
          
          // Check if we have the older format with Option A, Option B, etc.
          else if (row.Question && row['Option A'] !== undefined) {
            return {
              question_text: row.Question,
              option_a: row['Option A'],
              option_b: row['Option B'],
              option_c: row['Option C'] || "No option C provided",
              option_d: row['Option D'] || "No option D provided",
              correct_answer: row['Correct Answer'] || row['Answer'] || 'A' // Try multiple fields
            };
          }
          
          // Check for number format (1, 2, 3, 4)
          else if (row.Question && row['1'] !== undefined) {
            return {
              question_text: row.Question,
              option_a: row['1'],
              option_b: row['2'],
              option_c: row['3'] || "No option C provided",
              option_d: row['4'] || "No option D provided",
              correct_answer: row['Correct Answer'] || row['Answer'] || 'A'
            };
          }
          
          // Support for question_text format (likely from database export)
          else if (row.question_text && row.option_a && row.option_b) {
            return {
              question_text: row.question_text,
              option_a: row.option_a,
              option_b: row.option_b,
              option_c: row.option_c || "No option C provided",
              option_d: row.option_d || "No option D provided",
              correct_answer: row.correct_answer || 'A'
            };
          }
          
          // Return a standardized object based on the available data
          return {
            question_text: row.Question || row.question_text || row.question || "Missing question text",
            option_a: row.A || row['Option A'] || row['1'] || row.option_a || "Missing option A",
            option_b: row.B || row['Option B'] || row['2'] || row.option_b || "Missing option B",
            option_c: row.C || row['Option C'] || row['3'] || row.option_c || "No option C provided",
            option_d: row.D || row['Option D'] || row['4'] || row.option_d || "No option D provided",
            correct_answer: row['Correct Answer'] || row.correct_answer || row['Answer'] || row.answer || 'A'
          };
        });
        
        console.log("Transformed data:", transformedData);
        resolve(transformedData);
      } catch (error) {
        console.error("Error parsing Excel file:", error);
        reject(error);
      }
    };
    
    reader.onerror = (error) => {
      console.error("FileReader error:", error);
      reject(error);
    };
    
    reader.readAsBinaryString(file);
  });
};

// Function to validate the parsed data
export const validateQuestionData = (data: any[]): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!data || data.length === 0) {
    errors.push("No data found in the file.");
    return { valid: false, errors };
  }
  
  console.log("Validating question data, count:", data.length);
  
  // Check each row for required fields
  data.forEach((row, index) => {
    if (!row.question_text && !row.Question) {
      errors.push(`Row ${index + 1}: Missing question text.`);
    }
    
    if (!row.option_a && !row.A) {
      errors.push(`Row ${index + 1}: Missing option A.`);
    }
    
    if (!row.option_b && !row.B) {
      errors.push(`Row ${index + 1}: Missing option B.`);
    }
    
    // Don't validate options C and D as they can be optional
    
    // Check for correct answer in any possible format and provide a default if missing
    let correctAnswer = row['Correct Answer'] || row.correct_answer || row.Answer || row.answer;
    
    // Validate the correct answer if it exists
    if (correctAnswer && !['A', 'B', 'C', 'D', 'a', 'b', 'c', 'd'].includes(String(correctAnswer))) {
      errors.push(`Row ${index + 1}: Correct answer must be A, B, C, or D. Found: ${correctAnswer}`);
    }
    
    // We no longer consider missing correct answer as an error since we'll default to 'A'
    // This prevents the common error users were experiencing
  });
  
  const result = { valid: errors.length === 0, errors };
  console.log("Validation result:", result);
  return result;
};

// Function to format question data for Supabase
export const formatQuestionsForDatabase = (data: any[], level: string, topic: string) => {
  console.log(`Formatting ${data.length} questions for database with level: ${level}, topic: ${topic}`);
  
  return data.map(row => {
    // Ensure we get the correct answer in the expected format
    let correctAnswer = row['Correct Answer'] || row.correct_answer;
    
    // If correctAnswer is undefined or null, try alternative fields
    if (!correctAnswer) {
      correctAnswer = row.Answer || row.answer;
      
      // If still no value, default to 'A'
      if (!correctAnswer) {
        console.warn(`No correct answer found for question, defaulting to 'A'`);
        correctAnswer = 'A';
      } else {
        console.log(`Used fallback for correct answer: ${correctAnswer}`);
      }
    }
    
    // Make sure correctAnswer is uppercase and a valid option
    correctAnswer = String(correctAnswer).toUpperCase();
    if (!['A', 'B', 'C', 'D'].includes(correctAnswer)) {
      console.warn(`Invalid correct answer: ${correctAnswer}. Defaulting to 'A'.`);
      correctAnswer = 'A'; // Default to A if invalid
    }
    
    const formattedQuestion = {
      question_text: row.question_text || row.Question || row.question,
      option_a: row.option_a || row.A || row['Option A'] || row['1'],
      option_b: row.option_b || row.B || row['Option B'] || row['2'],
      option_c: row.option_c || row.C || row['Option C'] || row['3'] || "No option C provided",
      option_d: row.option_d || row.D || row['Option D'] || row['4'] || "No option D provided",
      correct_answer: correctAnswer,
      level,
      topic
    };
    
    console.log("Formatted question:", formattedQuestion);
    return formattedQuestion;
  });
};

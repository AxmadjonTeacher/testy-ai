
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
        
        // Transform the data to match our expected format
        // This handles different possible column formats
        const transformedData = json.map((row: any) => {
          // Check if we have the Question, A, B, C, D format
          if (row.Question && row.A !== undefined && row.B !== undefined) {
            return {
              Question: row.Question,
              A: row.A,
              B: row.B,
              C: row.C,
              D: row.D,
              'Correct Answer': row['Correct Answer']
            };
          }
          
          // Check if we have the older format with Option A, Option B, etc.
          else if (row.Question && row['Option A'] !== undefined) {
            return {
              Question: row.Question,
              A: row['Option A'],
              B: row['Option B'],
              C: row['Option C'],
              D: row['Option D'],
              'Correct Answer': row['Correct Answer']
            };
          }
          
          // Check for number format (1, 2, 3, 4)
          else if (row.Question && row['1'] !== undefined) {
            return {
              Question: row.Question,
              A: row['1'],
              B: row['2'],
              C: row['3'],
              D: row['4'],
              'Correct Answer': row['Correct Answer'] || row['Answer']
            };
          }
          
          // Return the row as-is if we can't determine the format
          return row;
        });
        
        resolve(transformedData);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => reject(error);
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
  
  // Check each row for required fields
  data.forEach((row, index) => {
    if (!row.Question) {
      errors.push(`Row ${index + 1}: Missing question text.`);
    }
    
    if (!row.A) {
      errors.push(`Row ${index + 1}: Missing option A.`);
    }
    
    if (!row.B) {
      errors.push(`Row ${index + 1}: Missing option B.`);
    }
    
    if (!row.C) {
      errors.push(`Row ${index + 1}: Missing option C.`);
    }
    
    if (!row.D) {
      errors.push(`Row ${index + 1}: Missing option D.`);
    }
    
    if (!row['Correct Answer']) {
      errors.push(`Row ${index + 1}: Missing correct answer.`);
    } else if (!['A', 'B', 'C', 'D'].includes(row['Correct Answer'])) {
      errors.push(`Row ${index + 1}: Correct answer must be A, B, C, or D.`);
    }
  });
  
  return { valid: errors.length === 0, errors };
};

// Function to format question data for Supabase
export const formatQuestionsForDatabase = (data: any[], level: string, topic: string) => {
  return data.map(row => {
    // Ensure we get the correct answer in the expected format
    let correctAnswer = row['Correct Answer'];
    
    // If correctAnswer is undefined or null, try alternative fields
    if (!correctAnswer) {
      correctAnswer = row.correct_answer || row.Answer || row.answer || 'A';
    }
    
    // Make sure correctAnswer is uppercase and a valid option
    correctAnswer = String(correctAnswer).toUpperCase();
    if (!['A', 'B', 'C', 'D'].includes(correctAnswer)) {
      correctAnswer = 'A'; // Default to A if invalid
      console.warn(`Invalid correct answer: ${correctAnswer}. Defaulting to 'A'.`);
    }
    
    return {
      question_text: row.Question || row.question_text,
      option_a: row.A || row.option_a,
      option_b: row.B || row.option_b,
      option_c: row.C || row.option_c,
      option_d: row.D || row.option_d,
      correct_answer: correctAnswer,
      level,
      topic
    };
  });
};

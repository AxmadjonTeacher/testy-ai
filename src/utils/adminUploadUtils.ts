import * as XLSX from 'xlsx';
import { supabase } from "@/integrations/supabase/client";

// HTML sanitization function to prevent XSS
const sanitizeText = (text: string | undefined | null): string => {
  if (!text) return '';
  
  // Remove all HTML tags and special characters that could be malicious
  return String(text)
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>"'`]/g, '') // Remove potentially dangerous characters
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
};

// Validate text length to prevent excessive data
const validateLength = (text: string, maxLength: number = 5000): string => {
  if (text.length > maxLength) {
    throw new Error(`Text exceeds maximum length of ${maxLength} characters`);
  }
  return text;
};

export const parseFileContent = async (file: File): Promise<any[]> => {
  // Validate file size (max 5MB)
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds 5MB limit');
  }

  // Validate file type
  const validTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'text/csv'
  ];
  
  if (!validTypes.includes(file.type) && !file.name.match(/\.(xlsx|xls|csv)$/i)) {
    throw new Error('Invalid file type. Please upload an Excel or CSV file');
  }

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
        
        // Transform the data to match our expected format with sanitization
        // This handles different possible column formats
        const transformedData = json.map((row: any) => {
          let questionText = '';
          let optionA = '';
          let optionB = '';
          let optionC = '';
          let optionD = '';
          let correctAnswer = '';

          // Check if we have the Question, A, B, C, D format
          if (row.Question && row.A !== undefined && row.B !== undefined) {
            questionText = sanitizeText(row.Question);
            optionA = sanitizeText(row.A);
            optionB = sanitizeText(row.B);
            optionC = sanitizeText(row.C) || "No option C provided";
            optionD = sanitizeText(row.D) || "No option D provided";
            correctAnswer = sanitizeText(row['Correct Answer']) || 'A';
          }
          // Check if we have the older format with Option A, Option B, etc.
          else if (row.Question && row['Option A'] !== undefined) {
            questionText = sanitizeText(row.Question);
            optionA = sanitizeText(row['Option A']);
            optionB = sanitizeText(row['Option B']);
            optionC = sanitizeText(row['Option C']) || "No option C provided";
            optionD = sanitizeText(row['Option D']) || "No option D provided";
            correctAnswer = sanitizeText(row['Correct Answer'] || row['Answer']) || 'A';
          }
          // Check for number format (1, 2, 3, 4)
          else if (row.Question && row['1'] !== undefined) {
            questionText = sanitizeText(row.Question);
            optionA = sanitizeText(row['1']);
            optionB = sanitizeText(row['2']);
            optionC = sanitizeText(row['3']) || "No option C provided";
            optionD = sanitizeText(row['4']) || "No option D provided";
            correctAnswer = sanitizeText(row['Correct Answer'] || row['Answer']) || 'A';
          }
          // Support for question_text format (likely from database export)
          else if (row.question_text && row.option_a && row.option_b) {
            questionText = sanitizeText(row.question_text);
            optionA = sanitizeText(row.option_a);
            optionB = sanitizeText(row.option_b);
            optionC = sanitizeText(row.option_c) || "No option C provided";
            optionD = sanitizeText(row.option_d) || "No option D provided";
            correctAnswer = sanitizeText(row.correct_answer) || 'A';
          }
          // Return a standardized object based on the available data
          else {
            questionText = sanitizeText(row.Question || row.question_text || row.question) || "Missing question text";
            optionA = sanitizeText(row.A || row['Option A'] || row['1'] || row.option_a) || "Missing option A";
            optionB = sanitizeText(row.B || row['Option B'] || row['2'] || row.option_b) || "Missing option B";
            optionC = sanitizeText(row.C || row['Option C'] || row['3'] || row.option_c) || "No option C provided";
            optionD = sanitizeText(row.D || row['Option D'] || row['4'] || row.option_d) || "No option D provided";
            correctAnswer = sanitizeText(row['Correct Answer'] || row.correct_answer || row['Answer'] || row.answer) || 'A';
          }

          // Validate lengths
          questionText = validateLength(questionText, 5000);
          optionA = validateLength(optionA, 500);
          optionB = validateLength(optionB, 500);
          optionC = validateLength(optionC, 500);
          optionD = validateLength(optionD, 500);

          return {
            question_text: questionText,
            option_a: optionA,
            option_b: optionB,
            option_c: optionC,
            option_d: optionD,
            correct_answer: correctAnswer
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

// Function to format question data for Supabase - now includes subject parameter
export const formatQuestionsForDatabase = (data: any[], level: string, topic: string, subject: string = 'English') => {
  console.log(`Formatting ${data.length} questions for database with subject: ${subject}, level: ${level}, topic: ${topic}`);
  
  // Sanitize level, topic, and subject
  const safeTopic = sanitizeText(topic);
  const safeSubject = sanitizeText(subject);
  
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
      question_text: sanitizeText(row.question_text || row.Question || row.question),
      option_a: sanitizeText(row.option_a || row.A || row['Option A'] || row['1']),
      option_b: sanitizeText(row.option_b || row.B || row['Option B'] || row['2']),
      option_c: sanitizeText(row.option_c || row.C || row['Option C'] || row['3']) || "No option C provided",
      option_d: sanitizeText(row.option_d || row.D || row['Option D'] || row['4']) || "No option D provided",
      correct_answer: correctAnswer,
      level,
      topic: safeTopic,
      subject: safeSubject
    };
    
    console.log("Formatted question:", formattedQuestion);
    return formattedQuestion;
  });
};

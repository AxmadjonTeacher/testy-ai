
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

// Add more utility functions as needed

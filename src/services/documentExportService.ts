
import type { Database } from "@/integrations/supabase/types";

type Question = Database["public"]["Tables"]["questions"]["Row"];
type GeneratedTest = Database["public"]["Tables"]["generated_tests"]["Row"];

interface TestExportData {
  title: string;
  teacher: string | null;
  level: string;
  grade?: string;
  questions: Question[];
  includeAnswers: boolean;
  dateGenerated: string;
}

/**
 * Converts the test data to a Word document blob
 */
export const generateWordDocument = async (testData: TestExportData): Promise<Blob> => {
  // In a real implementation, this would use a library like docx or similar
  // to generate a proper Word document. For now, we'll create a simple HTML
  // representation and convert it to a Blob to simulate the download
  
  const { title, teacher, level, grade, questions, includeAnswers, dateGenerated } = testData;
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .question { margin-bottom: 20px; }
        .options { margin-left: 20px; }
        .answer-key { margin-top: 40px; border-top: 1px solid #ccc; padding-top: 20px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${title}</h1>
        <p>Level: ${level}</p>
        ${teacher ? `<p>Teacher: ${teacher}</p>` : ''}
        ${grade ? `<p>Grade: ${grade}</p>` : ''}
        <p>Date: ${dateGenerated}</p>
      </div>
      
      <div class="questions">
        ${questions.map((q, index) => `
          <div class="question">
            <p><strong>${index + 1}. ${q.question_text}</strong></p>
            <div class="options">
              <p>A) ${q.option_a}</p>
              <p>B) ${q.option_b}</p>
              <p>C) ${q.option_c}</p>
              <p>D) ${q.option_d}</p>
            </div>
          </div>
        `).join('')}
      </div>
      
      ${includeAnswers ? `
        <div class="answer-key">
          <h2>Answer Key</h2>
          ${questions.map((q, index) => `
            <p>${index + 1}. ${q.correct_answer}</p>
          `).join('')}
        </div>
      ` : ''}
    </body>
    </html>
  `;
  
  // Create a Blob with the HTML content
  const blob = new Blob([htmlContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  
  return blob;
};

/**
 * Downloads the generated document
 */
export const downloadDocument = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

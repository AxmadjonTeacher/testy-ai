
import { Document, Paragraph } from 'docx';
import { Packer } from 'docx';
import { documentStyles, pageMargins } from './documentConfig';
import { 
  createEnhancedHeader,
  createTestInfoParagraph,
  createStudentInfoParagraph,
  createInstructionsParagraph,
  createQuestionParagraph,
  createAnswerKeySection
} from './documentComponents';
import { fetchImageData } from './documentUtils';
import type { TestExportData, Question } from '../documentTypes';

/**
 * Generates the Word document content for the test
 */
export const generateWordDocument = async (testData: TestExportData): Promise<Blob> => {
  const { title, teacher, level, grade, questions, includeAnswers } = testData;
  
  // Create document sections
  const documentChildren: Paragraph[] = [];
  
  // Add enhanced header with logo
  const headerParagraphs = await createEnhancedHeader();
  documentChildren.push(...headerParagraphs);
  
  // Add test information
  documentChildren.push(createTestInfoParagraph(level, grade || null, teacher || null));
  
  // Add student information fields
  documentChildren.push(createStudentInfoParagraph());
  
  // Add instructions
  documentChildren.push(createInstructionsParagraph());
  
  // Track question counter for numbering
  let questionCounter = 0;
  
  // Add regular questions
  questions.forEach(question => {
    const questionParagraphs = createQuestionParagraph(question, questionCounter);
    documentChildren.push(...questionParagraphs);
    questionCounter++;
  });
  
  console.log(`Creating document with ${questions.length} questions`);
  
  // Add answer key if requested
  if (includeAnswers) {
    const answerKeyParagraphs = createAnswerKeySection(questions);
    documentChildren.push(...answerKeyParagraphs);
  }
  
  // Create document with enhanced styling
  const doc = new Document({
    styles: documentStyles,
    sections: [
      {
        properties: {
          page: {
            margin: pageMargins,
          },
        },
        children: documentChildren.filter(child => child !== null),
      },
    ],
  });
  
  // Convert to blob
  return await Packer.toBlob(doc);
};


import { Document, Paragraph } from 'docx';
import { Packer } from 'docx';
import { documentStyles, pageMargins } from './documentConfig';
import { 
  createLogoHeader,
  createTestInfoParagraph,
  createStudentInfoParagraph,
  createInstructionsParagraph,
  createQuestionParagraph,
  createAnswerKeySection
} from './documentComponents';
import type { TestExportData } from '../documentTypes';

/**
 * Generates the Word document content for the test
 */
export const generateWordDocument = async (testData: TestExportData): Promise<Blob> => {
  const { title, teacher, level, grade, questions, includeAnswers } = testData;
  
  // Create document sections
  const documentChildren: Paragraph[] = [];
  
  // Add logo
  documentChildren.push(await createLogoHeader());
  
  // Add test information
  documentChildren.push(createTestInfoParagraph(level, grade, teacher || null));
  
  // Add student information fields
  documentChildren.push(createStudentInfoParagraph());
  
  // Add instructions
  documentChildren.push(createInstructionsParagraph());
  
  // Add questions
  questions.forEach((question, index) => {
    const questionParagraphs = createQuestionParagraph(question, index);
    documentChildren.push(...questionParagraphs);
  });
  
  // Add answer key if requested
  if (includeAnswers) {
    const answerKeyParagraphs = createAnswerKeySection(questions);
    documentChildren.push(...answerKeyParagraphs);
  }
  
  // Create document
  const doc = new Document({
    styles: documentStyles,
    sections: [
      {
        properties: {
          page: {
            margin: pageMargins,
          },
        },
        children: documentChildren,
      },
    ],
  });
  
  // Convert to blob
  return await Packer.toBlob(doc);
};

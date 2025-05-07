
import { Document, Paragraph } from 'docx';
import { Packer } from 'docx';
import { documentStyles, pageMargins } from './documentConfig';
import { 
  createLogoHeader,
  createTestInfoParagraph,
  createStudentInfoParagraph,
  createInstructionsParagraph,
  createQuestionParagraph,
  createReadingPassageParagraph,
  createAnswerKeySection
} from './documentComponents';
import type { TestExportData, ReadingPassageGroup, Question } from '../documentTypes';

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
  
  // Group reading questions by passage
  const readingPassages: Record<string, Question[]> = {};
  const regularQuestions: Question[] = [];
  
  questions.forEach(question => {
    if (question.question_type === 'reading' && question.reading_passage) {
      if (!readingPassages[question.reading_passage]) {
        readingPassages[question.reading_passage] = [];
      }
      readingPassages[question.reading_passage].push(question);
    } else {
      regularQuestions.push(question);
    }
  });
  
  // Track question counter for numbering
  let questionCounter = 0;
  
  // Add reading passages and their questions first
  Object.entries(readingPassages).forEach(([passage, passageQuestions]) => {
    // Add the reading passage
    if (passage && passage.trim()) {
      const passageParagraphs = createReadingPassageParagraph(passage);
      documentChildren.push(...passageParagraphs);
      
      // Add questions for this passage
      passageQuestions.forEach(question => {
        const questionParagraphs = createQuestionParagraph(question, questionCounter);
        documentChildren.push(...questionParagraphs);
        questionCounter++;
      });
    }
  });
  
  // Add regular questions
  regularQuestions.forEach(question => {
    const questionParagraphs = createQuestionParagraph(question, questionCounter);
    documentChildren.push(...questionParagraphs);
    questionCounter++;
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

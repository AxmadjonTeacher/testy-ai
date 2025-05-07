
import { Paragraph, TextRun, AlignmentType } from 'docx';
import { textStyles, spacingConfig } from '../documentConfig';
import type { Question } from '../../documentTypes';

/**
 * Creates a reading passage paragraph
 */
export function createReadingPassageParagraph(passage: string): Paragraph[] {
  return [
    // Reading Title
    new Paragraph({
      children: [
        new TextRun({
          text: "Reading Passage",
          ...textStyles.heading,
        }),
      ],
      spacing: {
        before: spacingConfig.beforeSection,
        after: spacingConfig.afterTitle,
      },
    }),
    
    // Reading Instructions
    new Paragraph({
      children: [
        new TextRun({
          text: "Read the passage below and answer the questions that follow.",
          ...textStyles.normal,
        }),
      ],
      spacing: {
        after: spacingConfig.afterInstructions,
      },
    }),
    
    // Reading passage itself
    new Paragraph({
      children: [
        new TextRun({
          text: passage,
          ...textStyles.normal,
        }),
      ],
      spacing: {
        after: spacingConfig.afterReadingPassage,
      },
    }),
  ];
}

/**
 * Creates a question paragraph with options
 */
export function createQuestionParagraph(question: Question, index: number): Paragraph[] {
  // Skip creating the reading passage here as it will be handled separately
  return [
    // Question text (bold)
    new Paragraph({
      children: [
        new TextRun({
          text: `${index + 1}. ${question.question_text}`,
          ...textStyles.bold,
        }),
      ],
      spacing: {
        after: spacingConfig.afterQuestionText,
      },
    }),
    
    // Changed from a single paragraph to multiple paragraphs, one for each option
    // Option A
    new Paragraph({
      children: [
        new TextRun({
          text: `a) ${question.option_a}`,
          ...textStyles.normal,
        }),
      ],
      indent: {
        left: 720, // 0.5 inch indentation
      },
      spacing: {
        after: spacingConfig.betweenOptions,
      },
    }),
    
    // Option B
    new Paragraph({
      children: [
        new TextRun({
          text: `b) ${question.option_b}`,
          ...textStyles.normal,
        }),
      ],
      indent: {
        left: 720, // 0.5 inch indentation
      },
      spacing: {
        after: spacingConfig.betweenOptions,
      },
    }),
    
    // Option C
    new Paragraph({
      children: [
        new TextRun({
          text: `c) ${question.option_c}`,
          ...textStyles.normal,
        }),
      ],
      indent: {
        left: 720, // 0.5 inch indentation
      },
      spacing: {
        after: spacingConfig.betweenOptions,
      },
    }),
    
    // Option D
    new Paragraph({
      children: [
        new TextRun({
          text: `d) ${question.option_d}`,
          ...textStyles.normal,
        }),
      ],
      indent: {
        left: 720, // 0.5 inch indentation
      },
      spacing: {
        after: spacingConfig.betweenQuestions, // More spacing after the last option
      },
    }),
  ];
}

/**
 * Creates the answer key section
 */
export function createAnswerKeySection(questions: Question[]): Paragraph[] {
  const answerKeyParagraphs: Paragraph[] = [
    new Paragraph({
      pageBreakBefore: true,
      children: [
        new TextRun({
          text: "Answer Key",
          bold: true,
          size: 28, // 14pt
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: {
        after: spacingConfig.afterInstructions,
      },
    }),
  ];
  
  questions.forEach((question, index) => {
    answerKeyParagraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${index + 1}. `,
            ...textStyles.bold,
          }),
          new TextRun({
            text: question.correct_answer,
            ...textStyles.normal,
          }),
        ],
      })
    );
  });
  
  return answerKeyParagraphs;
}

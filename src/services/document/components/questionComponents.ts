
import { Paragraph, TextRun, AlignmentType } from 'docx';
import { textStyles, spacingConfig } from '../documentConfig';
import type { Question } from '../../documentTypes';

/**
 * Creates a question paragraph with options
 */
export function createQuestionParagraph(question: Question, index: number): Paragraph[] {
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
    
    // Options on the same line with lowercase letters (not bold)
    new Paragraph({
      children: [
        new TextRun({
          text: `a) ${question.option_a}`,
          ...textStyles.normal,
        }),
        new TextRun({
          text: "\t\t", // Use double tabs for more spacing
        }),
        new TextRun({
          text: `b) ${question.option_b}`,
          ...textStyles.normal,
        }),
        new TextRun({
          text: "\t\t", // Use double tabs for more spacing
        }),
        new TextRun({
          text: `c) ${question.option_c}`,
          ...textStyles.normal,
        }),
        new TextRun({
          text: "\t\t", // Use double tabs for more spacing
        }),
        new TextRun({
          text: `d) ${question.option_d}`,
          ...textStyles.normal,
        }),
      ],
      tabStops: [
        {
          type: 'left',
          position: 2000, // Increased from 1440
        },
        {
          type: 'left', 
          position: 4000, // Increased from 2880
        },
        {
          type: 'left',
          position: 6000, // Increased from 4320
        },
      ],
      spacing: {
        after: spacingConfig.betweenQuestions,
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

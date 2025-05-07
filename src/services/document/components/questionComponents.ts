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
    
    // Options in a single line with proper tab stops
    new Paragraph({
      children: [
        new TextRun({
          text: `a) ${question.option_a}`,
          ...textStyles.normal,
        }),
        new TextRun({ text: "\t" }),
        new TextRun({
          text: `b) ${question.option_b}`,
          ...textStyles.normal,
        }),
        new TextRun({ text: "\t" }),
        new TextRun({
          text: `c) ${question.option_c}`,
          ...textStyles.normal,
        }),
        new TextRun({ text: "\t" }),
        new TextRun({
          text: `d) ${question.option_d}`,
          ...textStyles.normal,
        }),
      ],
      tabStops: [
        {
          type: 'left',
          position: 2880, // 2 inch
        },
        {
          type: 'left', 
          position: 5760, // 4 inch
        },
        {
          type: 'left',
          position: 8640, // 6 inch
        },
      ],
      indent: {
        left: 720, // 0.5 inch general indent for all options
      },
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


import { Paragraph, TextRun, AlignmentType } from 'docx';
import { textStyles, spacingConfig } from '../documentConfig';
import type { Question } from '../../documentTypes';

/**
 * Creates a question paragraph with options
 */
export function createQuestionParagraph(question: Question, index: number): Paragraph[] {
  return [
    // Question text (bold) - no spacing after so options appear on next line
    new Paragraph({
      children: [
        new TextRun({
          text: `${index + 1}. ${question.question_text}`,
          ...textStyles.bold,
        }),
      ],
      spacing: {
        after: 0, // No spacing between question and options
      },
    }),
    
    // All options on one line with spacing
    new Paragraph({
      children: [
        new TextRun({
          text: `a) ${question.option_a}`,
          ...textStyles.normal,
        }),
        new TextRun({
          text: `     b) ${question.option_b}`,
          ...textStyles.normal,
        }),
        new TextRun({
          text: `     c) ${question.option_c}`,
          ...textStyles.normal,
        }),
        new TextRun({
          text: `     d) ${question.option_d}`,
          ...textStyles.normal,
        }),
      ],
      indent: {
        left: 720, // 0.5 inch indentation
      },
      spacing: {
        after: spacingConfig.betweenQuestions, // Empty line after options before next question
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
          size: 24, // 12pt
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


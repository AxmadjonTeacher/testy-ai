import { Paragraph, TextRun, AlignmentType } from 'docx';
import { textStyles, spacingConfig } from '../documentConfig';
import type { Question } from '../../documentTypes';

/**
 * Creates a question paragraph with options inline (horizontal)
 */
export function createQuestionParagraph(question: Question, index: number): Paragraph[] {
  return [
    new Paragraph({
      children: [
        new TextRun({
          text: `${index + 1}. ${question.question_text}`,
          ...textStyles.bold,
        }),
        new TextRun({
          text: "    ", // 4 spaces gap before options
          ...textStyles.normal,
        }),
        new TextRun({
          text: `A) ${question.option_a}    `,
          ...textStyles.normal,
        }),
        new TextRun({
          text: `B) ${question.option_b}    `,
          ...textStyles.normal,
        }),
        new TextRun({
          text: `C) ${question.option_c}    `,
          ...textStyles.normal,
        }),
        new TextRun({
          text: `D) ${question.option_d}`,
          ...textStyles.normal,
        }),
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

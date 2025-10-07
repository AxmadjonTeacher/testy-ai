
import { Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle, VerticalAlign, ImageRun } from 'docx';
import { textStyles, spacingConfig } from '../documentConfig';
import type { Question } from '../../documentTypes';
import { fetchImageData } from '../documentUtils';

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
    
    // All options on one line
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
    }),
    
    // Empty paragraph for spacing between questions (like Python's doc.add_paragraph(""))
    new Paragraph({
      children: [new TextRun({ text: "" })],
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
  
  // Add empty line before teacher name
  answerKeyParagraphs.push(
    new Paragraph({
      children: [new TextRun({ text: "" })],
      spacing: {
        after: 240, // One empty line
      },
    })
  );
  
  // Add "Prepared by Teacher" text
  answerKeyParagraphs.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "Prepared by Teacher: Yodgorov Axmadjon",
          bold: true,
          size: 24, // 12pt
        }),
      ],
      alignment: AlignmentType.LEFT,
    })
  );
  
  return answerKeyParagraphs;
}

/**
 * Creates the answer sheet section for 15-question tests
 */
export async function createAnswerSheetSection(): Promise<Paragraph[]> {
  const sections: Paragraph[] = [];
  
  // Add page break
  sections.push(
    new Paragraph({
      pageBreakBefore: true,
      children: [new TextRun({ text: "" })],
    })
  );
  
  // Add the answer sheet image
  sections.push(
    new Paragraph({
      children: [
        new ImageRun({
          data: await fetchImageData('/answer-sheet-15.jpeg'),
          transformation: {
            width: 384, // 4 inches (4 * 96 DPI)
            height: 537, // 5.59 inches (5.59 * 96 DPI)
          },
          type: "jpg",
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: {
        after: 480,
      },
    })
  );
  
  return sections;
}


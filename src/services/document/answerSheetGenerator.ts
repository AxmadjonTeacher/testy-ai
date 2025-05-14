
import { Table, TableRow, TableCell, BorderStyle, WidthType, Paragraph, TextRun, AlignmentType } from 'docx';
import type { Question } from '../documentTypes';

/**
 * Create the circular answer sheet as shown in the image
 */
export function createCircularAnswerSheet(numQuestions: number): Table {
  // Calculate how many questions to show in each column
  const halfLength = Math.ceil(numQuestions / 2);
  const firstColumn = Array.from({ length: Math.min(halfLength, numQuestions) }, (_, i) => i + 1);
  const secondColumn = Array.from({ length: Math.max(0, numQuestions - halfLength) }, (_, i) => i + halfLength + 1);

  return new Table({
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
            },
            children: firstColumn.map(num => createQuestionRowWithCircles(num)),
          }),
          ...(secondColumn.length > 0 ? [
            new TableCell({
              borders: {
                top: { style: BorderStyle.NONE },
                bottom: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.NONE },
              },
              children: [
                ...secondColumn.map(num => createQuestionRowWithCircles(num)),
                // Add the ID numbers box if there's a second column
                createStudentIDBox(),
              ],
            }),
          ] : []),
        ],
      }),
    ],
  });
}

/**
 * Create a row with the question number and circular options
 */
function createQuestionRowWithCircles(questionNum: number): Paragraph {
  const options = ['A', 'B', 'C', 'D'];
  
  // Create a paragraph with the question number and options in circles
  return new Paragraph({
    children: [
      new TextRun({
        text: `${questionNum} `,
        bold: true,
      }),
      ...options.map(option => [
        new TextRun({
          text: ` (`,
        }),
        new TextRun({
          text: option,
        }),
        new TextRun({
          text: `) `,
        }),
      ]).flat(),
    ],
    spacing: {
      after: 120,
    },
  });
}

/**
 * Create the student ID box section
 */
function createStudentIDBox(): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: "o'quvchi IDsi",
        bold: true,
      }),
    ],
    border: {
      top: { style: BorderStyle.SINGLE, size: 1 },
      bottom: { style: BorderStyle.SINGLE, size: 1 },
      left: { style: BorderStyle.SINGLE, size: 1 },
      right: { style: BorderStyle.SINGLE, size: 1 },
    },
    alignment: AlignmentType.CENTER,
    spacing: {
      before: 200,
      after: 120,
    },
  });
}

/**
 * Create the student name header for the answer sheet
 */
export function createStudentNameHeader(): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: "Ism va familiya (To'rtburchak tashqarisiga yozmang)",
        bold: true,
      }),
    ],
    border: {
      top: { style: BorderStyle.SINGLE, size: 1 },
      bottom: { style: BorderStyle.SINGLE, size: 1 },
      left: { style: BorderStyle.SINGLE, size: 1 },
      right: { style: BorderStyle.SINGLE, size: 1 },
    },
    alignment: AlignmentType.CENTER,
    spacing: {
      after: 360,
    },
  });
}

/**
 * Create a complete answer sheet section with a title
 */
export function createAnswerSheetSection(numQuestions: number): Paragraph[] {
  // Only generate answer sheets for specific question counts
  if (![10, 15, 20, 30].includes(numQuestions)) {
    return [];
  }
  
  return [
    new Paragraph({
      pageBreakBefore: true,
      children: [
        new TextRun({
          text: "Answer Sheet",
          bold: true,
          size: 24, // 12pt
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: {
        after: 240,
      },
    }),
    createStudentNameHeader(),
    new Paragraph({
      children: [
        // This paragraph contains the Table, which will be rendered
      ],
      spacing: {
        after: 240,
      },
      children: [{ type: "table", table: createCircularAnswerSheet(numQuestions) }],
    }),
  ];
}

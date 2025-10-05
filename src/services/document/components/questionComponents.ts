
import { Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle, VerticalAlign } from 'docx';
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
        after: 480, // One full empty line after options before next question
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
export function createAnswerSheetSection(): (Paragraph | Table)[] {
  const sections: (Paragraph | Table)[] = [];
  
  // Add page break
  sections.push(
    new Paragraph({
      pageBreakBefore: true,
      children: [new TextRun({ text: "" })],
    })
  );
  
  // Header text box
  sections.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "Ism va familiya (To`rtburchak tashqarisiga yozmang)",
          size: 20, // 10pt
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 240 },
    })
  );
  
  // Create the answer sheet table with 15 questions (2 columns: 1-13 on left, 14-15 on right)
  const rows: TableRow[] = [];
  
  // Questions 1-13 on the left, 14-15 on the right
  for (let i = 0; i < 13; i++) {
    const leftQuestionNum = i + 1;
    const rightQuestionNum = i + 14;
    
    const leftCells = [
      new TableCell({
        children: [
          new Paragraph({
            children: [new TextRun({ text: leftQuestionNum.toString(), size: 20 })],
            alignment: AlignmentType.CENTER,
          }),
        ],
        width: { size: 8, type: WidthType.PERCENTAGE },
        verticalAlign: VerticalAlign.CENTER,
      }),
      ...['A', 'B', 'C', 'D'].map(
        (option) =>
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: option, size: 18 })],
                alignment: AlignmentType.CENTER,
              }),
            ],
            width: { size: 8, type: WidthType.PERCENTAGE },
            verticalAlign: VerticalAlign.CENTER,
          })
      ),
    ];
    
    const rightCells = rightQuestionNum <= 15
      ? [
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: rightQuestionNum.toString(), size: 20 })],
                alignment: AlignmentType.CENTER,
              }),
            ],
            width: { size: 8, type: WidthType.PERCENTAGE },
            verticalAlign: VerticalAlign.CENTER,
          }),
          ...['A', 'B', 'C', 'D'].map(
            (option) =>
              new TableCell({
                children: [
                  new Paragraph({
                    children: [new TextRun({ text: option, size: 18 })],
                    alignment: AlignmentType.CENTER,
                  }),
                ],
                width: { size: 8, type: WidthType.PERCENTAGE },
                verticalAlign: VerticalAlign.CENTER,
              })
          ),
        ]
      : Array(5).fill(
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: "" })] })],
            width: { size: 8, type: WidthType.PERCENTAGE },
          })
        );
    
    rows.push(
      new TableRow({
        children: [...leftCells, ...rightCells],
        height: { value: 400, rule: "exact" },
      })
    );
  }
  
  const answerTable = new Table({
    rows,
    width: { size: 60, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1 },
      bottom: { style: BorderStyle.SINGLE, size: 1 },
      left: { style: BorderStyle.SINGLE, size: 1 },
      right: { style: BorderStyle.SINGLE, size: 1 },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1 },
      insideVertical: { style: BorderStyle.SINGLE, size: 1 },
    },
  });
  
  sections.push(answerTable);
  
  return sections;
}


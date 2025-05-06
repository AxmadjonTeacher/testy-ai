import { Document, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, BorderStyle, WidthType, HeadingLevel, PageNumber, Footer, Header, ImageRun, ExternalHyperlink } from 'docx';
import { Packer } from "docx";
import type { Database } from "@/integrations/supabase/types";

type Question = Database["public"]["Tables"]["questions"]["Row"];
type GeneratedTest = Database["public"]["Tables"]["generated_tests"]["Row"];

export interface TestExportData {
  title: string;
  teacher: string | null;
  level: string;
  grade?: string;
  questions: Question[];
  includeAnswers: boolean;
  dateGenerated: string;
}

/**
 * Converts the test data to a Word document blob
 */
export const generateWordDocument = async (testData: TestExportData): Promise<Blob> => {
  const { title, teacher, level, grade, questions, includeAnswers, dateGenerated } = testData;
  
  // Create document
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // School Logo - using an image (we'll use a URL method but this could be changed to load from file)
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new ImageRun({
                data: await fetchImageData('/lovable-uploads/4c0b0f63-7ceb-4c2e-8a95-d86e02ca20f9.png'),
                transformation: {
                  width: 300,
                  height: 100,
                },
                type: 'png', // Add the required type property
              }),
            ],
            spacing: {
              after: 300,
            },
          }),
          
          // Test information combined in one line
          new Paragraph({
            children: [
              new TextRun({
                text: "Level: ",
                bold: true,
              }),
              new TextRun({
                text: level + " ",
              }),
              new TextRun({
                text: "Grade: ",
                bold: true,
              }),
              new TextRun({
                text: grade || "Not specified" + " ",
              }),
              new TextRun({
                text: "Teacher: ",
                bold: true,
              }),
              new TextRun({
                text: teacher || "Not specified",
              }),
            ],
            spacing: {
              after: 200,
            },
          }),
          
          // Student information fields
          new Paragraph({
            children: [
              new TextRun({
                text: "Student's Name: _______________________________",
              }),
            ],
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "Class: _______________________________",
              }),
            ],
            spacing: {
              after: 400,
            },
          }),
          
          // Instructions
          new Paragraph({
            children: [
              new TextRun({
                text: "Instructions: Answer all questions by selecting the correct option.",
                bold: true,
              }),
            ],
            spacing: {
              after: 300,
            },
          }),
          
          // Questions with horizontally aligned options
          ...questions.map((question, index) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${index + 1}. ${question.question_text}`,
                }),
              ],
              spacing: {
                after: 120,
              },
            }),
            
            // Options in a horizontally aligned format
            new Paragraph({
              children: [
                new TextRun({
                  text: `A) ${question.option_a}`,
                }),
                new TextRun({
                  text: `\t\tB) ${question.option_b}`,
                }),
                new TextRun({
                  text: `\t\tC) ${question.option_c}`,
                }),
                new TextRun({
                  text: `\t\tD) ${question.option_d}`,
                }),
              ],
              tabStops: [
                {
                  type: 'left',
                  position: 1440, // 1 inch in twips
                },
                {
                  type: 'left', 
                  position: 2880, // 2 inches in twips
                },
                {
                  type: 'left',
                  position: 4320, // 3 inches in twips
                },
              ],
              spacing: {
                after: 240,
              },
            }),
          ]).flat(),
          
          // Answer sheet
          new Paragraph({
            pageBreakBefore: true,
            children: [
              new TextRun({
                text: "Answer Sheet",
                bold: true,
                size: 28,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 300,
            },
          }),
          
          createAnswerBox(),
          
          // Create circular answer sheet as shown in the image
          createCircularAnswerSheet(questions.length),
          
          // Answer key if includeAnswers is true
          ...(includeAnswers ? [
            new Paragraph({
              pageBreakBefore: true,
              children: [
                new TextRun({
                  text: "Answer Key",
                  bold: true,
                  size: 28,
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: {
                after: 300,
              },
            }),
            
            ...questions.map((question, index) => {
              return new Paragraph({
                children: [
                  new TextRun({
                    text: `${index + 1}. `,
                    bold: true,
                  }),
                  new TextRun({
                    text: question.correct_answer,
                  }),
                ],
              });
            }),
          ] : []),
        ],
      },
    ],
  });
  
  // Convert to blob
  return await Packer.toBlob(doc);
};

// Fetch the image data from a URL
async function fetchImageData(url: string): Promise<Uint8Array> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Uint8Array(await blob.arrayBuffer());
}

// Create the name box for the answer sheet
function createAnswerBox(): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: "Ism va familiya (To'rtburchak tashqarisiga yozmang)",
        bold: true,
      }),
    ],
    alignment: AlignmentType.CENTER,
    border: {
      top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
    },
    spacing: {
      after: 300,
    },
  });
}

// Create the circular answer sheet as shown in the image
function createCircularAnswerSheet(numQuestions: number): Table {
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

// Create a row with the question number and circular options
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

// Create the student ID box section
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

// Helper function to create table cells
function createTableCell(text: string, isHeader: boolean): TableCell {
  return new TableCell({
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text,
            bold: isHeader,
          }),
        ],
        alignment: isHeader ? AlignmentType.CENTER : AlignmentType.LEFT,
      }),
    ],
    borders: {
      top: {
        style: BorderStyle.SINGLE,
        size: 1,
      },
      bottom: {
        style: BorderStyle.SINGLE,
        size: 1,
      },
      left: {
        style: BorderStyle.SINGLE,
        size: 1,
      },
      right: {
        style: BorderStyle.SINGLE,
        size: 1,
      },
    },
  });
}

/**
 * Downloads the generated document
 */
export const downloadDocument = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

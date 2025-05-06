
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
          // Header with school logo
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "ENGLISH LANGUAGE SCHOOL",
                bold: true,
                size: 32,
              }),
            ],
          }),
          
          // Test title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: title,
                bold: true,
                size: 28,
              }),
            ],
            spacing: {
              after: 200,
            },
          }),
          
          // Test information
          new Paragraph({
            children: [
              new TextRun({
                text: "Level: ",
                bold: true,
              }),
              new TextRun({
                text: level,
              }),
            ],
          }),
          
          // Grade information (if provided)
          ...(grade ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Grade: ",
                  bold: true,
                }),
                new TextRun({
                  text: grade,
                }),
              ],
            }),
          ] : []),
          
          // Teacher information (if provided)
          ...(teacher ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Teacher: ",
                  bold: true,
                }),
                new TextRun({
                  text: teacher,
                }),
              ],
            }),
          ] : []),
          
          // Date information
          new Paragraph({
            children: [
              new TextRun({
                text: "Date: ",
                bold: true,
              }),
              new TextRun({
                text: dateGenerated,
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
          
          // Questions
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
            
            new Paragraph({
              indent: {
                left: 720, // 0.5 inch in twips
              },
              children: [
                new TextRun({
                  text: `A) ${question.option_a}`,
                }),
              ],
            }),
            
            new Paragraph({
              indent: {
                left: 720,
              },
              children: [
                new TextRun({
                  text: `B) ${question.option_b}`,
                }),
              ],
            }),
            
            new Paragraph({
              indent: {
                left: 720,
              },
              children: [
                new TextRun({
                  text: `C) ${question.option_c}`,
                }),
              ],
            }),
            
            new Paragraph({
              indent: {
                left: 720,
              },
              children: [
                new TextRun({
                  text: `D) ${question.option_d}`,
                }),
              ],
              spacing: {
                after: 240,
              },
            }),
          ]).flat(),
          
          // Answer sheet if includeAnswers is true
          ...(includeAnswers ? [
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
            
            // Create answer table with 5 columns (question number and options A, B, C, D)
            createAnswerTable(questions),
            
            // Answer key for teacher
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

// Helper function to create the answer table
function createAnswerTable(questions: Question[]): Table {
  const rows: TableRow[] = [];
  
  // Header row
  rows.push(
    new TableRow({
      children: [
        createTableCell("Question", true),
        createTableCell("A", true),
        createTableCell("B", true),
        createTableCell("C", true),
        createTableCell("D", true),
      ],
    })
  );
  
  // Create rows for each question
  for (let i = 0; i < questions.length; i++) {
    rows.push(
      new TableRow({
        children: [
          createTableCell(`${i + 1}`, true),
          createTableCell("", false),
          createTableCell("", false),
          createTableCell("", false),
          createTableCell("", false),
        ],
      })
    );
  }
  
  return new Table({
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    rows: rows,
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

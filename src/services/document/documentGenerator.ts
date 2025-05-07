
import { Document, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, BorderStyle, WidthType, HeadingLevel, PageNumber, Footer, Header, ImageRun, ExternalHyperlink } from 'docx';
import { Packer } from "docx";
import { createAnswerBox } from './documentUtils';
import { fetchImageData } from './documentUtils';
import type { TestExportData } from '../documentTypes';

/**
 * Generates the Word document content for the test
 */
export const generateWordDocument = async (testData: TestExportData): Promise<Blob> => {
  const { title, teacher, level, grade, questions, includeAnswers, dateGenerated } = testData;
  
  // Create document
  const doc = new Document({
    styles: {
      paragraphStyles: [
        {
          id: 'Normal',
          name: 'Normal',
          run: {
            size: 24, // 12pt (in half-points)
          },
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720, // 0.5 inch in twips (1 inch = 1440 twips)
              right: 720,
              bottom: 720,
              left: 720,
            },
          },
        },
        children: [
          // School Logo - with dimensions from the example (5.12in x 0.93in)
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new ImageRun({
                data: await fetchImageData('/lovable-uploads/4c0b0f63-7ceb-4c2e-8a95-d86e02ca20f9.png'),
                transformation: {
                  width: 492, // 5.12 inches in pixels (96 dpi)
                  height: 89, // 0.93 inches in pixels (96 dpi)
                },
                type: 'png', // Required type property
              }),
            ],
            spacing: {
              after: 240, // spacing after the logo
            },
          }),
          
          // Test information with hash symbols like in the example
          new Paragraph({
            children: [
              new TextRun({
                text: "#Level: ",
                bold: true,
                size: 24, // 12pt
              }),
              new TextRun({
                text: level + " ",
                size: 24, // 12pt
              }),
              new TextRun({
                text: "#Grade: ",
                bold: true,
                size: 24, // 12pt
              }),
              new TextRun({
                text: grade || "Not specified" + " ",
                size: 24, // 12pt
              }),
              new TextRun({
                text: "#Teacher: ",
                bold: true,
                size: 24, // 12pt
              }),
              new TextRun({
                text: teacher || "Not specified",
                size: 24, // 12pt
              }),
            ],
            spacing: {
              after: 240, // extra spacing after the test information
            },
          }),
          
          // Student information fields with horizontal layout
          new Paragraph({
            children: [
              new TextRun({
                text: "Student's name ",
                size: 24, // 12pt
              }),
              new TextRun({
                text: "_".repeat(50),
                size: 24, // 12pt
              }),
              new TextRun({
                text: "  Class ",
                size: 24, // 12pt
              }),
              new TextRun({
                text: "_".repeat(10),
                size: 24, // 12pt
              }),
            ],
            spacing: {
              after: 480, // more spacing after student info
            },
          }),
          
          // Instructions
          new Paragraph({
            children: [
              new TextRun({
                text: "Instructions: Answer all questions by selecting the correct option.",
                bold: true,
                size: 24, // 12pt
              }),
            ],
            spacing: {
              after: 360, // spacing after instructions
            },
          }),
          
          // Questions with horizontally aligned options in lowercase letters
          ...questions.map((question, index) => [
            // Question text (bold)
            new Paragraph({
              children: [
                new TextRun({
                  text: `${index + 1}. ${question.question_text}`,
                  bold: true,
                  size: 24, // 12pt
                }),
              ],
              spacing: {
                after: 120, // space after question text
              },
            }),
            
            // Options on the same line with lowercase letters (not bold)
            new Paragraph({
              children: [
                new TextRun({
                  text: `a) ${question.option_a}`,
                  size: 24, // 12pt
                }),
                new TextRun({
                  text: "\t",
                }),
                new TextRun({
                  text: `b) ${question.option_b}`,
                  size: 24, // 12pt
                }),
                new TextRun({
                  text: "\t",
                }),
                new TextRun({
                  text: `c) ${question.option_c}`,
                  size: 24, // 12pt
                }),
                new TextRun({
                  text: "\t",
                }),
                new TextRun({
                  text: `d) ${question.option_d}`,
                  size: 24, // 12pt
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
                after: 360, // more space between questions
              },
            }),
          ]).flat(),
          
          // Answer key if includeAnswers is true (with page break)
          ...(includeAnswers ? [
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
                after: 360,
              },
            }),
            
            ...questions.map((question, index) => {
              return new Paragraph({
                children: [
                  new TextRun({
                    text: `${index + 1}. `,
                    bold: true,
                    size: 24, // 12pt
                  }),
                  new TextRun({
                    text: question.correct_answer,
                    size: 24, // 12pt
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

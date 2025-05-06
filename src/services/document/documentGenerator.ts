
import { Document, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, BorderStyle, WidthType, HeadingLevel, PageNumber, Footer, Header, ImageRun, ExternalHyperlink } from 'docx';
import { Packer } from "docx";
import { createAnswerBox } from './documentUtils';
import { createCircularAnswerSheet } from './answerSheetGenerator';
import { fetchImageData } from './documentUtils';
import type { TestExportData } from '../documentTypes';

/**
 * Generates the Word document content for the test
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
                type: 'png', // Required type property
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


import { Paragraph, TextRun, AlignmentType, ImageRun } from 'docx';
import { fetchImageData } from './documentUtils';

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
      top: { style: "single", size: 1 },
      bottom: { style: "single", size: 1 },
      left: { style: "single", size: 1 },
      right: { style: "single", size: 1 },
    },
    alignment: AlignmentType.CENTER,
    spacing: {
      after: 360,
    },
  });
}

/**
 * Create a complete answer sheet section with a title and image based on question count
 */
export function createAnswerSheetSection(numQuestions: number): Paragraph[] {
  // Only generate answer sheets for specific question counts
  if (![10, 15, 20, 30].includes(numQuestions)) {
    return [];
  }
  
  const paragraphs: Paragraph[] = [];
  
  // Add title with page break
  paragraphs.push(
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
    })
  );
  
  // Add student name header
  paragraphs.push(createStudentNameHeader());
  
  // Create the answer sheet image paragraph
  let imagePath = "";
  
  // Select the appropriate image template based on question count
  switch(numQuestions) {
    case 10:
      imagePath = "/lovable-uploads/d6f188e7-4c3d-458c-8e14-a691cbc25d3f.png";
      break;
    case 15:
      imagePath = "/lovable-uploads/f892cc19-f5ab-4160-b0c2-39375038b473.png";
      break;
    case 20:
      imagePath = "/lovable-uploads/3c401aa9-aed6-4f52-854b-ae15e1760f3e.png";
      break;
    case 30:
      imagePath = "/lovable-uploads/8c8025fd-2279-43b0-a2eb-e0f0cccdb536.png";
      break;
  }
  
  // Add the image to the document - but don't try to load it here
  // Instead use an empty Uint8Array which will be replaced at runtime
  paragraphs.push(
    new Paragraph({
      children: [
        new ImageRun({
          data: new Uint8Array(), // Empty placeholder - will be replaced in documentGenerator
          transformation: {
            width: 500,
            height: 650,
          },
          altText: `Answer sheet template for ${numQuestions} questions`,
        }),
      ],
      alignment: AlignmentType.CENTER,
    })
  );
  
  // Add a note to inform the user that the real image will be shown in the downloaded file
  paragraphs.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `Answer sheet for ${numQuestions} questions will appear here in the downloaded document.`,
          italics: true,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: {
        before: 200,
      },
    })
  );
  
  return paragraphs;
}

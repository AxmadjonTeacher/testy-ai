
import { Paragraph, ImageRun, AlignmentType, TextRun } from 'docx';
import { fetchImageData, getNextSaturdayFormatted } from '../documentUtils';
import { logoConfig } from '../documentConfig';

/**
 * Creates the school logo paragraph with enhanced styling
 */
export async function createLogoHeader(): Promise<Paragraph> {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new ImageRun({
        data: await fetchImageData('/lovable-uploads/4c0b0f63-7ceb-4c2e-8a95-d86e02ca20f9.png'),
        transformation: {
          width: logoConfig.width,
          height: logoConfig.height,
        },
        type: "png",
      }),
    ],
    spacing: {
      after: logoConfig.spacingAfter,
      line: 360, // Adding line spacing for better separation
      before: 240, // Add spacing before instead of margin top
    },
    border: {
      bottom: {
        color: "999999",
        space: 1,
        style: "single",
        size: 6,
      },
    },
  });
}

/**
 * Creates a professional header with school name and next Saturday date
 */
export async function createEnhancedHeader(): Promise<Paragraph[]> {
  const paragraphs: Paragraph[] = [];
  
  // Logo paragraph
  paragraphs.push(await createLogoHeader());
  
  // Date paragraph - next Saturday
  const nextSaturday = getNextSaturdayFormatted();
  paragraphs.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: nextSaturday,
          bold: true,
          size: 24, // 12pt
          font: "Times New Roman",
        }),
      ],
      spacing: {
        before: 120,
        after: 240,
      },
    })
  );
  
  return paragraphs;
}

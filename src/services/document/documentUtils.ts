
import { AlignmentType, Paragraph, TextRun, Table, TableRow, TableCell, BorderStyle, WidthType } from 'docx';

/**
 * Fetch the image data from a URL
 */
export async function fetchImageData(url: string): Promise<Uint8Array> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Uint8Array(await blob.arrayBuffer());
}

/**
 * Create the name box for the answer sheet
 */
export function createAnswerBox(): Paragraph {
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

/**
 * Helper function to create table cells
 */
export function createTableCell(text: string, isHeader: boolean): TableCell {
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


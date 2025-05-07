
import { AlignmentType, Paragraph, TextRun } from 'docx';

/**
 * Fetch the image data from a URL
 */
export async function fetchImageData(url: string): Promise<Uint8Array> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Uint8Array(await blob.arrayBuffer());
}


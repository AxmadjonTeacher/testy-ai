
import { Paragraph, ImageRun, AlignmentType } from 'docx';
import { fetchImageData } from '../documentUtils';
import { logoConfig } from '../documentConfig';

/**
 * Creates the school logo paragraph
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
      }),
    ],
    spacing: {
      after: logoConfig.spacingAfter,
    },
  });
}

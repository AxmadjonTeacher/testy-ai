
import { BorderStyle, WidthType, AlignmentType } from 'docx';

/**
 * Document styling configuration for test documents
 */
export const documentStyles = {
  paragraphStyles: [
    {
      id: 'Normal',
      name: 'Normal',
      run: {
        size: 24, // 12pt (in half-points)
      },
    },
  ],
};

/**
 * Page margin configuration
 */
export const pageMargins = {
  top: 720, // 0.5 inch in twips (1 inch = 1440 twips)
  right: 720,
  bottom: 720,
  left: 720,
};

/**
 * Logo dimensions for the document
 */
export const logoConfig = {
  width: 492, // 5.12 inches in pixels (96 dpi)
  height: 89, // 0.93 inches in pixels (96 dpi)
  type: "png" as "png" | "jpg" | "gif" | "bmp", // Explicitly typed as one of the accepted image types
  spacingAfter: 240, // spacing after the logo
};

/**
 * Text style configurations
 */
export const textStyles = {
  normal: {
    size: 24, // 12pt
  },
  bold: {
    size: 24, // 12pt
    bold: true,
  },
};

/**
 * Spacing configurations
 */
export const spacingConfig = {
  afterTestInfo: 240,
  afterStudentInfo: 480,
  afterInstructions: 360,
  afterQuestionText: 120,
  betweenOptions: 120, // Added spacing between each option
  betweenQuestions: 360,
};

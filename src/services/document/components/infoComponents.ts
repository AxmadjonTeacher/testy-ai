
import { Paragraph, TextRun } from 'docx';
import { textStyles, spacingConfig } from '../documentConfig';

/**
 * Creates the test information paragraph
 * - Now with improved spacing for inline layout (Level, Grade, Teacher) 
 */
export function createTestInfoParagraph(level: string, grade?: string, teacher?: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: "Level: ",
        ...textStyles.bold,
      }),
      new TextRun({
        text: level + "    ", // extra spaces for separation
        ...textStyles.normal,
      }),
      new TextRun({
        text: "Grade: ",
        ...textStyles.bold,
      }),
      new TextRun({
        text: (grade || "Not specified") + "    ",
        ...textStyles.normal,
      }),
      new TextRun({
        text: "Teacher: ",
        ...textStyles.bold,
      }),
      new TextRun({
        text: teacher || "Not specified",
        ...textStyles.normal,
      }),
    ],
    spacing: {
      after: spacingConfig.afterTestInfo,
    },
  });
}

/**
 * Creates the student information fields, with improved underline lengths and spacing
 */
export function createStudentInfoParagraph(): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: "Student's name ",
        ...textStyles.normal,
      }),
      new TextRun({
        text: "_".repeat(36),
        ...textStyles.normal,
      }),
      new TextRun({
        text: "    Class ",
        ...textStyles.normal,
      }),
      new TextRun({
        text: "_".repeat(5),
        ...textStyles.normal,
      }),
    ],
    spacing: {
      after: spacingConfig.afterStudentInfo,
    },
  });
}

/**
 * Creates the instructions paragraph
 */
export function createInstructionsParagraph(): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: "Instructions: Answer all questions by selecting the correct option.",
        ...textStyles.bold,
      }),
    ],
    spacing: {
      after: spacingConfig.afterInstructions,
    },
  });
}


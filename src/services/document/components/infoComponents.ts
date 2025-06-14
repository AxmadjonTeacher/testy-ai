
import { Paragraph, TextRun } from 'docx';
import { textStyles, spacingConfig } from '../documentConfig';

/**
 * Creates the test information paragraph
 */
export function createTestInfoParagraph(level: string, grade?: string, teacher?: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: "Level: ",
        ...textStyles.bold,
      }),
      new TextRun({
        text: level + " ",
        ...textStyles.normal,
      }),
      new TextRun({
        text: "Grade: ",
        ...textStyles.bold,
      }),
      new TextRun({
        text: grade || "Not specified" + " ",
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
 * Creates the student information fields
 */
export function createStudentInfoParagraph(): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: "Student's name ",
        ...textStyles.normal,
      }),
      new TextRun({
        text: "_".repeat(50),
        ...textStyles.normal,
      }),
      new TextRun({
        text: "  Class ",
        ...textStyles.normal,
      }),
      new TextRun({
        text: "_".repeat(10),
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


import { Paragraph, TextRun, AlignmentType, ImageRun } from 'docx';
import { fetchImageData } from './documentUtils';
import { logoConfig, textStyles, spacingConfig } from './documentConfig';
import type { Question } from '../documentTypes';

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
        type: logoConfig.type,
      }),
    ],
    spacing: {
      after: logoConfig.spacingAfter,
    },
  });
}

/**
 * Creates the test information paragraph
 */
export function createTestInfoParagraph(level: string, grade?: string, teacher?: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: "#Level: ",
        ...textStyles.bold,
      }),
      new TextRun({
        text: level + " ",
        ...textStyles.normal,
      }),
      new TextRun({
        text: "#Grade: ",
        ...textStyles.bold,
      }),
      new TextRun({
        text: grade || "Not specified" + " ",
        ...textStyles.normal,
      }),
      new TextRun({
        text: "#Teacher: ",
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

/**
 * Creates a question paragraph with options
 */
export function createQuestionParagraph(question: Question, index: number): Paragraph[] {
  return [
    // Question text (bold)
    new Paragraph({
      children: [
        new TextRun({
          text: `${index + 1}. ${question.question_text}`,
          ...textStyles.bold,
        }),
      ],
      spacing: {
        after: spacingConfig.afterQuestionText,
      },
    }),
    
    // Options on the same line with lowercase letters (not bold)
    new Paragraph({
      children: [
        new TextRun({
          text: `a) ${question.option_a}`,
          ...textStyles.normal,
        }),
        new TextRun({
          text: "\t",
        }),
        new TextRun({
          text: `b) ${question.option_b}`,
          ...textStyles.normal,
        }),
        new TextRun({
          text: "\t",
        }),
        new TextRun({
          text: `c) ${question.option_c}`,
          ...textStyles.normal,
        }),
        new TextRun({
          text: "\t",
        }),
        new TextRun({
          text: `d) ${question.option_d}`,
          ...textStyles.normal,
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
        after: spacingConfig.betweenQuestions,
      },
    }),
  ];
}

/**
 * Creates the answer key section
 */
export function createAnswerKeySection(questions: Question[]): Paragraph[] {
  const answerKeyParagraphs: Paragraph[] = [
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
        after: spacingConfig.afterInstructions,
      },
    }),
  ];
  
  questions.forEach((question, index) => {
    answerKeyParagraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${index + 1}. `,
            ...textStyles.bold,
          }),
          new TextRun({
            text: question.correct_answer,
            ...textStyles.normal,
          }),
        ],
      })
    );
  });
  
  return answerKeyParagraphs;
}

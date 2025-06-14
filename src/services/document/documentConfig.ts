import { HeadingLevel, IStylesOptions, ITableOfContentsOptions, convertInchesToTwip } from "docx";

export const pageMargins = {
  top: convertInchesToTwip(1),
  right: convertInchesToTwip(1),
  bottom: convertInchesToTwip(1),
  left: convertInchesToTwip(1),
};

export const spacingConfig = {
  afterTitle: 160, // was 240, now 8pt closer
  afterInstructions: 320, // was 480, now 16pt closer
  afterQuestionText: 120, // was 160, 2pt closer
  betweenOptions: 120, // (not used in inline but leave less than before)
  betweenQuestions: 240, // was 360, now more compact between each question
  afterSection: 720,
  beforeSection: 480,
  afterReadingPassage: 320, // was 480, tightened
  afterTestInfo: 220, // was 360, more compact
  afterStudentInfo: 220, // was 480, more compact
};

export const textStyles = {
  heading: {
    bold: true,
    size: 24, // 12pt
  },
  bold: {
    bold: true,
    size: 24, // 12pt
  },
  normal: {
    size: 24, // 12pt
  },
  small: {
    size: 20, // 10pt
  },
};

// Logo configuration with exact dimensions in inches
export const logoConfig = {
  width: convertInchesToTwip(5.12), // 5.12 inches
  height: convertInchesToTwip(0.93), // 0.93 inches
  spacingAfter: 360, // Spacing after logo
};

export const documentStyles: IStylesOptions = {
  paragraphStyles: [
    {
      id: "Title",
      name: "Title",
      basedOn: "Normal",
      next: "Normal",
      run: {
        size: 24, // Updated to 12pt (24 half-points)
        bold: true,
      },
      paragraph: {
        spacing: {
          after: 240, // 12pt
        },
      },
    },
    {
      id: "Heading1",
      name: "Heading 1",
      basedOn: "Normal",
      next: "Normal",
      quickFormat: true,
      run: {
        size: 24, // Updated to 12pt (24 half-points)
        bold: true,
      },
      paragraph: {
        spacing: {
          before: 240, // 12pt
          after: 120, // 6pt
        },
      },
    },
  ],
};

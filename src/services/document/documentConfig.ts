
import { HeadingLevel, StyleOptions, TableOfContentsOptions, convertInchesToTwip } from "docx";

export const pageMargins = {
  top: convertInchesToTwip(1),
  right: convertInchesToTwip(1),
  bottom: convertInchesToTwip(1),
  left: convertInchesToTwip(1),
};

export const spacingConfig = {
  afterTitle: 240, // 12 points
  afterInstructions: 480, // 24 points
  afterQuestionText: 160, // 8 points
  betweenOptions: 160, // 8 points
  betweenQuestions: 360, // 18 points
  afterSection: 720, // 36 points
  beforeSection: 480, // 24 points
  afterReadingPassage: 480, // 24 points
};

export const textStyles = {
  heading: {
    bold: true,
    size: 28, // 14pt
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

export const documentStyles: StyleOptions = {
  paragraphStyles: [
    {
      id: "Title",
      name: "Title",
      basedOn: "Normal",
      next: "Normal",
      run: {
        size: 36, // 18pt
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
        size: 32, // 16pt
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

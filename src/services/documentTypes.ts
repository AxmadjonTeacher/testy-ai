
export interface Question {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  level: string;
  topic: string;
  subject: string;
  question_type: string;
  reading_passage?: string;
}

export interface TestExportData {
  title: string;
  teacher: string | null;
  subject: string;
  level: string;
  grade?: string;
  questions: Question[];
  includeAnswers: boolean;
  dateGenerated: string;
}

export interface DocumentConfig {
  pageMargins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  styles: any;
}

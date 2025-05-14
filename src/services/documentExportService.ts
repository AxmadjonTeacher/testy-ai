
import { downloadDocument } from './document/documentDownloader';
import { generateWordDocument } from './document/documentGenerator';
import type { TestExportData } from './documentTypes';
import { createAnswerSheetSection } from './document/answerSheetGenerator';

export { generateWordDocument, downloadDocument, createAnswerSheetSection };
export type { TestExportData };

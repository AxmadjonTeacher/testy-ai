
import type { Database } from "@/integrations/supabase/types";

export type Question = Database["public"]["Tables"]["questions"]["Row"];
export type GeneratedTest = Database["public"]["Tables"]["generated_tests"]["Row"];

export interface TestExportData {
  title: string;
  teacher: string | null;
  level: string;
  grade?: string;
  questions: Question[];
  includeAnswers: boolean;
  dateGenerated: string;
}

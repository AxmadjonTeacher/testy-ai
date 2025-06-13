
export interface Subject {
  value: string;
  label: string;
}

export const subjects: Subject[] = [
  { value: 'English', label: 'English' },
  { value: 'Science', label: 'Science' },
  { value: 'Math', label: 'Math' },
  { value: 'History', label: 'History' },
  { value: 'Native Language', label: 'Native Language' },
  { value: 'IT', label: 'IT' }
];

export const englishLevels = ['0', '1', '2', '3', '4', 'IELTS'];
export const mathLevels = Array.from({ length: 10 }, (_, i) => `${i + 1}`);

export const requiresLevel = (subject: string): boolean => {
  return subject === 'English' || subject === 'Math';
};

export const getLevelsForSubject = (subject: string): string[] => {
  if (subject === 'English') return englishLevels;
  if (subject === 'Math') return mathLevels;
  return [];
};

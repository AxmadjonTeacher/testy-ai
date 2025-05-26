
import { topicsByLevel as englishTopics } from './testTopics';
import { mathTopicsByLevel } from './mathTopics';

// Combined topics for all subjects
export const topicsBySubject = {
  English: englishTopics,
  Math: mathTopicsByLevel
};

// Subject configuration
export const subjects = [
  { value: "English", label: "English" },
  { value: "Math", label: "Mathematics" }
];

// Get topics for a specific subject and level (deprecated - now topics are fetched from database)
export const getTopicsForSubjectAndLevel = (subject: string, level: string): string[] => {
  return topicsBySubject[subject as keyof typeof topicsBySubject]?.[level] || [];
};

// Get available levels for a subject
export const getLevelsForSubject = (subject: string): Array<{value: string, label: string}> => {
  if (subject === "English") {
    return [
      { value: "0", label: "Level 0" },
      { value: "1", label: "Level 1" },
      { value: "2", label: "Level 2" },
      { value: "3", label: "Level 3" },
      { value: "4", label: "Level 4" },
      { value: "IELTS", label: "IELTS" }
    ];
  } else if (subject === "Math") {
    return [
      { value: "1", label: "Level 1" },
      { value: "2", label: "Level 2" },
      { value: "3", label: "Level 3" },
      { value: "4", label: "Level 4" },
      { value: "5", label: "Level 5" }
    ];
  }
  return [];
};

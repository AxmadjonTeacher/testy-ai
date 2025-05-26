
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LevelTabs from './LevelTabs';

interface UploadHistoryItem {
  id: string;
  filename: string;
  level: string;
  topic: string;
  date: string;
  questionCount: number;
  subject?: string;
}

interface SubjectTabsProps {
  filesBySubject: {[key: string]: {[key: string]: UploadHistoryItem[]}};
  subjects: string[];
  onDeleteAttempt: (itemId: string) => void;
  onDeleteItem?: (itemId: string) => void;
  isAdmin: boolean;
}

const SubjectTabs: React.FC<SubjectTabsProps> = ({
  filesBySubject,
  subjects,
  onDeleteAttempt,
  onDeleteItem,
  isAdmin
}) => {
  // Function to get level display name based on subject
  const getLevelDisplayName = (subject: string, level: string) => {
    if (subject === 'Math') {
      return `Level ${level}`;
    }
    return `Level ${level}`;
  };

  return (
    <Tabs defaultValue={subjects.length > 0 ? subjects[0] : undefined}>
      <TabsList className="mb-4">
        {subjects.map(subject => (
          <TabsTrigger key={subject} value={subject}>
            {subject}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {subjects.map(subject => {
        const levels = Object.keys(filesBySubject[subject]).sort((a, b) => {
          // Try to sort numerically if possible
          const numA = Number(a);
          const numB = Number(b);
          if (!isNaN(numA) && !isNaN(numB)) {
            return numA - numB;
          }
          return a.localeCompare(b);
        });

        return (
          <TabsContent key={subject} value={subject}>
            <LevelTabs
              subject={subject}
              levels={levels}
              filesByLevel={filesBySubject[subject]}
              getLevelDisplayName={getLevelDisplayName}
              onDeleteAttempt={onDeleteAttempt}
              onDeleteItem={onDeleteItem}
              isAdmin={isAdmin}
            />
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default SubjectTabs;

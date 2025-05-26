
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileItem from './FileItem';

interface UploadHistoryItem {
  id: string;
  filename: string;
  level: string;
  topic: string;
  date: string;
  questionCount: number;
  subject?: string;
}

interface LevelTabsProps {
  subject: string;
  levels: string[];
  filesByLevel: {[key: string]: UploadHistoryItem[]};
  getLevelDisplayName: (subject: string, level: string) => string;
  onDeleteAttempt: (itemId: string) => void;
  onDeleteItem?: (itemId: string) => void;
  isAdmin: boolean;
}

const LevelTabs: React.FC<LevelTabsProps> = ({
  subject,
  levels,
  filesByLevel,
  getLevelDisplayName,
  onDeleteAttempt,
  onDeleteItem,
  isAdmin
}) => {
  const renderSubjectLevelFiles = (level: string, files: UploadHistoryItem[]) => {
    return (
      <div className="space-y-4">
        {files.map((upload) => (
          <FileItem
            key={upload.id}
            upload={upload}
            onDeleteAttempt={onDeleteAttempt}
            onDeleteItem={onDeleteItem}
            isAdmin={isAdmin}
          />
        ))}
      </div>
    );
  };

  return (
    <Tabs defaultValue={levels.length > 0 ? levels[0] : undefined}>
      <TabsList className="mb-4">
        {levels.map(level => (
          <TabsTrigger key={level} value={level}>
            {getLevelDisplayName(subject, level)}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {levels.map(level => (
        <TabsContent key={level} value={level}>
          {renderSubjectLevelFiles(level, filesByLevel[level])}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default LevelTabs;

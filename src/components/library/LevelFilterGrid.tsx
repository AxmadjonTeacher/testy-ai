
import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface UploadedTest {
  id: string;
  title?: string;
  subject: string;
  level?: string;
  grade: string;
  topics: string[];
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  created_at: string;
  user_id: string;
}

interface LevelFilterGridProps {
    levels: string[];
    subjectTests: UploadedTest[];
    selectedLevel: string;
    onLevelClick: (level: string) => void;
    filterTestsByLevel: (tests: UploadedTest[], level: string) => UploadedTest[];
}

const LevelFilterGrid: React.FC<LevelFilterGridProps> = ({
    levels,
    subjectTests,
    selectedLevel,
    onLevelClick,
    filterTestsByLevel,
}) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {levels.map((level) => {
                const levelTests = filterTestsByLevel(subjectTests, level);
                const isSelected = selectedLevel === level;
                return (
                    <Card
                        key={level}
                        className={`cursor-pointer hover:shadow-lg transition-all duration-200 ${isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-gray-50'}`}
                        onClick={() => onLevelClick(level)}
                    >
                        <CardHeader className="pb-2">
                            <CardTitle className={`text-lg text-center ${isSelected ? 'text-primary' : ''}`}>
                                Level {level}
                            </CardTitle>
                            <CardDescription className="text-center">
                                {levelTests.length} test{levelTests.length !== 1 ? 's' : ''}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                );
            })}
        </div>
    );
};

export default LevelFilterGrid;

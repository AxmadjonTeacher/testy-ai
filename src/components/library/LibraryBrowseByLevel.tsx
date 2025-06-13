
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LibrarySearch from './LibrarySearch';
import CompactTestGrid from './CompactTestGrid';

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
}

interface LibraryBrowseByLevelProps {
  filteredTests: UploadedTest[];
  isLoading: boolean;
  onSearch: (query: string, filterType: string) => void;
}

const LibraryBrowseByLevel: React.FC<LibraryBrowseByLevelProps> = ({
  filteredTests,
  isLoading,
  onSearch
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  const subjects = [
    { value: 'all', label: 'All Subjects' },
    { value: 'English', label: 'English' },
    { value: 'Science', label: 'Science' },
    { value: 'Math', label: 'Math' },
    { value: 'History', label: 'History' },
    { value: 'Native Language', label: 'Native Language' },
    { value: 'IT', label: 'IT' }
  ];

  const filterTestsBySubject = (tests: UploadedTest[]) => {
    if (selectedSubject === 'all') return tests;
    return tests.filter(test => test.subject === selectedSubject);
  };

  const filterTestsByLevel = (tests: UploadedTest[], level: string) => {
    if (level === 'all') return tests;
    return tests.filter(test => test.level === level);
  };

  const getSubjectTests = () => filterTestsBySubject(filteredTests);
  const subjectTests = getSubjectTests();

  const getLevelsForSubject = () => {
    if (selectedSubject === 'English') {
      return ['0', '1', '2', '3', '4', 'IELTS'];
    } else if (selectedSubject === 'Math') {
      return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    }
    return [];
  };

  const shouldShowLevels = () => {
    return selectedSubject === 'English' || selectedSubject === 'Math' || selectedSubject === 'all';
  };

  return (
    <div className="space-y-4">
      <LibrarySearch 
        onSearch={onSearch} 
        placeholder="Search by subject, level, topic, grade, or keywords..."
      />
      
      {/* Test count and subject selector on the same line */}
      <div className="flex items-center gap-4">
        <div className="text-sm text-neutral-dark/70 bg-gray-100 px-3 py-2 rounded">
          {subjectTests.length} test{subjectTests.length !== 1 ? 's' : ''}
        </div>
        
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject.value} value={subject.value}>
                {subject.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {shouldShowLevels() && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {getLevelsForSubject().map((level) => {
            const levelTests = filterTestsByLevel(subjectTests, level);
            return (
              <Card key={level} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-center">Level {level}</CardTitle>
                  <CardDescription className="text-center">
                    {levelTests.length} test{levelTests.length !== 1 ? 's' : ''}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      )}
      
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-lg font-semibold">
          {selectedSubject === 'all' ? 'All Tests' : `${selectedSubject} Tests`}
        </h3>
      </div>
      
      <CompactTestGrid tests={subjectTests} isLoading={isLoading} />
    </div>
  );
};

export default LibraryBrowseByLevel;

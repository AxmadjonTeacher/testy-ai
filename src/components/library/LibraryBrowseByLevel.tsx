import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LibrarySearch from './LibrarySearch';
import CompactTestGrid from './CompactTestGrid';
import { Button } from "@/components/ui/button";
import { Table, LayoutGrid } from "lucide-react";
import TestListView from './TestListView';

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

interface LibraryBrowseByLevelProps {
  filteredTests: UploadedTest[];
  isLoading: boolean;
  onSearch: (query: string, filterType: string) => void;
  onTestDeleted?: () => void;
}

const LibraryBrowseByLevel: React.FC<LibraryBrowseByLevelProps> = ({
  filteredTests,
  isLoading,
  onSearch,
  onTestDeleted
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [view, setView] = useState<"grid" | "list">("grid");

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
  const getDisplayTests = () => {
    const subjectTests = getSubjectTests();
    return filterTestsByLevel(subjectTests, selectedLevel);
  };

  const subjectTests = getSubjectTests();
  const displayTests = getDisplayTests();

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

  const handleLevelClick = (level: string) => {
    setSelectedLevel(level);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <LibrarySearch 
          onSearch={onSearch} 
          placeholder="Search by subject, level, topic, grade, or keywords..."
        />
        <div className="flex gap-1 mt-2 md:mt-0 justify-end">
          <Button 
            variant={view === 'list' ? "secondary" : "outline"} 
            size="icon" 
            aria-label="List view"
            className={view === 'list' ? "ring-2 ring-primary" : ""}
            onClick={() => setView("list")}
          >
            <Table className="h-5 w-5" />
          </Button>
          <Button 
            variant={view === 'grid' ? "secondary" : "outline"}
            size="icon"
            aria-label="Grid view"
            className={view === 'grid' ? "ring-2 ring-primary" : ""}
            onClick={() => setView("grid")}
          >
            <LayoutGrid className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Test count and subject selector on the same line */}
      <div className="flex items-center gap-4">
        <div className="text-sm text-neutral-dark/70 bg-gray-100 px-3 py-2 rounded">
          {displayTests.length} test{displayTests.length !== 1 ? 's' : ''}
        </div>
        
        <Select value={selectedSubject} onValueChange={(value) => {
          setSelectedSubject(value);
          setSelectedLevel('all'); // Reset level when subject changes
        }}>
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

        {/* Level filter reset button */}
        {selectedLevel !== 'all' && (
          <button 
            onClick={() => setSelectedLevel('all')}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Show all levels
          </button>
        )}
      </div>

      {shouldShowLevels() && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {getLevelsForSubject().map((level) => {
            const levelTests = filterTestsByLevel(subjectTests, level);
            const isSelected = selectedLevel === level;
            return (
              <Card 
                key={level} 
                className={`cursor-pointer hover:shadow-lg transition-all duration-200 ${
                  isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-gray-50'
                }`}
                onClick={() => handleLevelClick(level)}
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
      )}

      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-lg font-semibold">
          {selectedSubject === 'all' 
            ? selectedLevel === 'all' 
              ? 'All Tests' 
              : `Level ${selectedLevel} Tests`
            : selectedLevel === 'all'
              ? `${selectedSubject} Tests`
              : `${selectedSubject} - Level ${selectedLevel} Tests`
          }
        </h3>
      </div>

      {view === "grid" ? (
        <CompactTestGrid 
          tests={displayTests} 
          isLoading={isLoading} 
          onTestDeleted={onTestDeleted}
        />
      ) : (
        <TestListView 
          tests={displayTests}
          isLoading={isLoading}
          onDownload={() => {}}
          onDelete={() => {}}
        />
      )}
    </div>
  );
};

export default LibraryBrowseByLevel;

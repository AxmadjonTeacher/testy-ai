
import React, { useState } from 'react';
import LibrarySearch from './LibrarySearch';
import CompactTestGrid from './CompactTestGrid';
import TestListView from './TestListView';
import ViewSwitcher from './ViewSwitcher';
import LibraryFilters from './LibraryFilters';
import LevelFilterGrid from './LevelFilterGrid';
import TestListHeader from './TestListHeader';

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

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
    setSelectedLevel('all'); // Reset level when subject changes
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <LibrarySearch 
          onSearch={onSearch} 
          placeholder="Search by subject, level, topic, grade, or keywords..."
        />
        <div className="flex mt-2 md:mt-0 justify-end">
          <ViewSwitcher view={view} onViewChange={setView} />
        </div>
      </div>

      <LibraryFilters
        testCount={displayTests.length}
        selectedSubject={selectedSubject}
        onSubjectChange={handleSubjectChange}
        selectedLevel={selectedLevel}
        onLevelReset={() => setSelectedLevel('all')}
        subjects={subjects}
      />

      {shouldShowLevels() && (
        <LevelFilterGrid
          levels={getLevelsForSubject()}
          subjectTests={subjectTests}
          selectedLevel={selectedLevel}
          onLevelClick={setSelectedLevel}
          filterTestsByLevel={filterTestsByLevel}
        />
      )}

      <TestListHeader selectedSubject={selectedSubject} selectedLevel={selectedLevel} />

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

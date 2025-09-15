
import React, { useState } from 'react';
import LibrarySearch from './LibrarySearch';
import TestListView from './TestListView';
import LibraryFilters from './LibraryFilters';
import LevelFilterGrid from './LevelFilterGrid';
import TestListHeader from './TestListHeader';
import { supabase } from '@/integrations/supabase/client';
import { downloadDocument } from '@/services/document/documentDownloader';
import { toast } from 'sonner';

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

  const handleDownload = async (test: UploadedTest) => {
    try {
      toast.info("Preparing download...");
      const { data, error } = await supabase.storage
        .from('uploaded-tests')
        .download(test.file_path);

      if (error) throw error;

      downloadDocument(data, test.file_name);
      toast.success("Test downloaded successfully!");
    } catch (error) {
      console.error("Error downloading test:", error);
      toast.error("Failed to download test.");
    }
  };

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
    // Exclude Primary Grades from browse by level - they only appear in All Tests
    return tests.filter(test => test.level === level && test.level !== 'Primary Grades');
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
      <LibrarySearch 
        onSearch={onSearch} 
        placeholder="Search by subject, level, topic, grade, or keywords..."
      />

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

      <TestListView 
        tests={displayTests}
        isLoading={isLoading}
        onDownload={handleDownload}
        onTestDeleted={onTestDeleted}
      />
    </div>
  );
};

export default LibraryBrowseByLevel;

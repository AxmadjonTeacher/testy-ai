
import React from 'react';
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
  user_id: string;
}

interface LibraryAllTestsProps {
  filteredTests: UploadedTest[];
  isLoading: boolean;
  onSearch: (query: string, filterType: string) => void;
  onTestDeleted?: () => void;
}

const LibraryAllTests: React.FC<LibraryAllTestsProps> = ({
  filteredTests,
  isLoading,
  onSearch,
  onTestDeleted
}) => {
  return (
    <div className="space-y-4">
      <LibrarySearch 
        onSearch={onSearch} 
        testCount={filteredTests.length}
      />
      
      <CompactTestGrid 
        tests={filteredTests} 
        isLoading={isLoading} 
        onTestDeleted={onTestDeleted}
      />
    </div>
  );
};

export default LibraryAllTests;

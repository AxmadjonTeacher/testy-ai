
import React from 'react';
import LibrarySearch from './LibrarySearch';
import CompactTestGrid from './CompactTestGrid';

interface UploadedTest {
  id: string;
  title: string;
  level: string;
  grade: string;
  topics: string[];
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  created_at: string;
}

interface LibraryAllTestsProps {
  filteredTests: UploadedTest[];
  isLoading: boolean;
  onSearch: (query: string, filterType: string) => void;
}

const LibraryAllTests: React.FC<LibraryAllTestsProps> = ({
  filteredTests,
  isLoading,
  onSearch
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <LibrarySearch onSearch={onSearch} />
        <div className="text-xs text-neutral-dark/70 whitespace-nowrap bg-gray-100 px-2 py-1 rounded">
          {filteredTests.length} test{filteredTests.length !== 1 ? 's' : ''}
        </div>
      </div>
      
      <CompactTestGrid tests={filteredTests} isLoading={isLoading} />
    </div>
  );
};

export default LibraryAllTests;

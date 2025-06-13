
import React from 'react';
import { Button } from "@/components/ui/button";
import { Grid, List } from 'lucide-react';
import LibrarySearch from './LibrarySearch';
import CompactTestGrid from './CompactTestGrid';
import LibraryGrid from './LibraryGrid';

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
  viewMode: 'grid' | 'compact';
  onSearch: (query: string, filterType: string) => void;
  onViewModeChange: (mode: 'grid' | 'compact') => void;
}

const LibraryAllTests: React.FC<LibraryAllTestsProps> = ({
  filteredTests,
  isLoading,
  viewMode,
  onSearch,
  onViewModeChange
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <LibrarySearch onSearch={onSearch} />
          <div className="text-xs text-neutral-dark/70 whitespace-nowrap bg-gray-100 px-2 py-1 rounded">
            {filteredTests.length} test{filteredTests.length !== 1 ? 's' : ''}
          </div>
        </div>
        <div className="flex gap-1 ml-3">
          <Button
            variant={viewMode === 'compact' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewModeChange('compact')}
            className="h-8 w-8 p-0"
          >
            <Grid className="h-3 w-3" />
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            className="h-8 w-8 p-0"
          >
            <List className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      {viewMode === 'compact' ? (
        <CompactTestGrid tests={filteredTests} isLoading={isLoading} />
      ) : (
        <LibraryGrid tests={filteredTests} isLoading={isLoading} />
      )}
    </div>
  );
};

export default LibraryAllTests;

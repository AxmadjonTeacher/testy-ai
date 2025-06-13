
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

interface LibraryBrowseByLevelProps {
  filteredTests: UploadedTest[];
  isLoading: boolean;
  viewMode: 'grid' | 'compact';
  onSearch: (query: string, filterType: string) => void;
  onViewModeChange: (mode: 'grid' | 'compact') => void;
}

const LibraryBrowseByLevel: React.FC<LibraryBrowseByLevelProps> = ({
  filteredTests,
  isLoading,
  viewMode,
  onSearch,
  onViewModeChange
}) => {
  const filterTestsByLevel = (level: string) => {
    if (level === 'all') return filteredTests;
    return filteredTests.filter(test => test.level === level);
  };

  return (
    <div className="space-y-4">
      <LibrarySearch 
        onSearch={onSearch} 
        placeholder="Search by level, topic, grade, or keywords..."
      />
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {['0', '1', '2', '3', '4', 'IELTS'].map((level) => {
          const levelTests = filterTestsByLevel(level);
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
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold">All Tests</h3>
          <div className="text-xs text-neutral-dark/70 bg-gray-100 px-2 py-1 rounded">
            {filteredTests.length} test{filteredTests.length !== 1 ? 's' : ''}
          </div>
        </div>
        <div className="flex gap-1">
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

export default LibraryBrowseByLevel;


import React, { useState } from 'react';
import LibrarySearch from './LibrarySearch';
import CompactTestGrid from './CompactTestGrid';
import TestListView from './TestListView';
import { Button } from "@/components/ui/button";
import { Table, LayoutGrid } from "lucide-react";

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
  const [view, setView] = useState<"grid" | "list">("grid");

  // handlers for CompactTestGrid
  const [downloadTest, setDownloadTest] = useState<any>(null);
  const [deleteTest, setDeleteTest] = useState<any>(null);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <LibrarySearch 
          onSearch={onSearch} 
          testCount={filteredTests.length}
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
      {view === "grid" ? (
        <CompactTestGrid 
          tests={filteredTests} 
          isLoading={isLoading} 
          onTestDeleted={onTestDeleted}
        />
      ) : (
        <TestListView 
          tests={filteredTests}
          isLoading={isLoading}
          onDownload={(test) => {
            // hacky but matches CompactTestGrid props
            document.querySelectorAll('[data-download]').forEach(btn =>
              (btn as HTMLElement).click()
            );
          }}
          onDelete={(test) => {
            document.querySelectorAll('[data-delete]').forEach(btn =>
              (btn as HTMLElement).click()
            );
          }}
        />
      )}
    </div>
  );
};

export default LibraryAllTests;

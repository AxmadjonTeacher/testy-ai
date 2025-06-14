
import React, { useState } from 'react';
import LibrarySearch from './LibrarySearch';
import CompactTestGrid from './CompactTestGrid';
import TestListView from './TestListView';
import ViewSwitcher from './ViewSwitcher';
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

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <LibrarySearch 
          onSearch={onSearch} 
          testCount={filteredTests.length}
          className="md:flex-grow"
        />
        <div className="flex mt-2 md:mt-0 justify-end">
          <ViewSwitcher view={view} onViewChange={setView} />
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
          onDownload={handleDownload}
          onTestDeleted={onTestDeleted}
        />
      )}
    </div>
  );
};

export default LibraryAllTests;

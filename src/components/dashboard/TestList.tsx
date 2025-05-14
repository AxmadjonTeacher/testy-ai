
import React from 'react';
import TestItem from './TestItem';
import type { Database } from "@/integrations/supabase/types";

type GeneratedTest = Database["public"]["Tables"]["generated_tests"]["Row"];

interface TestListProps {
  tests: GeneratedTest[];
  onDeleteTest: (id: string) => void;
  onDownloadTest: (test: GeneratedTest) => void;
}

const TestList: React.FC<TestListProps> = ({ tests, onDeleteTest, onDownloadTest }) => {
  return (
    <div className="space-y-4">
      {tests.map(test => (
        <TestItem 
          key={test.id} 
          test={test} 
          onDelete={onDeleteTest} 
          onDownload={onDownloadTest} 
        />
      ))}
    </div>
  );
};

export default TestList;

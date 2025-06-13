
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, BookOpen } from 'lucide-react';

interface LibraryTabsProps {
  activeTab: string;
}

const LibraryTabs: React.FC<LibraryTabsProps> = ({ activeTab }) => {
  return (
    <TabsList className="grid w-full grid-cols-3 mb-6">
      <TabsTrigger value="upload" className="flex items-center gap-2">
        <Upload className="h-4 w-4" />
        Upload Tests
      </TabsTrigger>
      <TabsTrigger value="all" className="flex items-center gap-2">
        <FileText className="h-4 w-4" />
        All Tests
      </TabsTrigger>
      <TabsTrigger value="browse" className="flex items-center gap-2">
        <BookOpen className="h-4 w-4" />
        Browse by Level
      </TabsTrigger>
    </TabsList>
  );
};

export default LibraryTabs;

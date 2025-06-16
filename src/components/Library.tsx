
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import LibraryUpload from './library/LibraryUpload';
import LibraryHeader from './library/LibraryHeader';
import LibraryTabs from './library/LibraryTabs';
import LibraryAllTests from './library/LibraryAllTests';
import LibraryBrowseByLevel from './library/LibraryBrowseByLevel';
import { useUploadedTests } from '@/hooks/useUploadedTests';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const Library = () => {
  const { user } = useAuth();
  const { uploadedTests, isLoading, fetchUploadedTests } = useUploadedTests();
  const [activeTab, setActiveTab] = useState('all');
  const [filteredTests, setFilteredTests] = useState(uploadedTests);

  useEffect(() => {
    if (user) {
      fetchUploadedTests();
    }
  }, [user, fetchUploadedTests]);

  useEffect(() => {
    setFilteredTests(uploadedTests);
  }, [uploadedTests]);

  if (!user) {
    return (
      <div className="p-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <BookOpen className="h-16 w-16 mx-auto text-primary mb-4" />
          <h2 className="text-2xl font-bold text-neutral-dark mb-2">Access Required</h2>
          <p className="text-neutral-dark/70">Please sign in to access your test library and upload tests.</p>
        </motion.div>
      </div>
    );
  }

  const handleSearch = (query: string, filterType: string) => {
    if (!query.trim()) {
      setFilteredTests(uploadedTests);
      return;
    }

    const filtered = uploadedTests.filter(test => {
      const searchQuery = query.toLowerCase();
      
      switch (filterType) {
        case 'title':
          return (test.title || test.file_name).toLowerCase().includes(searchQuery);
        case 'topics':
          return test.topics.some(topic => topic.toLowerCase().includes(searchQuery));
        case 'grade':
          return test.grade.toLowerCase().includes(searchQuery);
        case 'subject':
          return test.subject.toLowerCase().includes(searchQuery);
        case 'date':
          return new Date(test.created_at).toLocaleDateString().includes(searchQuery);
        case 'keywords':
        default:
          return (
            (test.title || test.file_name).toLowerCase().includes(searchQuery) ||
            test.topics.some(topic => topic.toLowerCase().includes(searchQuery)) ||
            test.grade.toLowerCase().includes(searchQuery) ||
            (test.level && test.level.toLowerCase().includes(searchQuery)) ||
            test.subject.toLowerCase().includes(searchQuery)
          );
      }
    });

    setFilteredTests(filtered);
  };

  const handleTestDeleted = () => {
    console.log("Test deleted, refreshing list");
    fetchUploadedTests();
  };

  return (
    <div className="p-6">
      <LibraryHeader />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <LibraryTabs activeTab={activeTab} />

        <TabsContent value="upload">
          <LibraryUpload onUploadSuccess={fetchUploadedTests} />
        </TabsContent>

        <TabsContent value="all">
          <LibraryAllTests
            filteredTests={filteredTests}
            isLoading={isLoading}
            onSearch={handleSearch}
            onTestDeleted={handleTestDeleted}
          />
        </TabsContent>

        <TabsContent value="browse">
          <LibraryBrowseByLevel
            filteredTests={filteredTests}
            isLoading={isLoading}
            onSearch={handleSearch}
            onTestDeleted={handleTestDeleted}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Library;

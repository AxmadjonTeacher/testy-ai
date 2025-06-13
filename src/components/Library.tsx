
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import LibraryUpload from './library/LibraryUpload';
import LibraryGrid from './library/LibraryGrid';
import CompactTestGrid from './library/CompactTestGrid';
import LibrarySearch from './library/LibrarySearch';
import { useUploadedTests } from '@/hooks/useUploadedTests';
import { motion } from 'framer-motion';
import { BookOpen, Upload, FileText, Grid, List } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Library = () => {
  const { user } = useAuth();
  const { uploadedTests, isLoading, fetchUploadedTests } = useUploadedTests();
  const [activeTab, setActiveTab] = useState('all');
  const [filteredTests, setFilteredTests] = useState(uploadedTests);
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('compact');

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

  const filterTestsByLevel = (level: string) => {
    if (level === 'all') return filteredTests;
    return filteredTests.filter(test => test.level === level);
  };

  const handleSearch = (query: string, filterType: string) => {
    if (!query.trim()) {
      setFilteredTests(uploadedTests);
      return;
    }

    const filtered = uploadedTests.filter(test => {
      const searchQuery = query.toLowerCase();
      
      switch (filterType) {
        case 'title':
          return test.title.toLowerCase().includes(searchQuery);
        case 'topics':
          return test.topics.some(topic => topic.toLowerCase().includes(searchQuery));
        case 'grade':
          return test.grade.toLowerCase().includes(searchQuery);
        case 'date':
          return new Date(test.created_at).toLocaleDateString().includes(searchQuery);
        case 'keywords':
        default:
          return (
            test.title.toLowerCase().includes(searchQuery) ||
            test.topics.some(topic => topic.toLowerCase().includes(searchQuery)) ||
            test.grade.toLowerCase().includes(searchQuery) ||
            test.level.toLowerCase().includes(searchQuery)
          );
      }
    });

    setFilteredTests(filtered);
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-neutral-dark">Test Library</h1>
        </div>
        <p className="text-neutral-dark/70">Upload and organize your test files by level, grade, and topics.</p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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

        <TabsContent value="upload">
          <LibraryUpload onUploadSuccess={fetchUploadedTests} />
        </TabsContent>

        <TabsContent value="all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <LibrarySearch onSearch={handleSearch} />
                <div className="text-sm text-neutral-dark/70 whitespace-nowrap">
                  {filteredTests.length} test{filteredTests.length !== 1 ? 's' : ''}
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  variant={viewMode === 'compact' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('compact')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {viewMode === 'compact' ? (
              <CompactTestGrid tests={filteredTests} isLoading={isLoading} />
            ) : (
              <LibraryGrid tests={filteredTests} isLoading={isLoading} />
            )}
          </div>
        </TabsContent>

        <TabsContent value="browse">
          <div className="space-y-6">
            <LibrarySearch 
              onSearch={handleSearch} 
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
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-semibold">All Tests</h3>
                <div className="text-sm text-neutral-dark/70">
                  {filteredTests.length} test{filteredTests.length !== 1 ? 's' : ''}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'compact' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('compact')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {viewMode === 'compact' ? (
              <CompactTestGrid tests={filteredTests} isLoading={isLoading} />
            ) : (
              <LibraryGrid tests={filteredTests} isLoading={isLoading} />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Library;

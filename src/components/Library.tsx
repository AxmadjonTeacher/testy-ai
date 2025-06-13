
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import LibraryUpload from './library/LibraryUpload';
import LibraryGrid from './library/LibraryGrid';
import { useUploadedTests } from '@/hooks/useUploadedTests';
import { motion } from 'framer-motion';
import { BookOpen, Upload, FileText } from 'lucide-react';

const Library = () => {
  const { user } = useAuth();
  const { uploadedTests, isLoading, fetchUploadedTests } = useUploadedTests();
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if (user) {
      fetchUploadedTests();
    }
  }, [user, fetchUploadedTests]);

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
    if (level === 'all') return uploadedTests;
    return uploadedTests.filter(test => test.level === level);
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
            All Tests ({uploadedTests.length})
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
          <LibraryGrid tests={uploadedTests} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="browse">
          <div className="space-y-6">
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
            <LibraryGrid tests={uploadedTests} isLoading={isLoading} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Library;

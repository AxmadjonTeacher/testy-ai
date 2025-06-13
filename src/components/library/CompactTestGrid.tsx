import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText, Calendar, HardDrive, User, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';
import DeleteTestDialog from './DeleteTestDialog';
import { useTestDelete } from '@/hooks/useTestDelete';

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

interface CompactTestGridProps {
  tests: UploadedTest[];
  isLoading: boolean;
  onTestDeleted?: () => void;
}

const CompactTestGrid: React.FC<CompactTestGridProps> = ({ tests, isLoading, onTestDeleted }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [testToDelete, setTestToDelete] = useState<UploadedTest | null>(null);
  const { deleteTest, isDeleting } = useTestDelete();

  const handleDownload = async (test: UploadedTest) => {
    try {
      const { data, error } = await supabase.storage
        .from('uploaded-tests')
        .download(test.file_path);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = test.file_name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('File downloaded successfully');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download file');
    }
  };

  const handleDeleteClick = (test: UploadedTest) => {
    setTestToDelete(test);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (testToDelete) {
      const success = await deleteTest(testToDelete);
      if (success) {
        setDeleteDialogOpen(false);
        setTestToDelete(null);
        onTestDeleted?.();
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setTestToDelete(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  const getAuthorInitials = (userId: string) => {
    return userId.substring(0, 2).toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[...Array(10)].map((_, i) => (
          <Card key={i} className="animate-pulse h-48">
            <CardContent className="p-3">
              <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (tests.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-neutral-dark mb-2">No Tests Found</h3>
        <p className="text-neutral-dark/70">Try adjusting your search criteria or be the first to upload tests in this category.</p>
      </motion.div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {tests.map((test, index) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.02 }}
          >
            <Card className="h-56 hover:shadow-lg transition-all duration-200 cursor-pointer group border-gray-200">
              <CardHeader className="pb-2 p-3">
                {/* Header with title, file type and delete button */}
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-sm font-semibold line-clamp-2 flex-1 pr-2 leading-tight">
                    {test.title || test.file_name.split('.')[0]}
                  </CardTitle>
                  <div className="flex gap-1 shrink-0">
                    <Badge variant="outline" className="text-xs px-2 py-0.5">
                      {test.file_type.toUpperCase()}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(test)}
                      className="h-6 w-6 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                      title="Delete test"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                {/* Subject, Level, Grade badges */}
                <div className="flex flex-wrap gap-1 mb-2">
                  <Badge variant="secondary" className="text-xs px-2 py-0.5">{test.subject}</Badge>
                  {test.level && (
                    <Badge variant="outline" className="text-xs px-2 py-0.5">L{test.level}</Badge>
                  )}
                  <Badge variant="outline" className="text-xs px-2 py-0.5">G{test.grade}</Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 p-3 space-y-2">
                {/* Author info */}
                <div className="flex items-center gap-1 text-xs text-neutral-dark/70">
                  <User className="h-3 w-3 shrink-0" />
                  <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-xs">
                    {getAuthorInitials(test.user_id)}
                  </span>
                </div>

                {/* File info */}
                <div className="space-y-1 text-xs text-neutral-dark/70">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 shrink-0" />
                    <span className="truncate">{formatDate(test.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <HardDrive className="h-3 w-3 shrink-0" />
                    <span>{formatFileSize(test.file_size)}</span>
                  </div>
                </div>
                
                {/* Topics */}
                <div className="space-y-1">
                  <div className="flex flex-wrap gap-1">
                    {test.topics.slice(0, 2).map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs px-1.5 py-0.5 max-w-full">
                        <span className="truncate" title={topic}>
                          {topic.length > 12 ? topic.substring(0, 12) + '...' : topic}
                        </span>
                      </Badge>
                    ))}
                    {test.topics.length > 2 && (
                      <Badge variant="outline" className="text-xs px-1.5 py-0.5" title={test.topics.join(', ')}>
                        +{test.topics.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
                
                {/* Download button */}
                <Button 
                  onClick={() => handleDownload(test)}
                  size="sm"
                  variant="outline"
                  className="w-full text-xs h-8 group-hover:bg-primary group-hover:text-white transition-colors mt-auto"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <DeleteTestDialog
        isOpen={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        testTitle={testToDelete?.title || testToDelete?.file_name || ''}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default CompactTestGrid;

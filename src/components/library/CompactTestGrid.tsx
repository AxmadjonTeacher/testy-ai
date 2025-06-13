
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText, Calendar, HardDrive } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';

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

interface CompactTestGridProps {
  tests: UploadedTest[];
  isLoading: boolean;
}

const CompactTestGrid: React.FC<CompactTestGridProps> = ({ tests, isLoading }) => {
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
        {[...Array(10)].map((_, i) => (
          <Card key={i} className="animate-pulse h-24">
            <CardContent className="p-3">
              <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-2 bg-gray-200 rounded w-1/2 mb-1"></div>
              <div className="h-2 bg-gray-200 rounded w-2/3"></div>
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
        <p className="text-neutral-dark/70">Try adjusting your search criteria or upload new tests.</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
      {tests.map((test, index) => (
        <motion.div
          key={test.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.03 }}
        >
          <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
            <CardHeader className="pb-2 p-3">
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-sm font-medium line-clamp-1 flex-1 pr-2">
                  {test.title}
                </CardTitle>
                <Badge variant="outline" className="text-xs px-1 py-0">
                  {test.file_type.toUpperCase()}
                </Badge>
              </div>
              
              <div className="flex gap-1 mb-2">
                <Badge variant="secondary" className="text-xs px-1 py-0">Level {test.level}</Badge>
                <Badge variant="outline" className="text-xs px-1 py-0">Grade {test.grade}</Badge>
              </div>

              <div className="space-y-1 text-xs text-neutral-dark/70">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span className="truncate">{formatDate(test.created_at)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <HardDrive className="h-3 w-3" />
                  <span>{formatFileSize(test.file_size)}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0 p-3">
              <div className="mb-2">
                <div className="flex flex-wrap gap-1">
                  {test.topics.slice(0, 1).map((topic) => (
                    <Badge key={topic} variant="outline" className="text-xs px-1 py-0">
                      {topic}
                    </Badge>
                  ))}
                  {test.topics.length > 1 && (
                    <Badge variant="outline" className="text-xs px-1 py-0">
                      +{test.topics.length - 1}
                    </Badge>
                  )}
                </div>
              </div>
              
              <Button 
                onClick={() => handleDownload(test)}
                size="sm"
                variant="outline"
                className="w-full text-xs h-7 group-hover:bg-primary group-hover:text-white transition-colors"
              >
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default CompactTestGrid;

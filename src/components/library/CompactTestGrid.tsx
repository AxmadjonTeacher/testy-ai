import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Calendar, HardDrive } from 'lucide-react';
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
    if (bytes === 0) return '0B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  const truncateTitle = (title: string, maxLength: number = 15) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-1.5">
        {[...Array(14)].map((_, i) => (
          <Card key={i} className="animate-pulse h-32 w-44">
            <CardContent className="p-1.5">
              <div className="h-2 bg-gray-200 rounded w-3/4 mb-1"></div>
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
        className="text-center py-8"
      >
        <div className="h-12 w-12 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-3">
          <span className="text-gray-400 text-sm">No Tests</span>
        </div>
        <h3 className="text-lg font-semibold text-neutral-dark mb-1">No Tests Found</h3>
        <p className="text-sm text-neutral-dark/70">Try adjusting your search criteria or upload new tests.</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-1.5">
      {tests.map((test, index) => (
        <motion.div
          key={test.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.02 }}
        >
          <Card className="h-32 w-44 hover:shadow-md transition-shadow cursor-pointer group">
            <CardHeader className="pb-0.5 p-1.5">
              <div className="flex justify-between items-start mb-0.5">
                <CardTitle className="text-xs font-medium line-clamp-1 flex-1 pr-1" title={test.title}>
                  {truncateTitle(test.title)}
                </CardTitle>
                <Badge variant="outline" className="text-xs px-1 py-0 h-3 text-xs">
                  {test.file_type.toUpperCase()}
                </Badge>
              </div>
              
              <div className="flex gap-0.5 mb-0.5">
                <Badge variant="secondary" className="text-xs px-1 py-0 h-3">L{test.level}</Badge>
                <Badge variant="outline" className="text-xs px-1 py-0 h-3">G{test.grade}</Badge>
              </div>

              <div className="space-y-0 text-xs text-neutral-dark/70">
                <div className="flex items-center gap-1">
                  <Calendar className="h-2 w-2 shrink-0" />
                  <span className="truncate text-xs">{formatDate(test.created_at)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <HardDrive className="h-2 w-2 shrink-0" />
                  <span className="text-xs">{formatFileSize(test.file_size)}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0 p-1.5">
              <div className="mb-0.5">
                <div className="flex flex-wrap gap-0.5">
                  {test.topics.slice(0, 1).map((topic) => (
                    <Badge key={topic} variant="outline" className="text-xs px-1 py-0 h-3" title={topic}>
                      {topic.length > 8 ? topic.substring(0, 8) + '...' : topic}
                    </Badge>
                  ))}
                  {test.topics.length > 1 && (
                    <Badge variant="outline" className="text-xs px-1 py-0 h-3" title={test.topics.join(', ')}>
                      +{test.topics.length - 1}
                    </Badge>
                  )}
                </div>
              </div>
              
              <Button 
                onClick={() => handleDownload(test)}
                size="sm"
                variant="outline"
                className="w-full text-xs h-4 group-hover:bg-primary group-hover:text-white transition-colors"
              >
                <Download className="h-2 w-2 mr-1" />
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

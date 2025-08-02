
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Calendar, HardDrive, User, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

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

interface TestCardProps {
  test: UploadedTest;
  index: number;
  onDownload: (test: UploadedTest) => void;
  onDelete: (test: UploadedTest) => void;
}

const TestCard: React.FC<TestCardProps> = ({ test, index, onDownload, onDelete }) => {
  const { user } = useAuth();
  const canDelete = user?.id === test.user_id;
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

  return (
    <motion.div
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
              {canDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(test);
                  }}
                  className="h-6 w-6 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                  title="Delete test"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
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
            onClick={(e) => {
              e.stopPropagation();
              onDownload(test);
            }}
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
  );
};

export default TestCard;

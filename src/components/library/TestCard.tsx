
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Trash2, Calendar, User, GraduationCap, BookOpen } from "lucide-react";
import { motion } from 'framer-motion';

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
  onDownload: (test: UploadedTest) => void;
  onDelete?: (id: string) => void;
  currentUserId?: string;
}

const TestCard: React.FC<TestCardProps> = ({ test, onDownload, onDelete, currentUserId }) => {
  const canDelete = currentUserId === test.user_id;
  
  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="glass-card border-white/10 hover:border-white/20 transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg font-semibold text-foreground line-clamp-2">
              {test.title || test.file_name.replace(/\.[^/.]+$/, "")}
            </CardTitle>
            <Badge variant="secondary" className="ml-2 bg-primary/20 text-primary border-primary/30">
              {test.subject}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {test.level && (
              <div className="flex items-center gap-1">
                <GraduationCap className="h-4 w-4" />
                <span>Level {test.level}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>Grade {test.grade}</span>
            </div>
          </div>
          
          {test.topics && test.topics.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Topics:</p>
              <div className="flex flex-wrap gap-1">
                {test.topics.slice(0, 3).map((topic, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-secondary/50 border-white/20 text-foreground">
                    {topic}
                  </Badge>
                ))}
                {test.topics.length > 3 && (
                  <Badge variant="outline" className="text-xs bg-secondary/50 border-white/20 text-muted-foreground">
                    +{test.topics.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-white/10">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(test.created_at).toLocaleDateString()}</span>
            </div>
            <span>{formatFileSize(test.file_size)}</span>
          </div>
        </CardContent>
        
        <CardFooter className="pt-3 border-t border-white/10">
          <div className="flex gap-2 w-full">
            <Button
              onClick={() => onDownload(test)}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground liquid-button"
              size="sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            {canDelete && onDelete && (
              <Button
                onClick={() => onDelete(test.id)}
                variant="destructive"
                size="sm"
                className="liquid-button"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TestCard;


import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, User, Calendar, HardDrive, Trash2 } from "lucide-react";

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

interface TestListViewProps {
  tests: UploadedTest[];
  isLoading: boolean;
  onDownload: (test: UploadedTest) => void;
  onDelete: (test: UploadedTest) => void;
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0B";
  const k = 1024;
  const sizes = ["B", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + sizes[i];
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const getAuthorInitials = (userId: string) => {
  return userId.substring(0, 2).toUpperCase();
};

const TestListView: React.FC<TestListViewProps> = ({
  tests,
  isLoading,
  onDownload,
  onDelete,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {tests.map((test) => (
        <Card
          key={test.id}
          className="flex flex-col md:flex-row items-center md:items-stretch p-0 border-gray-200 hover:shadow md:gap-0 gap-2"
        >
          <CardHeader className="flex-shrink-0 w-full md:w-60 p-4 md:border-r md:border-gray-100 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start gap-2 md:gap-0">
            <div>
              <CardTitle className="text-base font-semibold truncate mb-1">
                {test.title || test.file_name.split(".")[0]}
              </CardTitle>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  {test.subject}
                </Badge>
                {test.level && (
                  <Badge variant="outline" className="text-xs px-2 py-0.5">
                    L{test.level}
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  G{test.grade}
                </Badge>
              </div>
            </div>
            <Badge variant="outline" className="text-xs px-2 py-0.5 ml-2 md:ml-0">
              {test.file_type.toUpperCase()}
            </Badge>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col md:flex-row p-4 pt-0 md:pt-4 gap-4 md:gap-8">
            <div className="flex flex-row md:flex-col gap-3 md:gap-2 min-w-[130px]">
              <div className="flex items-center gap-1 text-xs text-neutral-dark/70">
                <User className="h-3 w-3 shrink-0" />
                <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-xs">
                  {getAuthorInitials(test.user_id)}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-neutral-dark/70">
                <Calendar className="h-3 w-3 shrink-0" />
                <span>{formatDate(test.created_at)}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-neutral-dark/70">
                <HardDrive className="h-3 w-3 shrink-0" />
                <span>{formatFileSize(test.file_size)}</span>
              </div>
            </div>
            <div className="flex-1 flex flex-wrap items-center gap-2 md:gap-1">
              {test.topics.length > 0 ? (
                test.topics.slice(0, 3).map((topic) => (
                  <Badge
                    key={topic}
                    variant="outline"
                    className="text-xs px-1.5 py-0.5 max-w-xs truncate"
                    title={topic}
                  >
                    {topic.length > 16 ? topic.substring(0, 16) + "..." : topic}
                  </Badge>
                ))
              ) : (
                <span className="text-neutral-dark/40 text-xs">No topics</span>
              )}
              {test.topics.length > 3 && (
                <Badge
                  variant="outline"
                  className="text-xs px-1.5 py-0.5"
                  title={test.topics.join(", ")}
                >
                  +{test.topics.length - 3}
                </Badge>
              )}
            </div>
            <div className="flex flex-row items-center gap-2 ml-auto mt-4 md:mt-0">
              <Button
                onClick={() => onDownload(test)}
                size="sm"
                variant="outline"
                className="flex gap-1"
                title="Download test"
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(test)}
                className="text-destructive hover:text-destructive"
                title="Delete test"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TestListView;

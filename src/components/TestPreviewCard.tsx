
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

interface TestPreviewCardProps {
  title: string;
  level: string;
  topic: string;
  date: string;
  teacher?: string;
}

const TestPreviewCard: React.FC<TestPreviewCardProps> = ({ title, level, topic, date, teacher }) => {
  const handlePreview = () => {
    toast.info("Preview feature coming soon!");
  };

  const handleDownload = () => {
    toast.success("Test downloaded successfully!");
  };
  
  return (
    <Card className="hover-scale border border-gray-200 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-medium">{title}</CardTitle>
            <CardDescription className="text-sm">
              Level: {level} | Topic: {topic}
            </CardDescription>
          </div>
          <span className="bg-secondary/30 text-xs px-2 py-1 rounded-full">
            {date}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-neutral-dark">
          {teacher && <p>Teacher: {teacher}</p>}
          <p className="mt-2">
            Generated test with mixed questions from various source materials.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <Button variant="outline" size="sm" onClick={handlePreview}>
          Preview
        </Button>
        <Button 
          size="sm" 
          className="bg-primary hover:bg-primary/90 text-white"
          onClick={handleDownload}
        >
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TestPreviewCard;

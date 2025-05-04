
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EditIcon, Download } from './Icons';

interface TestCardProps {
  date: string;
  level: string;
  grade: string;
}

const TestCard: React.FC<TestCardProps> = ({ date, level, grade }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="mb-6">
          <p className="text-lg font-medium">Date: {date}</p>
          <p className="text-neutral-dark">Level: {level}</p>
          <p className="text-neutral-dark">Grade: {grade}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center">
            <EditIcon className="mr-1" size={18} />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <Download className="mr-1" size={18} />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestCard;

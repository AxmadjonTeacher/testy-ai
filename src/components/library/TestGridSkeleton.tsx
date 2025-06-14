
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface TestGridSkeletonProps {
  count?: number;
}

const TestGridSkeleton: React.FC<TestGridSkeletonProps> = ({ count = 10 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {[...Array(count)].map((_, i) => (
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
};

export default TestGridSkeleton;

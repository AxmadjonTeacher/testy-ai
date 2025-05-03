
import React from 'react';
import TestPreviewCard from './TestPreviewCard';

// Sample test data
const recentTests = [
  {
    id: 1,
    title: "Present Simple Test",
    level: "0",
    topic: "Present Simple",
    date: "May 1, 2025",
    teacher: "Emma Smith"
  },
  {
    id: 2,
    title: "Adjectives Practice",
    level: "1",
    topic: "Adjectives",
    date: "May 2, 2025",
  },
  {
    id: 3,
    title: "IELTS Reading",
    level: "IELTS",
    topic: "Reading",
    date: "May 3, 2025",
    teacher: "Robert Johnson"
  }
];

const RecentTestsList: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-neutral-dark">Recent Tests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentTests.map((test) => (
          <TestPreviewCard
            key={test.id}
            title={test.title}
            level={test.level}
            topic={test.topic}
            date={test.date}
            teacher={test.teacher}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTestsList;

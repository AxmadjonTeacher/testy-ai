
import React, { useState } from 'react';
import TestLevelSelector from './TestLevelSelector';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import TestCard from './TestCard';

interface Test {
  id: string;
  date: string;
  level: string;
  grade: string;
}

const Dashboard: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState("0");
  const navigate = useNavigate();
  
  // Mock data - in a real app this would come from an API
  const [tests, setTests] = useState<Test[]>([
    { id: '1', date: '1 May', level: '2', grade: '9-11' },
    { id: '2', date: '2 May', level: '1', grade: '5-6' },
  ]);

  const hasGeneratedTests = tests.length > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-dark mb-6">Test Dashboard</h2>
      </div>
      
      {!hasGeneratedTests ? (
        <div className="text-center py-12">
          <p className="text-xl font-medium text-neutral-dark mb-6">
            You haven't generated any test yet!
          </p>
          <Button 
            className="bg-primary hover:bg-primary/90 text-white"
            onClick={() => navigate('/generate')}
          >
            Get Started
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map(test => (
            <TestCard 
              key={test.id}
              date={test.date}
              level={test.level}
              grade={test.grade}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

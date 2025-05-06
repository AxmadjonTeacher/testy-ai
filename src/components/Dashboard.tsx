
import React, { useState } from 'react';
import TestLevelSelector from './TestLevelSelector';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import TestCard from './TestCard';
import { Edit, Download } from "lucide-react";

interface Test {
  id: string;
  date: string;
  level: string;
  grade: string;
  teacherName?: string;
}

const Dashboard: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState("0");
  const navigate = useNavigate();
  
  // Mock data - in a real app this would come from an API
  const [tests, setTests] = useState<Test[]>([
    { id: '1', date: '1 May 2025', level: '2', grade: '9-11', teacherName: 'John Smith' },
    { id: '2', date: '2 May 2025', level: '1', grade: '5-6', teacherName: 'Sarah Johnson' },
    { id: '3', date: '5 May 2025', level: '0', grade: '5-6', teacherName: 'Yodgorov Axmadjon' },
  ]);

  const hasGeneratedTests = tests.length > 0;
  
  const handleEditTest = (id: string) => {
    // In a real implementation, this would navigate to an edit page
    console.log("Edit test", id);
    navigate(`/generate?edit=${id}`);
  };
  
  const handleDownloadTest = (id: string) => {
    // In a real implementation, this would download the test
    console.log("Download test", id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-neutral-dark">My Tests</h2>
        <Button 
          className="bg-primary hover:bg-primary/90 text-white"
          onClick={() => navigate('/generate')}
        >
          Generate New Test
        </Button>
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
        <div className="grid grid-cols-1 gap-4">
          {tests.map(test => (
            <div key={test.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">English Level {test.level} Test</h3>
                  <p className="text-sm text-gray-600">Generated on: {test.date}</p>
                  <p className="text-sm text-gray-600">Teacher: {test.teacherName}</p>
                  <p className="text-sm text-gray-600">Grade: {test.grade}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleEditTest(test.id)}
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="flex items-center gap-1 bg-primary hover:bg-primary/90"
                    onClick={() => handleDownloadTest(test.id)}
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;


import React, { useState } from 'react';
import TestLevelSelector from './TestLevelSelector';
import UploadPanel from './UploadPanel';
import GenerateTestPanel from './GenerateTestPanel';
import RecentTestsList from './RecentTestsList';

const Dashboard: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState("0");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-dark mb-6">English Test Generator</h2>
        <TestLevelSelector 
          selectedLevel={selectedLevel} 
          onLevelChange={setSelectedLevel} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <UploadPanel level={selectedLevel} />
        <GenerateTestPanel level={selectedLevel} />
      </div>
      
      <div className="mb-8">
        <RecentTestsList />
      </div>
    </div>
  );
};

export default Dashboard;

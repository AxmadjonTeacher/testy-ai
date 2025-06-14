
import React from 'react';

interface TestListHeaderProps {
    selectedSubject: string;
    selectedLevel: string;
}

const TestListHeader: React.FC<TestListHeaderProps> = ({ selectedSubject, selectedLevel }) => {
    const title = selectedSubject === 'all' 
        ? selectedLevel === 'all' 
            ? 'All Tests' 
            : `Level ${selectedLevel} Tests`
        : selectedLevel === 'all'
            ? `${selectedSubject} Tests`
            : `${selectedSubject} - Level ${selectedLevel} Tests`;
            
    return (
        <div className="flex items-center gap-3 mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
        </div>
    );
};

export default TestListHeader;

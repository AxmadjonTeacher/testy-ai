
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Subject {
    value: string;
    label: string;
}

interface LibraryFiltersProps {
    testCount: number;
    selectedSubject: string;
    onSubjectChange: (value: string) => void;
    selectedLevel: string;
    onLevelReset: () => void;
    subjects: Subject[];
}

const LibraryFilters: React.FC<LibraryFiltersProps> = ({
    testCount,
    selectedSubject,
    onSubjectChange,
    selectedLevel,
    onLevelReset,
    subjects,
}) => {
    return (
        <div className="flex items-center gap-4">
            <div className="text-sm text-neutral-dark/70 bg-gray-100 px-3 py-2 rounded">
                {testCount} test{testCount !== 1 ? 's' : ''}
            </div>
            
            <Select value={selectedSubject} onValueChange={onSubjectChange}>
                <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                    {subjects.map((subject) => (
                        <SelectItem key={subject.value} value={subject.value}>
                            {subject.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {selectedLevel !== 'all' && (
                <button 
                    onClick={onLevelReset}
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                    Show all levels
                </button>
            )}
        </div>
    );
};

export default LibraryFilters;

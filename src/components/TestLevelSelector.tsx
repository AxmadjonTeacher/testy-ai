
import React from 'react';
import { Button } from "@/components/ui/button";

interface TestLevel {
  value: string;
  label: string;
}

const levels: TestLevel[] = [
  { value: "0", label: "Level 0" },
  { value: "1", label: "Level 1" },
  { value: "2", label: "Level 2" },
  { value: "3", label: "Level 3" },
  { value: "4", label: "Level 4" },
  { value: "IELTS", label: "IELTS" },
];

interface TestLevelSelectorProps {
  selectedLevel: string;
  onLevelChange: (level: string) => void;
}

const TestLevelSelector: React.FC<TestLevelSelectorProps> = ({ selectedLevel, onLevelChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {levels.map((level) => (
        <Button
          key={level.value}
          variant={selectedLevel === level.value ? "default" : "outline"}
          className={`rounded-full px-4 py-2 ${
            selectedLevel === level.value ? "bg-primary text-white" : "bg-white text-neutral-dark"
          }`}
          onClick={() => onLevelChange(level.value)}
        >
          {level.label}
        </Button>
      ))}
    </div>
  );
};

export default TestLevelSelector;

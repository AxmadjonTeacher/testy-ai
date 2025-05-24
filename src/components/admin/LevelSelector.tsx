
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getLevelsForSubject } from '@/utils/subjectTopics';

interface LevelSelectorProps {
  value: string;
  onChange: (value: string) => void;
  subject?: string;
  disabled?: boolean;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ 
  value, 
  onChange, 
  subject = "", 
  disabled = false 
}) => {
  const availableLevels = getLevelsForSubject(subject);

  return (
    <Select 
      value={value} 
      onValueChange={onChange}
      disabled={disabled || !subject}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a level" />
      </SelectTrigger>
      <SelectContent>
        {availableLevels.map((level) => (
          <SelectItem key={level.value} value={level.value}>
            {level.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LevelSelector;

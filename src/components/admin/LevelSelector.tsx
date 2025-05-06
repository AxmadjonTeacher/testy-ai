
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LevelSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ value, onChange, disabled = false }) => {
  return (
    <Select 
      value={value} 
      onValueChange={onChange}
      disabled={disabled}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a level" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="0">Level 0</SelectItem>
        <SelectItem value="1">Level 1</SelectItem>
        <SelectItem value="2">Level 2</SelectItem>
        <SelectItem value="3">Level 3</SelectItem>
        <SelectItem value="4">Level 4</SelectItem>
        <SelectItem value="IELTS">IELTS</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LevelSelector;

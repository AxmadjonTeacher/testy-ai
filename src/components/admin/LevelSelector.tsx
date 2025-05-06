
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LevelSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="english-level">English Level</Label>
      <Select 
        value={value} 
        onValueChange={onChange}
      >
        <SelectTrigger id="english-level">
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
    </div>
  );
};

export default LevelSelector;

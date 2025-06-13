
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getLevelsForSubject } from '@/utils/subjectConfig';

interface LevelSelectorProps {
  value: string;
  onChange: (value: string) => void;
  subject: string;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ value, onChange, subject }) => {
  const levels = getLevelsForSubject(subject);

  return (
    <div>
      <Label htmlFor="level">Level *</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select level" />
        </SelectTrigger>
        <SelectContent>
          {levels.map((level) => (
            <SelectItem key={level} value={level}>
              Level {level}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LevelSelector;

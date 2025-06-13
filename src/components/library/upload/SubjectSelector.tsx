
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { subjects } from '@/utils/subjectConfig';

interface SubjectSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const SubjectSelector: React.FC<SubjectSelectorProps> = ({ value, onChange }) => {
  return (
    <div>
      <Label htmlFor="subject">Subject *</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
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
    </div>
  );
};

export default SubjectSelector;

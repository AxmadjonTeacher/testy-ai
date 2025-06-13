
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface GradeInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const GradeInput: React.FC<GradeInputProps> = ({ value, onChange, className }) => {
  return (
    <div className={className}>
      <Label htmlFor="grade">Grade *</Label>
      <Input
        id="grade"
        type="number"
        min="1"
        max="12"
        placeholder="Enter grade (e.g., 1, 2, 3)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default GradeInput;


import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getTopicsForSubjectAndLevel } from '@/utils/subjectTopics';

interface TopicSelectorProps {
  value: string;
  onChange: (value: string) => void;
  subject?: string;
  level?: string;
  disabled?: boolean;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ 
  value, 
  onChange, 
  subject = "", 
  level = "", 
  disabled = false 
}) => {
  const availableTopics = getTopicsForSubjectAndLevel(subject, level);

  return (
    <Select 
      value={value} 
      onValueChange={onChange}
      disabled={disabled || !subject || !level}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a topic" />
      </SelectTrigger>
      <SelectContent>
        {availableTopics.map((topic) => (
          <SelectItem key={topic} value={topic}>
            {topic}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TopicSelector;

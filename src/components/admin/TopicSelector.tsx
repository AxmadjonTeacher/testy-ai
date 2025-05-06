
import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { topicsByLevel } from '@/utils/testTopics';

interface TopicSelectorProps {
  value: string;
  onChange: (value: string) => void;
  level: string;
  disabled?: boolean;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ value, onChange, level, disabled = false }) => {
  const [topics, setTopics] = useState<string[]>([]);
  
  useEffect(() => {
    if (level && topicsByLevel[level]) {
      setTopics(topicsByLevel[level]);
    } else {
      setTopics([]);
    }
  }, [level]);
  
  return (
    <Select 
      value={value} 
      onValueChange={onChange}
      disabled={disabled || topics.length === 0}
    >
      <SelectTrigger>
        <SelectValue placeholder={topics.length === 0 ? "Select a level first" : "Select a topic"} />
      </SelectTrigger>
      <SelectContent>
        {topics.map(topic => (
          <SelectItem key={topic} value={topic}>
            {topic}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TopicSelector;


import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TopicSelectorProps {
  value: string;
  onChange: (value: string) => void;
  availableTopics: string[];
  disabled: boolean;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ value, onChange, availableTopics, disabled }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="topic">Topic</Label>
      <Select
        value={value}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger id="topic">
          <SelectValue placeholder={availableTopics.length === 0 ? "Select a level first" : "Select a topic"} />
        </SelectTrigger>
        <SelectContent>
          {availableTopics.map((topicOption) => (
            <SelectItem key={topicOption} value={topicOption}>
              {topicOption}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TopicSelector;

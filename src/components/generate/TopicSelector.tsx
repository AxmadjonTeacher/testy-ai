
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { getTopicsForSubjectAndLevel } from '@/utils/subjectTopics';

interface TopicSelectorProps {
  subject: string;
  level: string;
  selectedTopics: string[];
  onChange: (topics: string[]) => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ 
  subject,
  level, 
  selectedTopics, 
  onChange 
}) => {
  const [availableTopics, setAvailableTopics] = useState<string[]>([]);

  // Update available topics when subject or level changes
  useEffect(() => {
    if (subject && level) {
      const topics = getTopicsForSubjectAndLevel(subject, level);
      setAvailableTopics(topics);
    } else {
      setAvailableTopics([]);
    }
  }, [subject, level]);

  const handleTopicChange = (topic: string) => {
    const updatedTopics = selectedTopics.includes(topic)
      ? selectedTopics.filter(t => t !== topic)
      : [...selectedTopics, topic];
    
    onChange(updatedTopics);
  };

  if (availableTopics.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <Label>Select Topics</Label>
      <div className="max-h-60 overflow-y-auto border rounded-md p-3 space-y-2">
        {availableTopics.map((topic) => (
          <div key={topic} className="flex items-center">
            <input
              type="checkbox"
              id={`topic-${topic}`}
              checked={selectedTopics.includes(topic)}
              onChange={() => handleTopicChange(topic)}
              className="mr-2 h-4 w-4"
            />
            <label htmlFor={`topic-${topic}`} className="text-sm">{topic}</label>
          </div>
        ))}
      </div>
      {selectedTopics.length > 0 && (
        <p className="text-sm text-neutral-dark/70">
          Selected {selectedTopics.length} {selectedTopics.length === 1 ? 'topic' : 'topics'}
        </p>
      )}
    </div>
  );
};

export default TopicSelector;

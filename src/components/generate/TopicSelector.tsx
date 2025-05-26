
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
  const [loading, setLoading] = useState(false);

  // Fetch available topics from database when subject or level changes
  useEffect(() => {
    const fetchAvailableTopics = async () => {
      if (!subject || !level) {
        setAvailableTopics([]);
        return;
      }

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('questions')
          .select('topic')
          .eq('subject', subject)
          .eq('level', level);

        if (error) {
          console.error('Error fetching topics:', error);
          toast.error('Failed to load available topics');
          return;
        }

        // Get unique topics
        const uniqueTopics = [...new Set(data?.map(item => item.topic) || [])];
        setAvailableTopics(uniqueTopics);
      } catch (error) {
        console.error('Error fetching topics:', error);
        toast.error('Failed to load available topics');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableTopics();
  }, [subject, level]);

  const handleTopicChange = (topic: string) => {
    const updatedTopics = selectedTopics.includes(topic)
      ? selectedTopics.filter(t => t !== topic)
      : [...selectedTopics, topic];
    
    onChange(updatedTopics);
  };

  if (!subject || !level) {
    return (
      <div className="space-y-3">
        <Label>Select Topics</Label>
        <p className="text-sm text-neutral-dark/70">Please select a subject and level first</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-3">
        <Label>Select Topics</Label>
        <div className="border rounded-md p-3">
          <p className="text-sm text-neutral-dark/70">Loading available topics...</p>
        </div>
      </div>
    );
  }

  if (availableTopics.length === 0) {
    return (
      <div className="space-y-3">
        <Label>Select Topics</Label>
        <div className="border rounded-md p-3">
          <p className="text-sm text-neutral-dark/70">
            No topics available for {subject} Level {level}. Please upload questions first.
          </p>
        </div>
      </div>
    );
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

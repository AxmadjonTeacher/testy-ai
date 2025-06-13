
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from 'lucide-react';

interface TopicsManagerProps {
  topics: string[];
  currentTopic: string;
  onCurrentTopicChange: (value: string) => void;
  onAddTopic: () => void;
  onRemoveTopic: (topic: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

const TopicsManager: React.FC<TopicsManagerProps> = ({
  topics,
  currentTopic,
  onCurrentTopicChange,
  onAddTopic,
  onRemoveTopic,
  onKeyPress
}) => {
  return (
    <div>
      <Label>Topics *</Label>
      <div className="flex gap-2 mb-2">
        <Input
          placeholder="Enter topic (e.g., Present Simple)"
          value={currentTopic}
          onChange={(e) => onCurrentTopicChange(e.target.value)}
          onKeyPress={onKeyPress}
        />
        <Button type="button" onClick={onAddTopic} size="sm">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <Badge key={topic} variant="secondary" className="flex items-center gap-1">
            {topic}
            <X className="h-3 w-3 cursor-pointer" onClick={() => onRemoveTopic(topic)} />
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default TopicsManager;

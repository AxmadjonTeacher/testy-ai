
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { topicsByLevel } from '@/utils/testTopics';

interface GenerateTestPanelProps {
  level: string;
}

const GenerateTestPanel: React.FC<GenerateTestPanelProps> = ({ level }) => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [teacherName, setTeacherName] = useState("");
  const [grade, setGrade] = useState("");
  const [includeAnswers, setIncludeAnswers] = useState(true);
  const [availableTopics, setAvailableTopics] = useState<string[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    setAvailableTopics(topicsByLevel[level] || []);
  }, [level]);

  const handleGenerate = () => {
    if (!selectedTopic) {
      toast.error("Please select a topic");
      return;
    }
    
    setGenerating(true);
    
    // Simulate generation process and navigate to the full generate page
    setTimeout(() => {
      setGenerating(false);
      navigate('/generate');
    }, 1000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-primary">Generate New Test</CardTitle>
        <CardDescription>Mix existing tests to create a new one</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic-select">Select Topic</Label>
            <Select value={selectedTopic} onValueChange={setSelectedTopic}>
              <SelectTrigger id="topic-select">
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                {availableTopics.map((topic) => (
                  <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="teacher-gen">Teacher Name (optional)</Label>
            <Input
              id="teacher-gen"
              placeholder="Enter teacher name"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="grade-select">Grade (optional)</Label>
            <Select value={grade} onValueChange={setGrade}>
              <SelectTrigger id="grade-select">
                <SelectValue placeholder="Select grade range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5-6">Grades 5-6</SelectItem>
                <SelectItem value="7-8">Grades 7-8</SelectItem>
                <SelectItem value="9-11">Grades 9-11</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="answers" 
              checked={includeAnswers} 
              onCheckedChange={(checked) => setIncludeAnswers(checked as boolean)} 
            />
            <Label htmlFor="answers">Include answer sheet</Label>
          </div>
          
          <Button 
            onClick={handleGenerate} 
            className="w-full bg-accent hover:bg-accent/90 text-white"
            disabled={generating || !selectedTopic}
          >
            {generating ? "Generating..." : "Generate Test"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GenerateTestPanel;

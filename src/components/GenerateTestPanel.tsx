
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface GenerateTestPanelProps {
  level: string;
}

const GenerateTestPanel: React.FC<GenerateTestPanelProps> = ({ level }) => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [teacherName, setTeacherName] = useState("");
  const [includeAnswers, setIncludeAnswers] = useState(true);

  // Example topics based on level
  const getTopics = (level: string) => {
    switch(level) {
      case "0":
        return ["Present Simple", "Adjectives", "Basic Vocabulary"];
      case "1":
        return ["Present Continuous", "Past Simple", "Comparatives"];
      case "2":
        return ["Past Continuous", "Present Perfect", "Conditionals Type 1"];
      case "3":
        return ["Past Perfect", "Future Tenses", "Conditionals Type 2"];
      case "4":
        return ["Passive Voice", "Reported Speech", "Advanced Grammar"];
      case "IELTS":
        return ["Reading", "Writing Task 1", "Writing Task 2", "Speaking"];
      default:
        return ["Select a level first"];
    }
  };

  const handleGenerate = () => {
    if (!selectedTopic) {
      toast.error("Please select a topic");
      return;
    }
    
    setGenerating(true);
    
    // Simulate generation process
    setTimeout(() => {
      setGenerating(false);
      toast.success(`Test for ${level} - ${selectedTopic} generated successfully`);
    }, 3000);
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
                {getTopics(level).map((topic) => (
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

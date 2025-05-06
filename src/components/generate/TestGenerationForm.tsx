
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TopicSelector from './TopicSelector';
import { TestParams } from '@/services/testGenerationService';

interface TestGenerationFormProps {
  onGenerate: (params: TestParams) => Promise<boolean>;
  isGenerating: boolean;
  isEditMode?: boolean;
  editTestId?: string | null;
}

const TestGenerationForm: React.FC<TestGenerationFormProps> = ({
  onGenerate,
  isGenerating,
  isEditMode = false,
  editTestId = null
}) => {
  const [englishLevel, setEnglishLevel] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [grade, setGrade] = useState("");
  const [numQuestions, setNumQuestions] = useState("15");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  // If in edit mode, we would load the test data here
  useEffect(() => {
    if (isEditMode && editTestId) {
      // This would be an API call in a real implementation
      // For now, let's just simulate with some mock data
      console.log(`Loading test data for ID: ${editTestId}`);
      
      // Mock data - in a real app would come from an API
      const mockData = {
        level: "1",
        teacherName: "Yodgorov Axmadjon",
        grade: "5-6",
        numQuestions: "15",
        topics: ["Present Simple", "Past Simple"]
      };
      
      // Set form values
      setEnglishLevel(mockData.level);
      setTeacherName(mockData.teacherName);
      setGrade(mockData.grade);
      setNumQuestions(mockData.numQuestions);
      setSelectedTopics(mockData.topics);
    }
  }, [isEditMode, editTestId]);

  const handleGenerate = async () => {
    const params: TestParams = {
      level: englishLevel,
      teacherName: teacherName || undefined,
      grade: grade || undefined,
      numQuestions: parseInt(numQuestions),
      topics: selectedTopics
    };
    
    await onGenerate(params);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="english-level">English Level</Label>
              <Select 
                value={englishLevel} 
                onValueChange={setEnglishLevel}
              >
                <SelectTrigger id="english-level">
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Level 0</SelectItem>
                  <SelectItem value="1">Level 1</SelectItem>
                  <SelectItem value="2">Level 2</SelectItem>
                  <SelectItem value="3">Level 3</SelectItem>
                  <SelectItem value="4">Level 4</SelectItem>
                  <SelectItem value="IELTS">IELTS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="teacher-name">Teacher's full name</Label>
              <Input
                id="teacher-name"
                placeholder="Enter teacher's name"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="grade">Grade</Label>
              <Select 
                value={grade} 
                onValueChange={setGrade}
              >
                <SelectTrigger id="grade">
                  <SelectValue placeholder="Select grade range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5-6">Grades 5-6</SelectItem>
                  <SelectItem value="7-8">Grades 7-8</SelectItem>
                  <SelectItem value="9-11">Grades 9-11</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="num-questions">Number of Questions</Label>
              <Select 
                value={numQuestions} 
                onValueChange={setNumQuestions}
              >
                <SelectTrigger id="num-questions">
                  <SelectValue placeholder="Select number" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 questions</SelectItem>
                  <SelectItem value="15">15 questions</SelectItem>
                  <SelectItem value="20">20 questions</SelectItem>
                  <SelectItem value="25">25 questions</SelectItem>
                  <SelectItem value="30">30 questions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <TopicSelector 
            level={englishLevel}
            selectedTopics={selectedTopics}
            onChange={setSelectedTopics}
          />
          
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-white"
            disabled={isGenerating || selectedTopics.length === 0}
            onClick={handleGenerate}
          >
            {isGenerating ? "Generating..." : isEditMode ? "Update test" : "Generate a new test"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestGenerationForm;

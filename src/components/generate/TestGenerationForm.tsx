
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TopicSelector from './TopicSelector';
import { TestParams } from '@/services/testGenerationService';
import { subjects, getLevelsForSubject } from '@/utils/subjectTopics';

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
  const [subject, setSubject] = useState("");
  const [englishLevel, setEnglishLevel] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [grade, setGrade] = useState("");
  const [numQuestions, setNumQuestions] = useState("15");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [availableLevels, setAvailableLevels] = useState<Array<{value: string, label: string}>>([]);

  // Update available levels when subject changes
  useEffect(() => {
    if (subject) {
      const levels = getLevelsForSubject(subject);
      setAvailableLevels(levels);
      setEnglishLevel(""); // Reset level when subject changes
      setSelectedTopics([]); // Reset topics when subject changes
    } else {
      setAvailableLevels([]);
    }
  }, [subject]);

  // If in edit mode, we would load the test data here
  useEffect(() => {
    if (isEditMode && editTestId) {
      // This would be an API call in a real implementation
      // For now, let's just simulate with some mock data
      console.log(`Loading test data for ID: ${editTestId}`);
      
      // Mock data - in a real app would come from an API
      const mockData = {
        subject: "English",
        level: "1",
        teacherName: "Yodgorov Axmadjon",
        grade: "5-6",
        numQuestions: "15",
        topics: ["Present Simple", "Past Simple"]
      };
      
      // Set form values
      setSubject(mockData.subject);
      setEnglishLevel(mockData.level);
      setTeacherName(mockData.teacherName);
      setGrade(mockData.grade);
      setNumQuestions(mockData.numQuestions);
      setSelectedTopics(mockData.topics);
    }
  }, [isEditMode, editTestId]);

  const handleGenerate = async () => {
    const params: TestParams = {
      subject,
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
      <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-sm mb-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-gray-700 font-medium">Subject</Label>
            <Select 
              value={subject} 
              onValueChange={setSubject}
            >
              <SelectTrigger id="subject" className="bg-white border-gray-300 text-gray-900">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                {subjects.map((subj) => (
                  <SelectItem key={subj.value} value={subj.value} className="text-gray-900 hover:bg-gray-50">
                    {subj.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="level" className="text-gray-700 font-medium">
                {subject === "Math" ? "Grade Level" : "English Level"}
              </Label>
              <Select 
                value={englishLevel} 
                onValueChange={setEnglishLevel}
                disabled={!subject}
              >
                <SelectTrigger id="level" className="bg-white border-gray-300 text-gray-900">
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  {availableLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value} className="text-gray-900 hover:bg-gray-50">
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="teacher-name" className="text-gray-700 font-medium">Teacher's full name</Label>
              <Input
                id="teacher-name"
                placeholder="Enter teacher's name"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="grade" className="text-gray-700 font-medium">Grade</Label>
              <Select 
                value={grade} 
                onValueChange={setGrade}
              >
                <SelectTrigger id="grade" className="bg-white border-gray-300 text-gray-900">
                  <SelectValue placeholder="Select grade range" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="5-6" className="text-gray-900 hover:bg-gray-50">Grades 5-6</SelectItem>
                  <SelectItem value="7-8" className="text-gray-900 hover:bg-gray-50">Grades 7-8</SelectItem>
                  <SelectItem value="9-11" className="text-gray-900 hover:bg-gray-50">Grades 9-11</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="num-questions" className="text-gray-700 font-medium">Number of Questions</Label>
              <Select 
                value={numQuestions} 
                onValueChange={setNumQuestions}
              >
                <SelectTrigger id="num-questions" className="bg-white border-gray-300 text-gray-900">
                  <SelectValue placeholder="Select number" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="10" className="text-gray-900 hover:bg-gray-50">10 questions</SelectItem>
                  <SelectItem value="15" className="text-gray-900 hover:bg-gray-50">15 questions</SelectItem>
                  <SelectItem value="20" className="text-gray-900 hover:bg-gray-50">20 questions</SelectItem>
                  <SelectItem value="25" className="text-gray-900 hover:bg-gray-50">25 questions</SelectItem>
                  <SelectItem value="30" className="text-gray-900 hover:bg-gray-50">30 questions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <TopicSelector 
            subject={subject}
            level={englishLevel}
            selectedTopics={selectedTopics}
            onChange={setSelectedTopics}
          />
          
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-sm"
            disabled={isGenerating || selectedTopics.length === 0 || !subject}
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

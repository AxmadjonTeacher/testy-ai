
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from 'sonner';
import TestPreview from './TestPreview';

const GenerateTest: React.FC = () => {
  const [englishLevel, setEnglishLevel] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [grade, setGrade] = useState("");
  const [numQuestions, setNumQuestions] = useState("15");
  const [includeReading, setIncludeReading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTest, setGeneratedTest] = useState<any>(null);

  const handleGenerate = () => {
    if (!englishLevel) {
      toast.error("Please select an English level");
      return;
    }

    setIsGenerating(true);
    
    // Simulate test generation with a delay
    setTimeout(() => {
      setIsGenerating(false);
      
      // Mock generated test data
      setGeneratedTest({
        id: Math.random().toString(36).substring(2, 9),
        level: englishLevel,
        teacherName: teacherName || "Not specified",
        grade: grade || "Not specified",
        numQuestions: parseInt(numQuestions),
        includesReading: includeReading,
        dateGenerated: new Date().toLocaleDateString(),
      });
      
      toast.success("Test generated successfully!");
    }, 2500);
  };

  const resetForm = () => {
    setGeneratedTest(null);
    setIsGenerating(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-neutral-dark mb-6">Generate a new test</h2>
      
      {!generatedTest ? (
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
                  <Input
                    id="grade"
                    placeholder="e.g., 9-11, 5-6"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                  />
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
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-reading" 
                  checked={includeReading} 
                  onCheckedChange={(checked) => setIncludeReading(checked as boolean)} 
                />
                <Label htmlFor="include-reading">Include Reading</Label>
              </div>
              
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-white"
                disabled={isGenerating}
                onClick={handleGenerate}
              >
                {isGenerating ? "Generating..." : "Generate a new test"}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <TestPreview test={generatedTest} onBack={resetForm} />
      )}
    </div>
  );
};

export default GenerateTest;


import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import TestPreview from './TestPreview';
import { fetchQuestions, saveGeneratedTest, TestParams } from '@/services/testGenerationService';
import { generateWordDocument, downloadDocument } from '@/services/documentExportService';
import { topicsByLevel } from '@/utils/testTopics';
import type { Database } from "@/integrations/supabase/types";

type Question = Database["public"]["Tables"]["questions"]["Row"];

const GenerateTest: React.FC = () => {
  const [englishLevel, setEnglishLevel] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [grade, setGrade] = useState("");
  const [numQuestions, setNumQuestions] = useState("15");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTest, setGeneratedTest] = useState<any>(null);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [availableTopics, setAvailableTopics] = useState<string[]>([]);
  
  // Update available topics when English level changes
  useEffect(() => {
    if (englishLevel) {
      setAvailableTopics(topicsByLevel[englishLevel] || []);
      setSelectedTopics([]);
    } else {
      setAvailableTopics([]);
    }
  }, [englishLevel]);

  const handleGenerate = async () => {
    if (!englishLevel) {
      toast.error("Please select an English level");
      return;
    }

    if (selectedTopics.length === 0) {
      toast.error("Please select at least one topic");
      return;
    }

    setIsGenerating(true);
    
    try {
      // Set up test parameters
      const testParams: TestParams = {
        level: englishLevel,
        teacherName: teacherName || undefined,
        grade: grade || undefined,
        numQuestions: parseInt(numQuestions),
        topics: selectedTopics
      };
      
      // Fetch questions from Supabase
      const questions = await fetchQuestions(testParams);
      
      if (questions.length === 0) {
        toast.error("No questions found for the selected criteria");
        setIsGenerating(false);
        return;
      }
      
      if (questions.length < parseInt(numQuestions)) {
        toast.warning(`Only ${questions.length} questions available with the selected criteria`);
      }
      
      // Save the generated test
      const testName = `English Level ${englishLevel} Test`;
      const testId = await saveGeneratedTest(testName, testParams, questions);
      
      setGeneratedQuestions(questions);
      
      // Set the generated test data for preview
      setGeneratedTest({
        id: testId,
        level: englishLevel,
        teacherName: teacherName || "Not specified",
        grade: grade || "Not specified",
        numQuestions: questions.length,
        topics: selectedTopics,
        dateGenerated: new Date().toLocaleDateString(),
      });
      
      toast.success("Test generated successfully!");
    } catch (error) {
      console.error("Error generating test:", error);
      toast.error("Failed to generate test. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTopicChange = (topic: string) => {
    setSelectedTopics(prev => {
      if (prev.includes(topic)) {
        return prev.filter(t => t !== topic);
      } else {
        return [...prev, topic];
      }
    });
  };

  const handleDownload = async () => {
    try {
      if (!generatedTest) return;
      
      const docData = {
        title: `English Level ${englishLevel} Test`,
        teacher: teacherName || null,
        level: englishLevel,
        grade: grade || undefined,
        questions: generatedQuestions,
        includeAnswers: true,
        dateGenerated: new Date().toLocaleDateString()
      };
      
      const blob = await generateWordDocument(docData);
      downloadDocument(blob, `english_level_${englishLevel}_test.docx`);
      
      toast.success("Test downloaded successfully!");
    } catch (error) {
      console.error("Error downloading test:", error);
      toast.error("Failed to download test. Please try again.");
    }
  };

  const resetForm = () => {
    setGeneratedTest(null);
    setGeneratedQuestions([]);
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
              
              {availableTopics.length > 0 && (
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
              )}
              
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-white"
                disabled={isGenerating || selectedTopics.length === 0}
                onClick={handleGenerate}
              >
                {isGenerating ? "Generating..." : "Generate a new test"}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <TestPreview 
          test={generatedTest} 
          questions={generatedQuestions}
          onBack={resetForm}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
};

export default GenerateTest;

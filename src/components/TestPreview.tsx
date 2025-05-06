
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, EditIcon } from './Icons';
import type { Database } from "@/integrations/supabase/types";

type Question = Database["public"]["Tables"]["questions"]["Row"];

interface TestPreviewProps {
  test: {
    id: string;
    level: string;
    teacherName: string;
    grade: string;
    numQuestions: number;
    topics?: string[];
    dateGenerated: string;
  };
  questions: Question[];
  onBack: () => void;
  onDownload: () => void;
}

const TestPreview: React.FC<TestPreviewProps> = ({ test, questions, onBack, onDownload }) => {
  const handleEdit = () => {
    // In a real implementation, this would open an editor
    console.log("Edit test", test.id);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="outline" onClick={onBack} className="mb-4">
        Back to generator
      </Button>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">Test Preview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-neutral-dark/70">Level:</p>
                <p className="font-medium">{test.level}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-dark/70">Teacher:</p>
                <p className="font-medium">{test.teacherName}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-dark/70">Grade:</p>
                <p className="font-medium">{test.grade}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-dark/70">Questions:</p>
                <p className="font-medium">{test.numQuestions}</p>
              </div>
              {test.topics && test.topics.length > 0 && (
                <div className="col-span-2">
                  <p className="text-sm text-neutral-dark/70">Topics:</p>
                  <p className="font-medium">{test.topics.join(", ")}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-neutral-dark/70">Date Generated:</p>
                <p className="font-medium">{test.dateGenerated}</p>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              className="flex items-center gap-2"
              variant="outline"
              onClick={handleEdit}
            >
              <EditIcon size={18} />
              Edit
            </Button>
            <Button 
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white"
              onClick={onDownload}
            >
              <Download size={18} />
              Download
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="p-4 rounded-lg border border-neutral-light bg-white">
        <h4 className="text-lg font-medium mb-3">Test Content Preview</h4>
        <p className="text-neutral-dark/70 text-sm mb-4">This is a preview of how your test will look when downloaded.</p>
        
        <div className="space-y-4 p-4 border rounded-lg bg-neutral-light/30">
          <div className="text-center mb-6">
            <p className="text-xl font-bold">ENGLISH LANGUAGE SCHOOL</p>
            <p className="text-lg font-bold">English Level {test.level} Test</p>
          </div>
          
          <div className="border-b pb-4">
            <p>Teacher: {test.teacherName}</p>
            <p>Grade: {test.grade}</p>
            <p>Date: {test.dateGenerated}</p>
            {test.topics && test.topics.length > 0 && (
              <p>Topics: {test.topics.join(", ")}</p>
            )}
            <p className="mt-2">Student's Name: _______________________________</p>
            <p>Class: _______________________________</p>
          </div>
          
          <div className="space-y-3">
            <p className="font-medium">Instructions: Answer all questions by selecting the correct option.</p>
            
            {questions.slice(0, 3).map((question, index) => (
              <div key={question.id} className="mb-4">
                <p className="font-medium">{index + 1}. {question.question_text}</p>
                <div className="pl-4 mt-1">
                  <p>A) {question.option_a}</p>
                  <p>B) {question.option_b}</p>
                  <p>C) {question.option_c}</p>
                  <p>D) {question.option_d}</p>
                </div>
              </div>
            ))}
            
            {questions.length > 3 && (
              <p className="text-neutral-dark/50 italic">... {questions.length - 3} more questions would be displayed here ...</p>
            )}
            
            <div className="mt-6 pt-4 border-t">
              <p className="font-bold">Answer Sheet Preview:</p>
              <table className="w-full mt-2 border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-400 p-2">Question</th>
                    <th className="border border-gray-400 p-2">A</th>
                    <th className="border border-gray-400 p-2">B</th>
                    <th className="border border-gray-400 p-2">C</th>
                    <th className="border border-gray-400 p-2">D</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.slice(0, 5).map((_, index) => (
                    <tr key={index}>
                      <td className="border border-gray-400 p-2 font-medium text-center">{index + 1}</td>
                      <td className="border border-gray-400 p-2"></td>
                      <td className="border border-gray-400 p-2"></td>
                      <td className="border border-gray-400 p-2"></td>
                      <td className="border border-gray-400 p-2"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {questions.length > 5 && (
                <p className="text-xs text-neutral-dark/50 italic mt-2">... and rows for all other questions ...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPreview;

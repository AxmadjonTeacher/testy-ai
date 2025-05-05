
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
    includesReading: boolean;
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
              <div>
                <p className="text-sm text-neutral-dark/70">Includes Reading:</p>
                <p className="font-medium">{test.includesReading ? "Yes" : "No"}</p>
              </div>
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
          <div className="border-b pb-2">
            <p className="font-bold">English Level {test.level} Test</p>
            <p>Teacher: {test.teacherName}</p>
            <p>Grade: {test.grade}</p>
            <p>Date: {test.dateGenerated}</p>
          </div>
          
          <div className="space-y-3">
            <p className="font-medium">Instructions: Answer all questions.</p>
            
            {questions.slice(0, 3).map((question, index) => (
              <div key={question.id} className="mb-4">
                <p className="font-medium">{index + 1}. {question.question_text}</p>
                <div className="pl-4 mt-1">
                  <p>a) {question.option_a}</p>
                  <p>b) {question.option_b}</p>
                  <p>c) {question.option_c}</p>
                  <p>d) {question.option_d}</p>
                </div>
              </div>
            ))}
            
            {questions.length > 3 && (
              <p className="text-neutral-dark/50 italic">... {questions.length - 3} more questions would be displayed here ...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPreview;

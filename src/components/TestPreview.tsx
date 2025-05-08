
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from './Icons';
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
          
          <div>
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
          {/* Enhanced School Logo */}
          <div className="text-center mb-8 border-b pb-4">
            <img 
              src="/lovable-uploads/4c0b0f63-7ceb-4c2e-8a95-d86e02ca20f9.png"
              alt="AL-XORAZMIY SCHOOL" 
              className="h-24 mx-auto mb-4"
            />
          </div>
          
          <div className="border-b pb-4">
            <p className="font-medium">#Level: {test.level} #Grade: {test.grade} #Teacher: {test.teacherName}</p>
            <p className="mt-2">Student's name: _______________________________  Class: _______________________________</p>
          </div>
          
          <div className="space-y-4">
            <p className="font-medium">Instructions: Answer all questions by selecting the correct option.</p>
            
            {/* Display questions */}
            {questions.slice(0, Math.min(5, questions.length)).map((question, index) => (
              <div key={question.id} className="mb-4">
                <p className="font-medium">{index + 1}. {question.question_text}</p>
                <div className="flex flex-col ml-8">
                  <p className="mb-1">a) {question.option_a}</p>
                  <p className="mb-1">b) {question.option_b}</p>
                  <p className="mb-1">c) {question.option_c}</p>
                  <p className="mb-1">d) {question.option_d}</p>
                </div>
              </div>
            ))}
            
            {questions.length > 5 && (
              <p className="text-neutral-dark/50 italic">... {questions.length - 5} more questions would be displayed here ...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPreview;

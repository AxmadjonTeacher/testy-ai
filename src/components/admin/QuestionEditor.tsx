
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Save, Trash } from "lucide-react";

interface Question {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
}

interface QuestionEditorProps {
  questions: Question[];
  onSave: (updatedQuestions: Question[]) => void;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({ questions, onSave }) => {
  const [editingQuestions, setEditingQuestions] = useState<Question[]>(questions);
  const [editMode, setEditMode] = useState<{[key: string]: boolean}>({});

  const toggleEditMode = (questionId: string) => {
    setEditMode(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const updateQuestion = (index: number, field: keyof Question, value: string) => {
    const updatedQuestions = [...editingQuestions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value
    };
    setEditingQuestions(updatedQuestions);
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = [...editingQuestions];
    updatedQuestions.splice(index, 1);
    setEditingQuestions(updatedQuestions);
  };

  const handleSave = () => {
    onSave(editingQuestions);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Edit Questions ({editingQuestions.length})</h3>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save All Changes
        </Button>
      </div>
      
      {editingQuestions.map((question, index) => (
        <Card key={question.id} className="overflow-hidden">
          <CardHeader className="bg-muted/20 py-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-base">Question {index + 1}</CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => toggleEditMode(question.id)}
                >
                  {editMode[question.id] ? 'Preview' : (
                    <>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </>
                  )}
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => removeQuestion(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            {editMode[question.id] ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor={`question-${index}`}>Question Text</Label>
                  <Input 
                    id={`question-${index}`}
                    value={question.question_text}
                    onChange={(e) => updateQuestion(index, 'question_text', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`option-a-${index}`}>Option A</Label>
                    <Input 
                      id={`option-a-${index}`}
                      value={question.option_a}
                      onChange={(e) => updateQuestion(index, 'option_a', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`option-b-${index}`}>Option B</Label>
                    <Input 
                      id={`option-b-${index}`}
                      value={question.option_b}
                      onChange={(e) => updateQuestion(index, 'option_b', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`option-c-${index}`}>Option C</Label>
                    <Input 
                      id={`option-c-${index}`}
                      value={question.option_c}
                      onChange={(e) => updateQuestion(index, 'option_c', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`option-d-${index}`}>Option D</Label>
                    <Input 
                      id={`option-d-${index}`}
                      value={question.option_d}
                      onChange={(e) => updateQuestion(index, 'option_d', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor={`correct-answer-${index}`}>Correct Answer</Label>
                  <Select 
                    value={question.correct_answer}
                    onValueChange={(value) => updateQuestion(index, 'correct_answer', value)}
                  >
                    <SelectTrigger id={`correct-answer-${index}`} className="w-full">
                      <SelectValue placeholder="Select correct answer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="D">D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : (
              <div>
                <p className="mb-2">{question.question_text}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p><strong>A:</strong> {question.option_a}</p>
                  <p><strong>B:</strong> {question.option_b}</p>
                  <p><strong>C:</strong> {question.option_c}</p>
                  <p><strong>D:</strong> {question.option_d}</p>
                </div>
                <div className="mt-2 p-1 bg-primary/10 inline-block rounded">
                  <strong>Correct Answer:</strong> {question.correct_answer}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      
      {editingQuestions.length === 0 && (
        <div className="text-center py-8 border rounded-md">
          <p className="text-neutral-dark">No questions available to edit.</p>
        </div>
      )}
      
      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save All Changes
        </Button>
      </div>
    </div>
  );
};

export default QuestionEditor;

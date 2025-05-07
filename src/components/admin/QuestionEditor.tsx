
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Save, Trash } from "lucide-react";
import { QuestionFormData } from './QuestionForm';

interface QuestionEditorProps {
  index: number; // Add index property to the interface
  question: QuestionFormData;
  onUpdate: (index: number, updatedQuestion: QuestionFormData) => void;
  onDelete: (index: number) => void;
  isSubmitting: boolean;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({ index, question, onUpdate, onDelete, isSubmitting }) => {
  const [editMode, setEditMode] = useState(false);

  const handleToggleEditMode = () => {
    setEditMode(prev => !prev);
  };

  const handleUpdate = (field: keyof QuestionFormData, value: string) => {
    onUpdate(index, {
      ...question,
      [field]: value
    });
  };

  return (
    <Card key={index} className="overflow-hidden">
      <CardHeader className="bg-muted/20 py-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">Question {index + 1}</CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleToggleEditMode}
              disabled={isSubmitting}
            >
              {editMode ? 'Preview' : (
                <>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </>
              )}
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => onDelete(index)}
              disabled={isSubmitting}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {editMode ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor={`question-${index}`}>Question Text</Label>
              <Input 
                id={`question-${index}`}
                value={question.question_text}
                onChange={(e) => handleUpdate('question_text', e.target.value)}
                className="mt-1"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`option-a-${index}`}>Option A</Label>
                <Input 
                  id={`option-a-${index}`}
                  value={question.option_a}
                  onChange={(e) => handleUpdate('option_a', e.target.value)}
                  className="mt-1"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Label htmlFor={`option-b-${index}`}>Option B</Label>
                <Input 
                  id={`option-b-${index}`}
                  value={question.option_b}
                  onChange={(e) => handleUpdate('option_b', e.target.value)}
                  className="mt-1"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Label htmlFor={`option-c-${index}`}>Option C</Label>
                <Input 
                  id={`option-c-${index}`}
                  value={question.option_c}
                  onChange={(e) => handleUpdate('option_c', e.target.value)}
                  className="mt-1"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Label htmlFor={`option-d-${index}`}>Option D</Label>
                <Input 
                  id={`option-d-${index}`}
                  value={question.option_d}
                  onChange={(e) => handleUpdate('option_d', e.target.value)}
                  className="mt-1"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor={`correct-answer-${index}`}>Correct Answer</Label>
              <Select 
                value={question.correct_answer}
                onValueChange={(value) => handleUpdate('correct_answer', value)}
                disabled={isSubmitting}
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
  );
};

export default QuestionEditor;

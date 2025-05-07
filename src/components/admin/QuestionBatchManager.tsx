
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Save, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import QuestionForm, { QuestionFormData } from './QuestionForm';

interface QuestionBatchManagerProps {
  initialQuestions?: QuestionFormData[];
  level: string;
  topic: string;
  onSave: (questions: QuestionFormData[]) => Promise<void>;
  isSubmitting?: boolean;
}

const QuestionBatchManager: React.FC<QuestionBatchManagerProps> = ({
  initialQuestions = [],
  level,
  topic,
  onSave,
  isSubmitting = false
}) => {
  const [questions, setQuestions] = useState<QuestionFormData[]>(initialQuestions);
  const [rawText, setRawText] = useState<string>('');
  const [isParsingText, setIsParsingText] = useState<boolean>(false);

  const handleAddQuestion = (question: QuestionFormData) => {
    setQuestions(prev => [...prev, question]);
  };

  const handleUpdateQuestion = (index: number, updatedQuestion: QuestionFormData) => {
    setQuestions(prev => 
      prev.map((q, i) => i === index ? updatedQuestion : q)
    );
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitBatch = () => {
    if (questions.length > 0) {
      onSave(questions);
    }
  };

  // Basic parsing of pasted text into questions
  const parseRawText = () => {
    setIsParsingText(true);
    try {
      // This is a very basic parser and would need to be enhanced for real use
      const lines = rawText.split('\n').filter(line => line.trim().length > 0);
      const parsedQuestions: QuestionFormData[] = [];
      
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim().match(/^\d+[\.\)]|^[QQ]uestion\s*\d+[\.\:]/i)) {
          // This looks like a question line
          const questionText = lines[i].replace(/^\d+[\.\)]|^[QQ]uestion\s*\d+[\.\:]/, '').trim();
          
          let optionA = '', optionB = '', optionC = '', optionD = '', correctAnswer = 'A';
          
          // Look for options in the next lines
          for (let j = 1; j <= 4; j++) {
            if (i + j < lines.length) {
              const optionLine = lines[i + j].trim();
              if (optionLine.match(/^[Aa][\.\)]|^[Aa]\s*[\.\)]/)) {
                optionA = optionLine.replace(/^[Aa][\.\)]|^[Aa]\s*[\.\)]/, '').trim();
              } else if (optionLine.match(/^[Bb][\.\)]|^[Bb]\s*[\.\)]/)) {
                optionB = optionLine.replace(/^[Bb][\.\)]|^[Bb]\s*[\.\)]/, '').trim();
              } else if (optionLine.match(/^[Cc][\.\)]|^[Cc]\s*[\.\)]/)) {
                optionC = optionLine.replace(/^[Cc][\.\)]|^[Cc]\s*[\.\)]/, '').trim();
              } else if (optionLine.match(/^[Dd][\.\)]|^[Dd]\s*[\.\)]/)) {
                optionD = optionLine.replace(/^[Dd][\.\)]|^[Dd]\s*[\.\)]/, '').trim();
              }
            }
          }
          
          // Look for answer line
          for (let j = 1; j <= 6; j++) {
            if (i + j < lines.length) {
              const answerLine = lines[i + j].toLowerCase().trim();
              if (answerLine.includes('answer') || answerLine.match(/^ans[\.\:]?/)) {
                if (answerLine.includes('a') || answerLine.includes('1')) correctAnswer = 'A';
                else if (answerLine.includes('b') || answerLine.includes('2')) correctAnswer = 'B';
                else if (answerLine.includes('c') || answerLine.includes('3')) correctAnswer = 'C';
                else if (answerLine.includes('d') || answerLine.includes('4')) correctAnswer = 'D';
                break;
              }
            }
          }
          
          if (questionText && optionA && optionB) {
            parsedQuestions.push({
              question_text: questionText,
              option_a: optionA,
              option_b: optionB,
              option_c: optionC || 'No option C provided',
              option_d: optionD || 'No option D provided',
              correct_answer: correctAnswer
            });
          }
          
          // Skip ahead to avoid processing the same lines again
          i += 5;
        }
      }
      
      if (parsedQuestions.length > 0) {
        setQuestions(prev => [...prev, ...parsedQuestions]);
        setRawText('');
      }
    } catch (error) {
      console.error("Error parsing text:", error);
    } finally {
      setIsParsingText(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            {questions.length > 0 
              ? `${questions.length} Question${questions.length !== 1 ? 's' : ''} for ${level} - ${topic}` 
              : 'Add Questions'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {questions.length > 0 ? (
            <div className="space-y-6">
              {questions.map((question, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardHeader className="py-3 bg-gray-50 flex flex-row justify-between items-center">
                    <CardTitle className="text-sm font-medium">Question {index + 1}</CardTitle>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => handleRemoveQuestion(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <QuestionForm 
                      initialData={question} 
                      onSubmit={(data) => handleUpdateQuestion(index, data)}
                    />
                  </CardContent>
                </Card>
              ))}
              
              <div className="flex justify-between items-center pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setQuestions([])}
                  disabled={isSubmitting}
                >
                  Clear All
                </Button>
                <Button 
                  onClick={handleSubmitBatch} 
                  disabled={isSubmitting || questions.length === 0}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Saving..." : "Save All Questions"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-neutral-dark">
              <p>No questions added yet. Use the form below to add questions.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add New Question</CardTitle>
        </CardHeader>
        <CardContent>
          <QuestionForm onSubmit={handleAddQuestion} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Paste Questions from Document</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea 
              placeholder="Paste raw text from your document here..." 
              className="min-h-[200px]"
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
            />
            <Button 
              onClick={parseRawText} 
              disabled={isParsingText || !rawText}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              {isParsingText ? "Parsing Text..." : "Parse and Add Questions"}
            </Button>
            <p className="text-sm text-neutral-dark">
              Note: The text parser works best with formatted text that has clear question numbers, 
              options labeled A, B, C, D, and clearly marked answers.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionBatchManager;

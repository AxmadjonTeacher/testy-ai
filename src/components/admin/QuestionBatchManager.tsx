import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionEditor from './QuestionEditor';
import QuestionForm, { QuestionFormData } from './QuestionForm';

interface QuestionBatchManagerProps {
  initialQuestions?: QuestionFormData[];
  level?: string;
  topic?: string;
  onSave: (questions: QuestionFormData[]) => Promise<void>;
  isSubmitting: boolean;
}

const QuestionBatchManager: React.FC<QuestionBatchManagerProps> = ({ 
  initialQuestions = [],
  level = '',
  topic = '',
  onSave,
  isSubmitting
}) => {
  const [questions, setQuestions] = useState<QuestionFormData[]>(initialQuestions);
  const [activeTab, setActiveTab] = useState("add");
  
  const handleAddQuestion = (question: QuestionFormData) => {
    // Add level and topic to the question
    const enrichedQuestion = {
      ...question,
      level,
      topic
    };
    
    setQuestions(prev => [...prev, enrichedQuestion]);
  };
  
  const handleUpdateQuestion = (index: number, updatedQuestion: QuestionFormData) => {
    // Ensure level and topic are preserved
    const enrichedQuestion = {
      ...updatedQuestion,
      level,
      topic
    };
    
    setQuestions(prev => {
      const newQuestions = [...prev];
      newQuestions[index] = enrichedQuestion;
      return newQuestions;
    });
  };
  
  const handleDeleteQuestion = (index: number) => {
    setQuestions(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSaveBatch = async () => {
    // Make sure all questions have the level and topic
    const enrichedQuestions = questions.map(q => ({
      ...q,
      level,
      topic
    }));
    
    await onSave(enrichedQuestions);
  };
  
  return (
    <Card>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="add">Add Question</TabsTrigger>
            <TabsTrigger value="edit">Edit Questions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="add">
            <div className="mt-4">
              <QuestionForm 
                onSubmit={handleAddQuestion} 
                isSubmitting={isSubmitting}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="edit">
            <div className="mt-4">
              {questions.length === 0 ? (
                <p className="text-neutral-dark">No questions added yet. Add some questions first!</p>
              ) : (
                <div className="space-y-4">
                  {questions.map((question, index) => (
                    <QuestionEditor
                      key={index}
                      index={index}
                      question={question}
                      onUpdate={handleUpdateQuestion}
                      onDelete={handleDeleteQuestion}
                      isSubmitting={isSubmitting}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {questions.length > 0 && (
          <Button 
            onClick={handleSaveBatch} 
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Saving..." : "Save Questions"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionBatchManager;

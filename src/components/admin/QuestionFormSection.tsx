
import React from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import LevelSelector from './LevelSelector';
import TopicSelector from './TopicSelector';
import FileQuestionUpload from './FileQuestionUpload';
import { QuestionFormData } from './QuestionForm';

interface QuestionFormSectionProps {
  onSubmit: (data: { level: string; topic: string }) => void;
  addUploadToHistory: (newUpload: any) => void;
  handleSaveQuestions: (questions: QuestionFormData[]) => Promise<void>;
  isEditMode?: boolean;
  editData?: any;
  onEditComplete?: () => void;
  isUploading: boolean;
  onFileUpload: () => void;
  onQuestionsLoaded: (questions: QuestionFormData[]) => void;
}

const QuestionFormSection: React.FC<QuestionFormSectionProps> = ({
  onSubmit,
  handleSaveQuestions,
  isEditMode = false,
  editData = null,
  onEditComplete,
  isUploading,
  onFileUpload,
  onQuestionsLoaded
}) => {
  const form = useForm({
    defaultValues: {
      level: editData?.level || "",
      topic: editData?.topic || ""
    }
  });

  // When in edit mode, populate the form with edit data
  React.useEffect(() => {
    if (isEditMode && editData) {
      form.reset({
        level: editData.level,
        topic: editData.topic
      });
    }
  }, [isEditMode, editData, form]);
  
  const level = form.watch("level");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>English Level</FormLabel>
                <FormControl>
                  <LevelSelector 
                    value={field.value} 
                    onChange={field.onChange}
                    disabled={isEditMode}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic</FormLabel>
                <FormControl>
                  <TopicSelector 
                    value={field.value}
                    onChange={field.onChange}
                    level={level}
                    disabled={isEditMode}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        {!isEditMode && (
          <div className="pt-4">
            <FileQuestionUpload 
              onQuestionsLoaded={onQuestionsLoaded}
              onUpload={onFileUpload}
              isUploading={isUploading}
            />
          </div>
        )}
        
        {isEditMode && editData && editData.questions && editData.questions.length > 0 && (
          <div className="pt-4">
            <p className="mb-4 text-sm text-neutral-dark">
              Editing {editData.questions.length} questions for {editData.level} - {editData.topic}
            </p>
            <Button 
              type="submit"
              disabled={isUploading}
              className="w-full"
            >
              {isUploading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
        
        {isEditMode && (!editData || !editData.questions || editData.questions.length === 0) && (
          <div className="text-center py-8 border rounded-md">
            <p className="text-neutral-dark">No questions loaded for editing.</p>
            {onEditComplete && (
              <Button 
                variant="outline"
                className="mt-4"
                onClick={onEditComplete}
              >
                Back to History
              </Button>
            )}
          </div>
        )}
      </form>
    </Form>
  );
};

export default QuestionFormSection;

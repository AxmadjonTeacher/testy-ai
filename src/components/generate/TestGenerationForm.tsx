import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import TopicSelector from './TopicSelector';
import { TestParams } from '@/services/testGenerationService';
import { subjects, getLevelsForSubject } from '@/utils/subjectTopics';

interface TestGenerationFormProps {
  onGenerate: (params: TestParams) => Promise<boolean>;
  isGenerating: boolean;
  isEditMode?: boolean;
  editTestId?: string | null;
}

const TestGenerationForm: React.FC<TestGenerationFormProps> = ({
  onGenerate,
  isGenerating,
  isEditMode = false,
  editTestId = null
}) => {
  const [subject, setSubject] = useState("English");
  const [level, setLevel] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [grade, setGrade] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [availableLevels, setAvailableLevels] = useState<Array<{value: string, label: string}>>([]);

  useEffect(() => {
    if (subject) {
      const levels = getLevelsForSubject(subject);
      setAvailableLevels(levels);
      setLevel("");
      setSelectedTopics([]);
    } else {
      setAvailableLevels([]);
    }
  }, [subject]);

  const handleGenerate = async () => {
    const params: TestParams = {
      subject,
      level: level,
      teacherName: teacherName || undefined,
      grade: grade || undefined,
      numQuestions: 15,
      topics: selectedTopics
    };
    
    await onGenerate(params);
  };

  return (
    <div className="space-y-8">
      {/* Row 1: Subject and Teacher's name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="block text-center text-base font-medium">
            Subject
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full h-14 rounded-2xl border-2 border-border bg-background px-4 text-center text-base focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {subjects.map((subj) => (
              <option key={subj.value} value={subj.value}>
                {subj.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          <label className="block text-center text-base font-medium">
            Teacher's name
          </label>
          <input
            type="text"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value.toUpperCase())}
            placeholder="Enter teacher's name"
            className="w-full h-14 rounded-2xl border-2 border-border bg-background px-4 text-center text-base focus:outline-none focus:ring-2 focus:ring-primary uppercase"
          />
        </div>
      </div>

      {/* Row 2: Level and Grades */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="block text-center text-base font-medium">
            Level
          </label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full h-14 rounded-2xl border-2 border-border bg-background px-4 text-center text-base focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select level</option>
            {availableLevels.map((lvl) => (
              <option key={lvl.value} value={lvl.value}>
                {lvl.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          <label className="block text-center text-base font-medium">
            Grades
          </label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full h-14 rounded-2xl border-2 border-border bg-background px-4 text-center text-base focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select grade</option>
            <option value="5-6">5-6</option>
            <option value="7-8">7-8</option>
            <option value="9-11">9-11</option>
          </select>
        </div>
      </div>

      {/* Topics - Large area */}
      <div className="space-y-3">
        <label className="block text-center text-base font-medium">
          Topics
        </label>
        <div className="border-2 border-border rounded-2xl p-6 bg-background min-h-[320px]">
          <TopicSelector
            subject={subject}
            level={level}
            selectedTopics={selectedTopics}
            onChange={setSelectedTopics}
          />
        </div>
      </div>

      {/* Generate button */}
      <div className="flex justify-center pt-4">
        <Button 
          onClick={handleGenerate}
          disabled={isGenerating || !subject || !level || selectedTopics.length === 0}
          className="rounded-2xl px-20 h-14 text-base"
        >
          {isGenerating ? 'Generating...' : 'Generate'}
        </Button>
      </div>
    </div>
  );
};

export default TestGenerationForm;

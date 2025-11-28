import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TopicSelector from './TopicSelector';
import { subjects, getLevelsForSubject } from '@/utils/subjectTopics';

interface TestGenerationFormProps {
  onGenerate: (params: any) => Promise<boolean>;
  isGenerating: boolean;
}

const TestGenerationForm: React.FC<TestGenerationFormProps> = ({ onGenerate, isGenerating }) => {
  const [subject, setSubject] = useState('English');
  const [level, setLevel] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [grade, setGrade] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [availableLevels, setAvailableLevels] = useState<Array<{value: string, label: string}>>([]);

  useEffect(() => {
    if (subject) {
      const levels = getLevelsForSubject(subject);
      setAvailableLevels(levels);
      setLevel('');
      setSelectedTopics([]);
    } else {
      setAvailableLevels([]);
    }
  }, [subject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!level || selectedTopics.length === 0) {
      return;
    }

    await onGenerate({
      subject,
      level,
      teacherName: teacherName || undefined,
      grade: grade || undefined,
      numQuestions: 15,
      topics: selectedTopics,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="subject" className="font-bold text-base">Subject</Label>
          <select
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-3 border-4 border-foreground bg-card font-medium neo-shadow focus:translate-x-0.5 focus:translate-y-0.5 focus:shadow-neo-sm transition-all"
          >
            {subjects.map((subj) => (
              <option key={subj.value} value={subj.value}>
                {subj.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="teacherName" className="font-bold text-base">Teacher's name</Label>
          <Input
            id="teacherName"
            type="text"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value.toUpperCase())}
            placeholder="Enter teacher name"
            className="border-4 border-foreground neo-shadow font-medium focus:translate-x-0.5 focus:translate-y-0.5 focus:shadow-neo-sm uppercase"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="level" className="font-bold text-base">Level</Label>
          <select
            id="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full px-4 py-3 border-4 border-foreground bg-card font-medium neo-shadow focus:translate-x-0.5 focus:translate-y-0.5 focus:shadow-neo-sm transition-all"
          >
            <option value="">Select level</option>
            {availableLevels.map((lvl) => (
              <option key={lvl.value} value={lvl.value}>
                {lvl.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="grades" className="font-bold text-base">Grades</Label>
          <select
            id="grades"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full px-4 py-3 border-4 border-foreground bg-card font-medium neo-shadow focus:translate-x-0.5 focus:translate-y-0.5 focus:shadow-neo-sm transition-all"
          >
            <option value="">Select grade</option>
            <option value="5-6">5-6</option>
            <option value="7-8">7-8</option>
            <option value="9-11">9-11</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="font-bold text-base">Topics</Label>
        <div className="border-4 border-foreground p-4 min-h-[200px] bg-card neo-shadow">
          <TopicSelector
            subject={subject}
            level={level}
            selectedTopics={selectedTopics}
            onChange={setSelectedTopics}
          />
        </div>
      </div>

      <Button 
        type="submit" 
        disabled={!level || selectedTopics.length === 0 || isGenerating}
        variant="secondary"
        className="w-full h-14 text-xl font-black"
      >
        {isGenerating ? "Generating..." : "Generate"}
      </Button>
    </form>
  );
};

export default TestGenerationForm;

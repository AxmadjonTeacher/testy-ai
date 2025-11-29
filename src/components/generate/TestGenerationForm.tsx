import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  const [numQuestions, setNumQuestions] = useState(15);
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
      numQuestions,
      topics: selectedTopics,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="subject" className="font-bold text-base">Subject</Label>
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subj) => (
                <SelectItem key={subj.value} value={subj.value}>
                  {subj.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              {availableLevels.map((lvl) => (
                <SelectItem key={lvl.value} value={lvl.value}>
                  {lvl.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="grades" className="font-bold text-base">Grades</Label>
          <Select value={grade} onValueChange={setGrade}>
            <SelectTrigger>
              <SelectValue placeholder="Select grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5-6">5-6</SelectItem>
              <SelectItem value="7-8">7-8</SelectItem>
              <SelectItem value="9-11">9-11</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="numQuestions" className="font-bold text-base">Number of Questions</Label>
          <Select value={numQuestions.toString()} onValueChange={(val) => setNumQuestions(parseInt(val))}>
            <SelectTrigger>
              <SelectValue placeholder="Select number of questions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 Questions</SelectItem>
              <SelectItem value="15">15 Questions</SelectItem>
              <SelectItem value="20">20 Questions</SelectItem>
              <SelectItem value="25">25 Questions</SelectItem>
              <SelectItem value="30">30 Questions</SelectItem>
            </SelectContent>
          </Select>
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

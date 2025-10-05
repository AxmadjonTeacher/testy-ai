
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TopicSelector from './TopicSelector';
import { TestParams } from '@/services/testGenerationService';
import { subjects, getLevelsForSubject } from '@/utils/subjectTopics';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const [subject, setSubject] = useState("");
  const [englishLevel, setEnglishLevel] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [grade, setGrade] = useState("");
  const [numQuestions, setNumQuestions] = useState("15");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [availableLevels, setAvailableLevels] = useState<Array<{value: string, label: string}>>([]);

  // Update available levels when subject changes
  useEffect(() => {
    if (subject) {
      const levels = getLevelsForSubject(subject);
      setAvailableLevels(levels);
      setEnglishLevel(""); // Reset level when subject changes
      setSelectedTopics([]); // Reset topics when subject changes
    } else {
      setAvailableLevels([]);
    }
  }, [subject]);

  // If in edit mode, we would load the test data here
  useEffect(() => {
    if (isEditMode && editTestId) {
      // This would be an API call in a real implementation
      // For now, let's just simulate with some mock data
      console.log(`Loading test data for ID: ${editTestId}`);
      
      // Mock data - in a real app would come from an API
      const mockData = {
        subject: "English",
        level: "1",
        teacherName: "Yodgorov Axmadjon",
        grade: "5-6",
        numQuestions: "15",
        topics: ["Present Simple", "Past Simple"]
      };
      
      // Set form values
      setSubject(mockData.subject);
      setEnglishLevel(mockData.level);
      setTeacherName(mockData.teacherName);
      setGrade(mockData.grade);
      setNumQuestions(mockData.numQuestions);
      setSelectedTopics(mockData.topics);
    }
  }, [isEditMode, editTestId]);

  const handleGenerate = async () => {
    const params: TestParams = {
      subject,
      level: englishLevel,
      teacherName: teacherName || undefined,
      grade: grade || undefined,
      numQuestions: parseInt(numQuestions),
      topics: selectedTopics
    };
    
    await onGenerate(params);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="subject">{t('generate.subject')}</Label>
            <Select 
              value={subject} 
              onValueChange={setSubject}
            >
              <SelectTrigger id="subject">
                <SelectValue placeholder={t('generate.selectSubject')} />
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="level">
                {subject === "Math" ? t('generate.gradeLevel') : t('generate.englishLevel')}
              </Label>
              <Select 
                value={englishLevel} 
                onValueChange={setEnglishLevel}
                disabled={!subject}
              >
                <SelectTrigger id="level">
                  <SelectValue placeholder={t('generate.selectLevel')} />
                </SelectTrigger>
                <SelectContent>
                  {availableLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="teacher-name">{t('generate.teacherName')}</Label>
              <Input
                id="teacher-name"
                placeholder={t('generate.enterTeacherName')}
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value.toUpperCase())}
                style={{ textTransform: 'uppercase' }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="grade">{t('generate.grade')}</Label>
              <Select 
                value={grade} 
                onValueChange={setGrade}
              >
                <SelectTrigger id="grade">
                  <SelectValue placeholder={t('generate.selectGrade')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5-6">{t('generate.grades.5-6')}</SelectItem>
                  <SelectItem value="7-8">{t('generate.grades.7-8')}</SelectItem>
                  <SelectItem value="9-11">{t('generate.grades.9-11')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="num-questions">{t('generate.numQuestions')}</Label>
              <Select 
                value={numQuestions} 
                onValueChange={setNumQuestions}
              >
                <SelectTrigger id="num-questions">
                  <SelectValue placeholder="Select number" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">{t('generate.questions.10')}</SelectItem>
                  <SelectItem value="15">{t('generate.questions.15')}</SelectItem>
                  <SelectItem value="20">{t('generate.questions.20')}</SelectItem>
                  <SelectItem value="25">{t('generate.questions.25')}</SelectItem>
                  <SelectItem value="30">{t('generate.questions.30')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <TopicSelector 
            subject={subject}
            level={englishLevel}
            selectedTopics={selectedTopics}
            onChange={setSelectedTopics}
          />
          
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-white"
            disabled={isGenerating || selectedTopics.length === 0 || !subject}
            onClick={handleGenerate}
          >
            {isGenerating ? t('generate.generating') : isEditMode ? t('generate.updateButton') : t('generate.generateButton')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestGenerationForm;

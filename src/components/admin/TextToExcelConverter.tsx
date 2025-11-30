import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Download, Copy } from 'lucide-react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';
import QuestionSeparatorTool from './QuestionSeparatorTool';

const TextToExcelConverter = () => {
  const [questionsText, setQuestionsText] = useState('');
  const [optionsText, setOptionsText] = useState('');
  const [answersText, setAnswersText] = useState('');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const parseQuestions = (text: string): string[] => {
    // Split by lines and filter out empty lines
    const lines = text.split('\n').filter(line => line.trim());
    const questions: string[] = [];
    
    lines.forEach(line => {
      // Remove question number and extract the question text
      const match = line.match(/^\d+\.\s*(.+)$/);
      if (match) {
        questions.push(match[1].trim());
      }
    });
    
    return questions;
  };

  const parseOptions = (text: string): string[][] => {
    // Split by lines and filter out empty lines
    const lines = text.split('\n').filter(line => line.trim());
    const allOptions: string[][] = [];
    
    lines.forEach(line => {
      // Remove question number if present
      const cleanLine = line.replace(/^\d+\.\s*/, '');
      
      // Extract options (a), b), c), d)) using improved regex
      const options: string[] = [];
      const optionRegex = /([a-d])\)\s*([^)]+?)(?=\s+[a-d]\)|$)/gi;
      let match;
      
      while ((match = optionRegex.exec(cleanLine)) !== null) {
        options.push(match[2].trim());
      }
      
      if (options.length === 4) {
        allOptions.push(options);
      }
    });
    
    return allOptions;
  };

  const parseAnswers = (text: string): string[] => {
    const answers: string[] = [];
    
    // Match patterns like "1. B" or "1.B" or "1 B"
    const matches = text.matchAll(/\d+[\.\s]+([A-Da-d])/g);
    
    for (const match of matches) {
      answers.push(match[1].toUpperCase());
    }
    
    return answers;
  };

  const generateExcel = () => {
    try {
      const questions = parseQuestions(questionsText);
      const options = parseOptions(optionsText);
      const answers = parseAnswers(answersText);

      if (questions.length === 0) {
        toast.error('Please paste questions in the Questions field');
        return;
      }

      if (options.length === 0) {
        toast.error('Please paste options in the Options field');
        return;
      }

      if (answers.length === 0) {
        toast.error('Please paste answers in the Answers field');
        return;
      }

      if (questions.length !== options.length || questions.length !== answers.length) {
        toast.error(`Mismatch: ${questions.length} questions, ${options.length} option sets, ${answers.length} answers`);
        return;
      }

      // Create worksheet data
      const worksheetData = [
        ['Question', 'A', 'B', 'C', 'D', 'Correct Answer'],
        ...questions.map((question, index) => [
          question,
          options[index][0] || '',
          options[index][1] || '',
          options[index][2] || '',
          options[index][3] || '',
          answers[index] || ''
        ])
      ];

      // Create workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(worksheetData);

      // Set column widths
      ws['!cols'] = [
        { wch: 50 }, // Question
        { wch: 20 }, // A
        { wch: 20 }, // B
        { wch: 20 }, // C
        { wch: 20 }, // D
        { wch: 15 }  // Correct Answer
      ];

      XLSX.utils.book_append_sheet(wb, ws, 'Questions');

      // Generate Excel file
      XLSX.writeFile(wb, `questions_${Date.now()}.xlsx`);

      toast.success('Excel file generated successfully!');
    } catch (error) {
      console.error('Error generating Excel:', error);
      toast.error('Failed to generate Excel file. Please check your input format.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Separator Tool Button */}
      <div className="flex justify-end">
        <QuestionSeparatorTool />
      </div>

      {/* Required Format Info */}
      <div className="bg-muted/50 p-6">
        <h3 className="font-black text-xl mb-3">Required File Format:</h3>
        <p className="text-base font-bold mb-4">Your file should contain these columns:</p>
        <div className="border-4 border-foreground bg-background overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-black text-white">
                <th className="px-4 py-3 text-left font-mono font-bold">Question</th>
                <th className="px-4 py-3 text-left font-mono font-bold">A</th>
                <th className="px-4 py-3 text-left font-mono font-bold">B</th>
                <th className="px-4 py-3 text-left font-mono font-bold">C</th>
                <th className="px-4 py-3 text-left font-mono font-bold">D</th>
                <th className="px-4 py-3 text-left font-mono font-bold">Correct Answer</th>
              </tr>
            </thead>
            <tbody className="font-mono text-sm">
              <tr className="border-b-2 border-foreground">
                <td className="px-4 py-3">She ____ to school every day.</td>
                <td className="px-4 py-3">go</td>
                <td className="px-4 py-3">goes</td>
                <td className="px-4 py-3">going</td>
                <td className="px-4 py-3">gone</td>
                <td className="px-4 py-3">B</td>
              </tr>
              <tr>
                <td className="px-4 py-3">This is ____ apple.</td>
                <td className="px-4 py-3">a</td>
                <td className="px-4 py-3">an</td>
                <td className="px-4 py-3">the</td>
                <td className="px-4 py-3">no</td>
                <td className="px-4 py-3">B</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Text Input Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Questions */}
        <div className="border-4 border-foreground bg-card p-4 neo-shadow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-black text-lg">Questions</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(questionsText, 'Questions')}
              className="h-8"
              disabled={!questionsText}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Textarea
            value={questionsText}
            onChange={(e) => setQuestionsText(e.target.value)}
            placeholder="Paste the questions here....&#10;&#10;Example:&#10;1. My father ____ coffee in the morning.&#10;2. I ____ like vegetables.&#10;3. He ____ a car. He walks to school."
            className="min-h-[400px] font-mono text-sm border-4 border-foreground"
          />
        </div>

        {/* Options */}
        <div className="border-4 border-foreground bg-card p-4 neo-shadow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-black text-lg">Options</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(optionsText, 'Options')}
              className="h-8"
              disabled={!optionsText}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Textarea
            value={optionsText}
            onChange={(e) => setOptionsText(e.target.value)}
            placeholder="Options for each questions....&#10;&#10;Example:&#10;1. a) drinking  b) drink  c) drinks  d) drinkes&#10;2. a) don't  b) doesn't  c) am not  d) didn't&#10;3. a) doesn't have  b) don't have  c) has not  d) haven't"
            className="min-h-[400px] font-mono text-sm border-4 border-foreground"
          />
        </div>

        {/* Answers */}
        <div className="border-4 border-foreground bg-card p-4 neo-shadow">
          <h3 className="font-black text-lg mb-3">Answers</h3>
          <Textarea
            value={answersText}
            onChange={(e) => setAnswersText(e.target.value)}
            placeholder="The correct answers for each question should be presented by the corresponding number. For example:&#10;1. B&#10;2. B&#10;3. A&#10;etc"
            className="min-h-[400px] font-mono text-sm border-4 border-foreground"
          />
          <p className="text-xs font-bold mt-2 text-muted-foreground">
            Format: Question number followed by the letter (A, B, C, or D)
          </p>
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex justify-center">
        <Button
          onClick={generateExcel}
          variant="accent"
          size="lg"
          className="text-lg font-black px-8"
          disabled={!questionsText || !optionsText || !answersText}
        >
          <Download className="h-5 w-5 mr-2" />
          Generate Excel File
        </Button>
      </div>
    </div>
  );
};

export default TextToExcelConverter;
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Scissors } from 'lucide-react';
import { toast } from 'sonner';

const QuestionSeparatorTool = () => {
  const [combinedText, setCombinedText] = useState('');
  const [separatedQuestions, setSeparatedQuestions] = useState('');
  const [separatedOptions, setSeparatedOptions] = useState('');

  // Real-time parsing with useEffect
  useEffect(() => {
    if (!combinedText.trim()) {
      setSeparatedQuestions('');
      setSeparatedOptions('');
      return;
    }

    try {
      const lines = combinedText.split('\n');
      const questions: string[] = [];
      const options: string[] = [];
      let currentId = '';

      lines.forEach(line => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return;

        // Pattern Recognition: ^(\d+)[.\)]\s*(.*)
        // Looks for lines starting with a number followed by . or )
        const questionMatch = trimmedLine.match(/^(\d+)[\.\)]\s*(.+)/);
        
        if (questionMatch) {
          // This is a Question line
          currentId = questionMatch[1];
          const questionText = questionMatch[2].trim();
          
          // Check if this line also contains options
          const hasOptions = /[a-d]\)/i.test(questionText);
          
          if (hasOptions) {
            // Split question from options
            const optionStartMatch = questionText.match(/^(.+?)(?=\s*[a-d]\))/i);
            if (optionStartMatch) {
              const pureQuestion = optionStartMatch[1].trim();
              questions.push(`${currentId}. ${pureQuestion}`);
              
              // Extract options
              const optionsText = questionText.substring(optionStartMatch[1].length).trim();
              const optionMatches = optionsText.matchAll(/([a-d])\)\s*([^a-d)]+?)(?=\s*[a-d]\)|$)/gi);
              
              const optionsList: string[] = [];
              for (const optMatch of optionMatches) {
                const optionLetter = optMatch[1].toLowerCase();
                const optionText = optMatch[2].trim();
                optionsList.push(`${optionLetter}) ${optionText}`);
              }
              
              if (optionsList.length > 0) {
                options.push(`${currentId}. ${optionsList.join('  ')}`);
              }
            }
          } else {
            // Pure question line without options
            questions.push(`${currentId}. ${questionText}`);
          }
        } else if (currentId && /[a-d]\)/i.test(trimmedLine)) {
          // This is an Options line (doesn't start with a number)
          // Associate it with the last found question ID
          const optionMatches = trimmedLine.matchAll(/([a-d])\)\s*([^a-d)]+?)(?=\s*[a-d]\)|$)/gi);
          
          const optionsList: string[] = [];
          for (const optMatch of optionMatches) {
            const optionLetter = optMatch[1].toLowerCase();
            const optionText = optMatch[2].trim();
            optionsList.push(`${optionLetter}) ${optionText}`);
          }
          
          if (optionsList.length > 0) {
            options.push(`${currentId}. ${optionsList.join('  ')}`);
          }
        }
      });

      setSeparatedQuestions(questions.join('\n'));
      setSeparatedOptions(options.join('\n'));
    } catch (error) {
      console.error('Error parsing text:', error);
    }
  }, [combinedText]); // Reactive parsing - happens automatically when input changes

  const copyToClipboard = (text: string, label: string) => {
    if (!text) {
      toast.error(`No ${label.toLowerCase()} to copy`);
      return;
    }
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const resetTool = () => {
    setCombinedText('');
    setSeparatedQuestions('');
    setSeparatedOptions('');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-black">
          <Scissors className="h-4 w-4 mr-2" />
          Question Separator Tool
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto border-4 border-foreground bg-card neo-shadow">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">SEPARATE TOOL</DialogTitle>
          <p className="text-sm font-bold text-muted-foreground mt-1">
            SPLIT MIXED TEXT INTO SECTIONS
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Input Section */}
          <div className="border-4 border-foreground bg-background p-4 neo-shadow">
            <h3 className="font-black text-lg mb-3">Paste the questions and options here:</h3>
            <p className="text-sm font-bold text-muted-foreground mb-2">
              The text will be separated automatically as you type or paste.
            </p>
            <Textarea
              value={combinedText}
              onChange={(e) => setCombinedText(e.target.value)}
              placeholder="1. My father ____ coffee in the morning.&#10;a) drinking  b) drink  c) drinks  d) drinkes&#10;&#10;2. I ____ like vegetables.&#10;a) don't  b) doesn't  c) am not  d) didn't&#10;&#10;3. He ____ a car. He walks to school.&#10;a) doesn't have  b) don't have  c) has not  d) haven't"
              className="min-h-[200px] font-mono text-sm"
            />
            <div className="flex gap-3 mt-4">
              <Button
                onClick={resetTool}
                variant="outline"
                className="font-black"
              >
                Reset
              </Button>
            </div>
          </div>

          {/* Output Sections */}
          {(separatedQuestions || separatedOptions) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Questions Output */}
              <div className="border-4 border-foreground bg-card p-4 neo-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-black text-lg">Questions</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(separatedQuestions, 'Questions')}
                    className="h-8"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea
                  value={separatedQuestions}
                  readOnly
                  className="min-h-[300px] font-mono text-sm bg-background"
                />
              </div>

              {/* Options Output */}
              <div className="border-4 border-foreground bg-card p-4 neo-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-black text-lg">Options</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(separatedOptions, 'Options')}
                    className="h-8"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea
                  value={separatedOptions}
                  readOnly
                  className="min-h-[300px] font-mono text-sm bg-background"
                />
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="border-4 border-foreground bg-muted p-4 neo-shadow">
            <h4 className="font-black mb-2">How to use:</h4>
            <ul className="text-sm font-bold space-y-1 list-disc list-inside">
              <li>Paste questions with options in the format: "1. Question text a) option b) option c) option d) option"</li>
              <li>The tool will automatically separate them in real-time</li>
              <li>Copy each section separately using the copy buttons</li>
              <li>Paste them into the main Text to Excel converter above</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionSeparatorTool;
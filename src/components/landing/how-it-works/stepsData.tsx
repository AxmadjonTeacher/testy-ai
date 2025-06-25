
import React from 'react';
import { FileUp, Settings, Shuffle, Download } from 'lucide-react';
import { Step } from './types';

export const steps: Step[] = [
  {
    number: "01",
    icon: <FileUp size={24} />,
    title: "Upload Your Content",
    description: "Upload thousands of test questions and exercises for all grammar topics in Excel or CSV format. Our system intelligently organizes them by subject and difficulty.",
    color: "from-blue-500 to-indigo-500"
  },
  {
    number: "02", 
    icon: <Settings size={24} />,
    title: "Customize Your Test",
    description: "Choose specific topics, set the number of questions, select teacher's name, grade level, and English proficiency level to match your curriculum requirements.",
    color: "from-purple-500 to-pink-500"
  },
  {
    number: "03",
    icon: <Shuffle size={24} />,
    title: "AI Generates Unique Tests",
    description: "Our advanced AI algorithm intelligently selects and combines questions to create a completely unique test that maintains educational quality and coherence.",
    color: "from-green-500 to-teal-500"
  },
  {
    number: "04",
    icon: <Download size={24} />,
    title: "Download & Use",
    description: "Get your professionally formatted test in DOCX format, ready to print or share digitally with your students. No additional formatting required.",
    color: "from-orange-500 to-red-500"
  }
];

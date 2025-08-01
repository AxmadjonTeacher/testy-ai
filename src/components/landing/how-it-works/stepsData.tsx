
import React from 'react';
import { FileUp, Settings, Shuffle, Download } from 'lucide-react';
import { Step } from './types';
import { useTranslation } from 'react-i18next';

export const useStepsData = (): Step[] => {
  const { t } = useTranslation();
  
  return [
    {
      number: "01",
      icon: <FileUp size={24} />,
      title: t('steps.step1.title'),
      description: t('steps.step1.description'),
      color: "from-blue-500 to-indigo-500"
    },
    {
      number: "02", 
      icon: <Settings size={24} />,
      title: t('steps.step2.title'),
      description: t('steps.step2.description'),
      color: "from-purple-500 to-pink-500"
    },
    {
      number: "03",
      icon: <Shuffle size={24} />,
      title: t('steps.step3.title'),
      description: t('steps.step3.description'),
      color: "from-green-500 to-teal-500"
    },
    {
      number: "04",
      icon: <Download size={24} />,
      title: t('steps.step4.title'),
      description: t('steps.step4.description'),
      color: "from-orange-500 to-red-500"
    }
  ];
};

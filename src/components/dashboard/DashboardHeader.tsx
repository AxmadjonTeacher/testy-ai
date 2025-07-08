
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  return (
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-bold text-neutral-dark">{t('dashboard.title')}</h2>
      <Button 
        className="bg-primary hover:bg-primary/90 text-white"
        onClick={() => navigate('/generate')}
      >
        {t('dashboard.generateNew')}
      </Button>
    </div>
  );
};

export default DashboardHeader;

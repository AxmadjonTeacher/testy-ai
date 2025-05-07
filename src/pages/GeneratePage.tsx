
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GenerateTest from '@/components/GenerateTest';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const GeneratePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-neutral-light">
        <div className="container mx-auto px-4 py-8">
          <Alert className="mb-6 border-blue-200 bg-blue-50">
            <Info className="h-5 w-5 text-blue-500" />
            <AlertTitle className="text-blue-700">Reading Tests Now Available</AlertTitle>
            <AlertDescription className="text-blue-600">
              You can now generate tests with reading passages. Select the "Reading" topic for any level
              to include reading comprehension questions in your test.
            </AlertDescription>
          </Alert>
          <GenerateTest />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GeneratePage;


import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-6">
            AI Powered Test Generator for English Language Teaching
          </h1>
          <p className="text-lg text-neutral-dark/80 mb-8 max-w-2xl mx-auto">
            Information about the website and how it helps generate unique tests for all English proficiency levels
          </p>
          <Button 
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg rounded-md"
            onClick={() => navigate('/generate')}
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-neutral-light px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-center text-neutral-dark mb-8">
            How it works and steps to follow
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-neutral-dark">
                We have thousands of tests and exercises for all grammar topics
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-neutral-dark">
                You will choose the topics and the number of questions, teacher's name, grade and english proficiency level
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-neutral-dark">
                And then AI will generate a test for you
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-neutral-dark">
                You can edit the document before downloading it
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xl font-medium text-neutral-dark mb-6">
              Ready to try?
            </p>
            <Button 
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={() => navigate('/generate')}
            >
              Generate
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - Deep green as shown in wireframe */}
      <footer className="mt-auto bg-accent text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">TestGen</h2>
              <p className="text-sm">
                AI-powered test generator for English language teachers. Create unique tests efficiently and save time.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="hover:text-secondary">Home</a></li>
                <li><a href="/dashboard" className="hover:text-secondary">Dashboard</a></li>
                <li><a href="/generate" className="hover:text-secondary">Generate</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-secondary">Help Center</a></li>
                <li><a href="#" className="hover:text-secondary">Contact Us</a></li>
                <li><a href="#" className="hover:text-secondary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-secondary">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-white/20 text-center">
            <p className="text-sm">© 2025 TestGen. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

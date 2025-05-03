
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-accent text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                <span className="text-accent font-bold text-lg">T</span>
              </div>
              <h3 className="text-xl font-semibold text-white">TestGen</h3>
            </div>
            <p className="text-sm text-white/80">
              AI-powered test generator for English language teachers.
              Create unique tests efficiently and save valuable time.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-white/80 hover:text-white">Home</a></li>
              <li><a href="#" className="text-white/80 hover:text-white">Dashboard</a></li>
              <li><a href="#" className="text-white/80 hover:text-white">My Tests</a></li>
              <li><a href="#" className="text-white/80 hover:text-white">Generate</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-white/80 hover:text-white">Help Center</a></li>
              <li><a href="#" className="text-white/80 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-white/80 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-white/80 hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} TestGen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

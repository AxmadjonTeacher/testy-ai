
import React from 'react';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface MobileMenuButtonProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const MobileMenuButton = ({ isMobileMenuOpen, setIsMobileMenuOpen }: MobileMenuButtonProps) => {
  return (
    <div className="lg:hidden">
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="p-2"
      >
        <Menu className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default MobileMenuButton;

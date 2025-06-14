
import React from 'react';
import { Button } from "@/components/ui/button";
import { List, LayoutGrid } from "lucide-react";

interface ViewSwitcherProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ view, onViewChange }) => {
  return (
    <div className="flex gap-1">
      <Button
        variant="outline"
        size="icon"
        aria-label="List view"
        className={
          `transition ${
            view === 'list'
              ? "bg-teal-100 border-2 border-teal-500 text-teal-900"
              : "hover:bg-gray-50"
          } rounded-xl`
        }
        onClick={() => onViewChange("list")}
      >
        <List className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        aria-label="Grid view"
        className={
          `transition ${
            view === 'grid'
              ? "bg-primary/5 border-2 border-primary text-primary"
              : "hover:bg-gray-50"
          } rounded-xl`
        }
        onClick={() => onViewChange("grid")}
      >
        <LayoutGrid className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ViewSwitcher;

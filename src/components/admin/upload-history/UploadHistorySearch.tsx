
import React from 'react';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface UploadHistorySearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const UploadHistorySearch: React.FC<UploadHistorySearchProps> = ({
  searchTerm,
  onSearchChange
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="relative mt-4">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search by filename, topic, or subject..."
        className="pl-8"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default UploadHistorySearch;

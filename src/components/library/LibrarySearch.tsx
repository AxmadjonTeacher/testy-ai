
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from 'lucide-react';

interface LibrarySearchProps {
  onSearch: (query: string, filterType: string) => void;
  placeholder?: string;
  testCount?: number;
}

const LibrarySearch: React.FC<LibrarySearchProps> = ({ 
  onSearch, 
  placeholder = "Search tests...",
  testCount 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('keywords');

  // Auto-search when query or filter type changes
  useEffect(() => {
    onSearch(searchQuery, filterType);
  }, [searchQuery, filterType, onSearch]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery, filterType);
    }
  };

  return (
    <div className="space-y-3">
      {/* Search bar - expanded to full width */}
      <div className="flex gap-2 p-3 bg-gray-50 rounded-lg">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 h-10 text-sm"
          />
        </div>
        
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-36 h-10 text-sm">
            <Filter className="h-4 w-4 mr-1" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="keywords">Keywords</SelectItem>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="topics">Topics</SelectItem>
            <SelectItem value="grade">Grade</SelectItem>
            <SelectItem value="date">Date</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Test count underneath */}
      {testCount !== undefined && (
        <div className="text-sm text-neutral-dark/70 bg-gray-100 px-3 py-2 rounded inline-block">
          {testCount} test{testCount !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};

export default LibrarySearch;

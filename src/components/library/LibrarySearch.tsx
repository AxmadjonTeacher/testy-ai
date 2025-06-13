
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter } from 'lucide-react';

interface LibrarySearchProps {
  onSearch: (query: string, filterType: string) => void;
  placeholder?: string;
}

const LibrarySearch: React.FC<LibrarySearchProps> = ({ onSearch, placeholder = "Search tests..." }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('keywords');

  const handleSearch = () => {
    onSearch(searchQuery, filterType);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pl-10"
        />
      </div>
      
      <Select value={filterType} onValueChange={setFilterType}>
        <SelectTrigger className="w-40">
          <Filter className="h-4 w-4 mr-2" />
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
      
      <Button onClick={handleSearch} variant="outline">
        Search
      </Button>
    </div>
  );
};

export default LibrarySearch;

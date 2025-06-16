
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users } from 'lucide-react';

const LibraryHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-2">
        <BookOpen className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-800">Community Test Library</h1>
        <Users className="h-6 w-6 text-blue-500" />
      </div>
      <p className="text-gray-600">Upload and share test files with the community. Browse tests by subject, level, grade, and topics.</p>
    </motion.div>
  );
};

export default LibraryHeader;

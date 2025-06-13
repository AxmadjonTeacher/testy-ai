
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const LibraryHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-2">
        <BookOpen className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-neutral-dark">Test Library</h1>
      </div>
      <p className="text-neutral-dark/70">Upload and organize your test files by level, grade, and topics.</p>
    </motion.div>
  );
};

export default LibraryHeader;

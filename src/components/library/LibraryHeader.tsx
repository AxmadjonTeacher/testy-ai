
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
        <BookOpen className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Community Test Library</h1>
        <Users className="h-6 w-6 text-primary/70" />
      </div>
      <p className="text-muted-foreground">Upload and share test files with the community. Browse tests by subject, level, grade, and topics.</p>
    </motion.div>
  );
};

export default LibraryHeader;

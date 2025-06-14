
import React from 'react';
import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const TestGridEmptyState: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-neutral-dark mb-2">No Tests Found</h3>
      <p className="text-neutral-dark/70">
        Try adjusting your search criteria or be the first to upload tests in this category.
      </p>
    </motion.div>
  );
};

export default TestGridEmptyState;

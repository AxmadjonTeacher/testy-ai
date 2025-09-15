-- Update the level check constraint to include "Primary Grades"
ALTER TABLE uploaded_tests DROP CONSTRAINT IF EXISTS uploaded_tests_level_check;

-- Add the updated check constraint with Primary Grades included
ALTER TABLE uploaded_tests ADD CONSTRAINT uploaded_tests_level_check 
CHECK (level IS NULL OR level IN ('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'IELTS', 'Primary Grades'));
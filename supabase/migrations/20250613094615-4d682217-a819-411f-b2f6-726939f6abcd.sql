
-- Add subject column to uploaded_tests table
ALTER TABLE public.uploaded_tests 
ADD COLUMN subject TEXT NOT NULL DEFAULT 'English';

-- Update the level column to allow NULL values for subjects that don't require levels
ALTER TABLE public.uploaded_tests 
ALTER COLUMN level DROP NOT NULL;

-- Update the check constraint for level to include new math levels and allow NULL
ALTER TABLE public.uploaded_tests 
DROP CONSTRAINT IF EXISTS uploaded_tests_level_check;

ALTER TABLE public.uploaded_tests 
ADD CONSTRAINT uploaded_tests_level_check 
CHECK (level IS NULL OR level IN ('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'IELTS'));

-- Update the check constraint for grade to allow numeric grades
ALTER TABLE public.uploaded_tests 
DROP CONSTRAINT IF EXISTS uploaded_tests_grade_check;

ALTER TABLE public.uploaded_tests 
ADD CONSTRAINT uploaded_tests_grade_check 
CHECK (grade ~ '^[0-9]+(-[0-9]+)?$' OR grade IN ('1-2', '3-4', '5-6', '7-8', '9-11'));

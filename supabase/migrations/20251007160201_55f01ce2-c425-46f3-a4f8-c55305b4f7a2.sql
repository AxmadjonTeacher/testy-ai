-- Delete orphaned tests with NULL user_id
-- These tests are already inaccessible due to existing RLS policies
DELETE FROM generated_tests WHERE user_id IS NULL;

-- Make user_id NOT NULL to enforce ownership at the database level
ALTER TABLE generated_tests ALTER COLUMN user_id SET NOT NULL;

-- Drop the redundant RLS policy that blocks null user_id
-- This policy is no longer needed since user_id cannot be null
DROP POLICY IF EXISTS "Block access to tests with null user_id" ON generated_tests;
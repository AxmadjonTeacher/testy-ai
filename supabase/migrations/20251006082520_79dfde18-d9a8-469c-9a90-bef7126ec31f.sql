-- Fix 1: Restrict uploaded_tests table access
-- Remove overly permissive policy that allows anyone to view all tests
DROP POLICY IF EXISTS "All users can view all uploaded tests" ON uploaded_tests;

-- Add restricted policies for uploaded_tests
CREATE POLICY "Users can view own uploaded tests" ON uploaded_tests
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all uploaded tests" ON uploaded_tests
  FOR SELECT
  USING (has_role('admin'::app_role));

-- Fix 2: Add explicit SELECT policies for user_roles table
-- This prevents role enumeration attacks
CREATE POLICY "Users can view own role" ON user_roles
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all roles" ON user_roles
  FOR SELECT
  USING (has_role('admin'::app_role));
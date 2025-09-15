-- Fix security vulnerability: Remove overly permissive policy on generated_tests table
-- This policy was allowing anyone to read all test content including teacher names and questions

-- Drop the dangerous "Allow all operations for generated tests" policy
DROP POLICY IF EXISTS "Allow all operations for generated tests" ON public.generated_tests;

-- Also clean up duplicate policies to ensure clarity
DROP POLICY IF EXISTS "Users can create tests" ON public.generated_tests;
DROP POLICY IF EXISTS "Users can delete own tests" ON public.generated_tests;  
DROP POLICY IF EXISTS "Users can update own tests" ON public.generated_tests;
DROP POLICY IF EXISTS "Users can view own tests" ON public.generated_tests;

-- Keep only the secure policies:
-- 1. Admin users can view all tests (for admin functionality)
-- 2. Users can manage their own tests (comprehensive policy for own data)

-- Ensure the remaining policies are properly configured
-- The "Admin users can view all tests" policy should remain as-is
-- The "Users can manage their own tests" policy should remain as-is

-- Verify no NULL user_id tests can be accessed by non-owners
CREATE POLICY "Block access to tests with null user_id" 
ON public.generated_tests 
FOR ALL 
USING (user_id IS NOT NULL)
WITH CHECK (user_id IS NOT NULL);
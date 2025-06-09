
-- Remove the overly permissive policies that allow all operations
DROP POLICY IF EXISTS "Allow all operations on questions" ON public.questions;
DROP POLICY IF EXISTS "Allow all operations on generated_tests" ON public.generated_tests;

-- Create proper RLS policies for questions table
CREATE POLICY "Admin users can manage all questions" 
  ON public.questions 
  FOR ALL
  TO authenticated
  USING (public.has_role('admin'))
  WITH CHECK (public.has_role('admin'));

CREATE POLICY "Users can view questions for test generation" 
  ON public.questions 
  FOR SELECT
  TO authenticated
  USING (true);

-- Create proper RLS policies for generated_tests table  
CREATE POLICY "Users can manage their own tests" 
  ON public.generated_tests 
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admin users can view all tests" 
  ON public.generated_tests 
  FOR SELECT
  TO authenticated
  USING (public.has_role('admin'));

-- Ensure RLS is enabled on both tables
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_tests ENABLE ROW LEVEL SECURITY;


-- Drop existing RLS policies on uploaded_tests table
DROP POLICY IF EXISTS "Users can view their own uploaded tests" ON public.uploaded_tests;
DROP POLICY IF EXISTS "Users can create their own uploaded tests" ON public.uploaded_tests;
DROP POLICY IF EXISTS "Users can update their own uploaded tests" ON public.uploaded_tests;
DROP POLICY IF EXISTS "Users can delete their own uploaded tests" ON public.uploaded_tests;

-- Create new policies for shared library functionality
-- Allow all authenticated users to view all uploaded tests
CREATE POLICY "All users can view all uploaded tests" 
  ON public.uploaded_tests 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Allow authenticated users to upload tests
CREATE POLICY "Authenticated users can create uploaded tests" 
  ON public.uploaded_tests 
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update only their own uploaded tests
CREATE POLICY "Users can update their own uploaded tests" 
  ON public.uploaded_tests 
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to delete only their own uploaded tests
CREATE POLICY "Users can delete their own uploaded tests" 
  ON public.uploaded_tests 
  FOR DELETE 
  TO authenticated
  USING (auth.uid() = user_id);

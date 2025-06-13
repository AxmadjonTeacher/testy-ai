
-- Create a storage bucket for uploaded test files
INSERT INTO storage.buckets (id, name, public)
VALUES ('uploaded-tests', 'uploaded-tests', false);

-- Create storage policies for the uploaded-tests bucket
CREATE POLICY "Users can upload their own tests" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'uploaded-tests' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own tests" ON storage.objects
FOR SELECT USING (
  bucket_id = 'uploaded-tests' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own tests" ON storage.objects
FOR DELETE USING (
  bucket_id = 'uploaded-tests' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Create a table to store test metadata
CREATE TABLE public.uploaded_tests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('0', '1', '2', '3', '4', 'IELTS')),
  grade TEXT NOT NULL CHECK (grade IN ('1-2', '3-4', '5-6', '7-8', '9-11')),
  topics TEXT[] NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL CHECK (file_type IN ('pdf', 'docx')),
  file_size INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to ensure users can only see their own uploaded tests
ALTER TABLE public.uploaded_tests ENABLE ROW LEVEL SECURITY;

-- Create policies for uploaded_tests table
CREATE POLICY "Users can view their own uploaded tests" 
  ON public.uploaded_tests 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own uploaded tests" 
  ON public.uploaded_tests 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own uploaded tests" 
  ON public.uploaded_tests 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own uploaded tests" 
  ON public.uploaded_tests 
  FOR DELETE 
  USING (auth.uid() = user_id);

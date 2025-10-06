-- Fix critical security issue: Remove overly permissive policy on questions table
DROP POLICY IF EXISTS "Allow all operations for questions" ON public.questions;

-- Create table for rate limiting admin requests
CREATE TABLE IF NOT EXISTS public.admin_requests_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on admin_requests_log
ALTER TABLE public.admin_requests_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view request logs
CREATE POLICY "Admins can view request logs" 
ON public.admin_requests_log 
FOR SELECT 
USING (has_role('admin'::app_role));

-- Create index for efficient rate limiting queries
CREATE INDEX IF NOT EXISTS idx_admin_requests_ip_created 
ON public.admin_requests_log(ip_address, created_at DESC);

-- Add cleanup function to remove old logs (older than 24 hours)
CREATE OR REPLACE FUNCTION public.cleanup_old_admin_request_logs()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.admin_requests_log 
  WHERE created_at < now() - interval '24 hours';
END;
$$;
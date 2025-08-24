-- Fix security linter warning: Function Search Path Mutable
-- Update the get_admin_profiles function to set a secure search_path
CREATE OR REPLACE FUNCTION public.get_admin_profiles()
RETURNS TABLE(id uuid, created_at timestamptz, email text)
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT au.id, au.created_at, au.email
  FROM public.admin_users au
  WHERE is_admin();  -- Only admins can call this function
$$;
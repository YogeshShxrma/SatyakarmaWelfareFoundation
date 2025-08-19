-- Fix the search path security issue
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.admin_users 
    WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );
$$;
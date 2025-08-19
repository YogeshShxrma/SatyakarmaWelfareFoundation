-- Create security definer function to check admin status safely
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.admin_users 
    WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );
$$;

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Admin can manage blogs" ON public.blogs;
DROP POLICY IF EXISTS "Admin can manage news" ON public.news;
DROP POLICY IF EXISTS "Admin can manage media" ON public.media;
DROP POLICY IF EXISTS "Admin can manage members" ON public.members;

-- Create secure admin policies for blogs
CREATE POLICY "Authenticated admins can manage blogs"
ON public.blogs
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Create secure admin policies for news  
CREATE POLICY "Authenticated admins can manage news"
ON public.news
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Create secure admin policies for media
CREATE POLICY "Authenticated admins can manage media"
ON public.media
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Create secure admin policies for members
CREATE POLICY "Authenticated admins can manage members"
ON public.members
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Add file upload security constraints
ALTER TABLE public.media ADD CONSTRAINT valid_file_type 
CHECK (file_type IN ('image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'));

-- Create audit log table for admin actions
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_email text NOT NULL,
  action text NOT NULL,
  table_name text NOT NULL,
  record_id uuid,
  timestamp timestamp with time zone DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs"
ON public.admin_audit_log
FOR SELECT
TO authenticated
USING (public.is_admin());
-- Fix infinite recursion in admin_users RLS policies
-- Drop the old recursive policies
DROP POLICY IF EXISTS "Authenticated admins can view admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Authenticated admins can create admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Authenticated admins can update admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Authenticated admins can delete admin users" ON public.admin_users;

-- Create new policies using the is_admin() security definer function
CREATE POLICY "Admins can view admin users"
ON public.admin_users
FOR SELECT
USING (is_admin());

CREATE POLICY "Admins can insert admin users"
ON public.admin_users
FOR INSERT
WITH CHECK (is_admin());

CREATE POLICY "Admins can update admin users"
ON public.admin_users
FOR UPDATE
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Admins can delete admin users"
ON public.admin_users
FOR DELETE
USING (is_admin() AND id != auth.uid()); -- Prevent self-deletion
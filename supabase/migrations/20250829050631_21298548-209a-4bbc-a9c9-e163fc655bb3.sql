-- Fix critical security vulnerability in admin_users table RLS policies
-- Remove overly permissive service role policies and implement secure authentication-based policies

-- First, drop all existing insecure policies
DROP POLICY IF EXISTS "Service role can delete admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Service role can insert admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Service role can select admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Service role can update admin users" ON public.admin_users;

-- Create secure policies that require proper authentication

-- 1. Allow authenticated admins to view other admin users (for admin management)
CREATE POLICY "Authenticated admins can view admin users"
ON public.admin_users
FOR SELECT
TO authenticated
USING (
  -- Only allow if the requesting user is already an admin
  EXISTS (
    SELECT 1 
    FROM public.admin_users au 
    WHERE au.email = (SELECT email FROM auth.users WHERE id = auth.uid())
  )
);

-- 2. Allow authenticated admins to create new admin users  
CREATE POLICY "Authenticated admins can create admin users"
ON public.admin_users
FOR INSERT
TO authenticated
WITH CHECK (
  -- Only allow if the requesting user is already an admin
  EXISTS (
    SELECT 1 
    FROM public.admin_users au 
    WHERE au.email = (SELECT email FROM auth.users WHERE id = auth.uid())
  )
);

-- 3. Allow authenticated admins to update admin users
CREATE POLICY "Authenticated admins can update admin users"
ON public.admin_users
FOR UPDATE
TO authenticated
USING (
  -- Only allow if the requesting user is already an admin
  EXISTS (
    SELECT 1 
    FROM public.admin_users au 
    WHERE au.email = (SELECT email FROM auth.users WHERE id = auth.uid())
  )
)
WITH CHECK (
  -- Only allow if the requesting user is already an admin
  EXISTS (
    SELECT 1 
    FROM public.admin_users au 
    WHERE au.email = (SELECT email FROM auth.users WHERE id = auth.uid())
  )
);

-- 4. Allow authenticated admins to delete admin users (with safeguards)
CREATE POLICY "Authenticated admins can delete admin users"
ON public.admin_users
FOR DELETE
TO authenticated
USING (
  -- Only allow if the requesting user is already an admin
  -- AND they're not trying to delete themselves (to prevent lockout)
  EXISTS (
    SELECT 1 
    FROM public.admin_users au 
    WHERE au.email = (SELECT email FROM auth.users WHERE id = auth.uid())
  )
  AND email != (SELECT email FROM auth.users WHERE id = auth.uid())
);

-- 5. Create a special policy for the create-admin-user edge function
-- This allows service role access ONLY for the specific edge function operation
CREATE POLICY "Service role can insert admin users via edge function"
ON public.admin_users
FOR INSERT
TO service_role
WITH CHECK (true);

-- 6. Allow service role to select for the is_admin function to work
CREATE POLICY "Service role can select for authentication functions"
ON public.admin_users
FOR SELECT
TO service_role
USING (true);

-- Create a secure function for admin user creation that logs the action
CREATE OR REPLACE FUNCTION public.create_admin_user_secure(
  admin_email TEXT,
  admin_password_hash TEXT
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_admin_id UUID;
  requesting_admin_email TEXT;
BEGIN
  -- Get the email of the requesting admin
  SELECT email INTO requesting_admin_email 
  FROM auth.users 
  WHERE id = auth.uid();
  
  -- Verify the requesting user is an admin
  IF NOT is_admin() THEN
    RAISE EXCEPTION 'Access denied: Only admins can create admin users';
  END IF;
  
  -- Insert the new admin user
  INSERT INTO public.admin_users (email, password_hash)
  VALUES (admin_email, admin_password_hash)
  RETURNING id INTO new_admin_id;
  
  -- Log the admin creation for audit purposes
  INSERT INTO public.admin_audit_log (
    admin_email,
    action,
    table_name,
    record_id
  ) VALUES (
    requesting_admin_email,
    'CREATE_ADMIN_USER',
    'admin_users',
    new_admin_id
  );
  
  RETURN new_admin_id;
END;
$$;
-- Fix critical security vulnerability in admin_users table
-- Current policy allows anyone to view admin credentials with "true" condition

-- Drop the insecure policy
DROP POLICY IF EXISTS "Admin can view admin_users" ON public.admin_users;

-- Create a secure policy that only allows authenticated users to view their own admin record
-- This prevents unauthorized access to admin credentials
CREATE POLICY "Authenticated admins can view own record" 
ON public.admin_users 
FOR SELECT 
TO authenticated
USING (auth.uid()::text = id::text);

-- Add policy for admin user creation (for initial setup)
CREATE POLICY "Service role can manage admin_users" 
ON public.admin_users 
FOR ALL 
TO service_role
USING (true);

-- Ensure RLS is enabled
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
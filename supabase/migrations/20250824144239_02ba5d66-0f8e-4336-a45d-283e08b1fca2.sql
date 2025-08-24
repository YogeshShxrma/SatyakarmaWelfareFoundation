-- Fix admin_users table security vulnerability
-- Remove the policy that allows admins to view their own records (including password_hash)
DROP POLICY IF EXISTS "Authenticated admins can view own record" ON public.admin_users;

-- Create a secure view for admin users that excludes password_hash
CREATE OR REPLACE VIEW public.admin_profiles AS
SELECT 
    id,
    created_at,
    email
FROM public.admin_users;

-- Enable RLS on the view
ALTER VIEW public.admin_profiles SET (security_barrier = true);

-- Create RLS policy for the view - only authenticated admins can see admin profiles
CREATE POLICY "Authenticated admins can view admin profiles" 
ON public.admin_profiles 
FOR SELECT 
TO authenticated
USING (is_admin());

-- Update admin_users RLS to be more restrictive
-- Only service role should have any access to the actual admin_users table
CREATE POLICY "Only service role can access admin_users" 
ON public.admin_users 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- Grant SELECT permission on the view to authenticated users
GRANT SELECT ON public.admin_profiles TO authenticated;
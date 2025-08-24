-- Fix admin_users table security vulnerability
-- Step 1: Remove the policy that allows admins to view their own records (including password_hash)
DROP POLICY IF EXISTS "Authenticated admins can view own record" ON public.admin_users;

-- Step 2: Remove the broad service role policy and replace with more specific ones
DROP POLICY IF EXISTS "Service role can manage admin_users" ON public.admin_users;

-- Step 3: Create restrictive policies for the admin_users table
-- Only service role can INSERT new admin users (for the create-admin-user function)
CREATE POLICY "Service role can insert admin users" 
ON public.admin_users 
FOR INSERT 
TO service_role
WITH CHECK (true);

-- Only service role can UPDATE admin users
CREATE POLICY "Service role can update admin users" 
ON public.admin_users 
FOR UPDATE 
TO service_role
USING (true)
WITH CHECK (true);

-- Only service role can DELETE admin users
CREATE POLICY "Service role can delete admin users" 
ON public.admin_users 
FOR DELETE 
TO service_role
USING (true);

-- Service role can SELECT all fields (needed for is_admin() function)
CREATE POLICY "Service role can select admin users" 
ON public.admin_users 
FOR SELECT 
TO service_role
USING (true);

-- Step 4: Create a secure function that admins can use to get safe admin info
CREATE OR REPLACE FUNCTION public.get_admin_profiles()
RETURNS TABLE(id uuid, created_at timestamptz, email text)
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT au.id, au.created_at, au.email
  FROM public.admin_users au
  WHERE is_admin();  -- Only admins can call this function
$$;

-- Drop the existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete blog images" ON storage.objects;

-- Create more permissive policies that work without Supabase auth
CREATE POLICY "Allow blog image uploads"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'blog-images');

CREATE POLICY "Allow blog image updates"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'blog-images');

CREATE POLICY "Allow blog image deletions"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'blog-images');

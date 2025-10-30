-- Create a storage bucket for site assets (logo, focus area images, etc.)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'site-assets',
  'site-assets',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to site assets
CREATE POLICY "Public can view site assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-assets');

-- Allow admins to upload/update site assets
CREATE POLICY "Admins can upload site assets"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'site-assets' AND
  is_admin()
);

CREATE POLICY "Admins can update site assets"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'site-assets' AND
  is_admin()
);

CREATE POLICY "Admins can delete site assets"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'site-assets' AND
  is_admin()
);

-- Create a table to track site assets with descriptions
CREATE TABLE IF NOT EXISTS public.site_assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  file_path TEXT NOT NULL,
  file_url TEXT NOT NULL,
  category TEXT, -- 'logo', 'focus-area', 'hero', etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on site_assets table
ALTER TABLE public.site_assets ENABLE ROW LEVEL SECURITY;

-- Everyone can view site assets
CREATE POLICY "Anyone can view site assets"
ON public.site_assets FOR SELECT
USING (true);

-- Only admins can manage site assets
CREATE POLICY "Admins can insert site assets"
ON public.site_assets FOR INSERT
WITH CHECK (is_admin());

CREATE POLICY "Admins can update site assets"
ON public.site_assets FOR UPDATE
USING (is_admin());

CREATE POLICY "Admins can delete site assets"
ON public.site_assets FOR DELETE
USING (is_admin());

-- Add trigger for updated_at
CREATE TRIGGER update_site_assets_updated_at
BEFORE UPDATE ON public.site_assets
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
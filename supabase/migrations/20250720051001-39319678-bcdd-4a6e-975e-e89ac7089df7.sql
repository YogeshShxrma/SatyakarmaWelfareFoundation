-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create members table
CREATE TABLE public.members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  introduction TEXT NOT NULL,
  achievements TEXT NOT NULL,
  display_order INTEGER DEFAULT 0
);

-- Enable Row Level Security
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- Create policies for public viewing
CREATE POLICY "Public can view members" 
ON public.members 
FOR SELECT 
USING (true);

-- Create policies for admin management
CREATE POLICY "Admin can manage members" 
ON public.members 
FOR ALL 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_members_updated_at
BEFORE UPDATE ON public.members
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
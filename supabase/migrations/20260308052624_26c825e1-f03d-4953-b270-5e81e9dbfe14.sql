-- Create repair_submissions table
CREATE TABLE public.repair_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL DEFAULT '',
  organization text NOT NULL DEFAULT '',
  equipment_category text NOT NULL DEFAULT '',
  equipment_variant text NOT NULL DEFAULT '',
  serial_number text NOT NULL DEFAULT '',
  issue_description text NOT NULL DEFAULT '',
  image_urls text[] NOT NULL DEFAULT '{}',
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.repair_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public insert repair_submissions" ON public.repair_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Auth manage repair_submissions" ON public.repair_submissions
  FOR ALL USING (true) WITH CHECK (true);

INSERT INTO storage.buckets (id, name, public) VALUES ('repair-images', 'repair-images', true);

CREATE POLICY "Public upload repair images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'repair-images');

CREATE POLICY "Public read repair images" ON storage.objects
  FOR SELECT USING (bucket_id = 'repair-images');

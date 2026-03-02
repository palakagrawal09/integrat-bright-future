
-- Table to store OTP codes for email verification
CREATE TABLE public.otp_verifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  form_type TEXT NOT NULL DEFAULT 'enquiry',
  verified BOOLEAN NOT NULL DEFAULT false,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.otp_verifications ENABLE ROW LEVEL SECURITY;

-- Allow public insert (edge function will handle this, but as fallback)
CREATE POLICY "Public insert otp" ON public.otp_verifications FOR INSERT WITH CHECK (true);

-- Allow public select for verification
CREATE POLICY "Public read otp" ON public.otp_verifications FOR SELECT USING (true);

-- Allow public update for marking verified
CREATE POLICY "Public update otp" ON public.otp_verifications FOR UPDATE USING (true);

-- Auth manage
CREATE POLICY "Auth manage otp" ON public.otp_verifications FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Auto-cleanup old OTPs (optional: via cron or manual)

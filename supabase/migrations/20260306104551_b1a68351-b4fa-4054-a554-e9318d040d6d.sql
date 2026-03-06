
-- Drop all restrictive policies and recreate as permissive for all content tables

-- about_entries
DROP POLICY IF EXISTS "Public read about_entries" ON public.about_entries;
DROP POLICY IF EXISTS "Auth manage about_entries" ON public.about_entries;
CREATE POLICY "Public read about_entries" ON public.about_entries FOR SELECT USING (true);
CREATE POLICY "Auth manage about_entries" ON public.about_entries FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- announcements
DROP POLICY IF EXISTS "Public read announcements" ON public.announcements;
DROP POLICY IF EXISTS "Auth manage announcements" ON public.announcements;
CREATE POLICY "Public read announcements" ON public.announcements FOR SELECT USING (true);
CREATE POLICY "Auth manage announcements" ON public.announcements FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- clients
DROP POLICY IF EXISTS "Public read clients" ON public.clients;
DROP POLICY IF EXISTS "Auth manage clients" ON public.clients;
CREATE POLICY "Public read clients" ON public.clients FOR SELECT USING (true);
CREATE POLICY "Auth manage clients" ON public.clients FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- contact_submissions
DROP POLICY IF EXISTS "Public insert contact_submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Auth manage contact_submissions" ON public.contact_submissions;
CREATE POLICY "Public insert contact_submissions" ON public.contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth manage contact_submissions" ON public.contact_submissions FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- employees
DROP POLICY IF EXISTS "Auth read employees" ON public.employees;
DROP POLICY IF EXISTS "Auth manage employees" ON public.employees;
CREATE POLICY "Auth read employees" ON public.employees FOR SELECT TO authenticated USING (true);
CREATE POLICY "Auth manage employees" ON public.employees FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- homepage_sections
DROP POLICY IF EXISTS "Public read homepage_sections" ON public.homepage_sections;
DROP POLICY IF EXISTS "Auth manage homepage_sections" ON public.homepage_sections;
CREATE POLICY "Public read homepage_sections" ON public.homepage_sections FOR SELECT USING (true);
CREATE POLICY "Auth manage homepage_sections" ON public.homepage_sections FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- news_articles
DROP POLICY IF EXISTS "Public read news_articles" ON public.news_articles;
DROP POLICY IF EXISTS "Auth manage news_articles" ON public.news_articles;
CREATE POLICY "Public read news_articles" ON public.news_articles FOR SELECT USING (true);
CREATE POLICY "Auth manage news_articles" ON public.news_articles FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- otp_verifications
DROP POLICY IF EXISTS "Public insert otp" ON public.otp_verifications;
DROP POLICY IF EXISTS "Public read otp" ON public.otp_verifications;
DROP POLICY IF EXISTS "Public update otp" ON public.otp_verifications;
DROP POLICY IF EXISTS "Auth manage otp" ON public.otp_verifications;
CREATE POLICY "Public insert otp" ON public.otp_verifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read otp" ON public.otp_verifications FOR SELECT USING (true);
CREATE POLICY "Public update otp" ON public.otp_verifications FOR UPDATE USING (true);
CREATE POLICY "Auth manage otp" ON public.otp_verifications FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- product_categories
DROP POLICY IF EXISTS "Public read product_categories" ON public.product_categories;
DROP POLICY IF EXISTS "Auth manage product_categories" ON public.product_categories;
CREATE POLICY "Public read product_categories" ON public.product_categories FOR SELECT USING (true);
CREATE POLICY "Auth manage product_categories" ON public.product_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- products
DROP POLICY IF EXISTS "Public read products" ON public.products;
DROP POLICY IF EXISTS "Auth manage products" ON public.products;
CREATE POLICY "Public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Auth manage products" ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- services
DROP POLICY IF EXISTS "Public read services" ON public.services;
DROP POLICY IF EXISTS "Auth manage services" ON public.services;
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Auth manage services" ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);

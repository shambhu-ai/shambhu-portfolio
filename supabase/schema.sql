-- ================================================================
-- Shambhu Patil Portfolio — Supabase Database Schema
-- Run this entire file in Supabase SQL Editor (Dashboard → SQL)
-- Each block is idempotent (IF NOT EXISTS / ON CONFLICT DO NOTHING)
-- ================================================================

-- ── contact_messages: append-only inbox ──────────────────────────
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  from_name  text        NOT NULL,
  from_email text        NOT NULL,
  subject    text,
  message    text        NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- ── portfolio_recommendations: public guestbook ───────────────────
CREATE TABLE IF NOT EXISTS public.portfolio_recommendations (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name      text        NOT NULL,
  author_title     text        NOT NULL,
  company          text,
  relationship     text,
  testimonial_text text        NOT NULL,
  is_approved      boolean     DEFAULT false,
  created_at       timestamptz DEFAULT now()
);

-- ── Row Level Security ────────────────────────────────────────────
ALTER TABLE public.contact_messages           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_recommendations  ENABLE ROW LEVEL SECURITY;

-- contact_messages: anon can insert, only authenticated can read
CREATE POLICY IF NOT EXISTS "anon_insert_contact"
  ON public.contact_messages FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "auth_read_contact"
  ON public.contact_messages FOR SELECT
  USING (auth.role() = 'authenticated');

-- recommendations: anon insert, public read of approved rows
CREATE POLICY IF NOT EXISTS "anon_insert_recommendations"
  ON public.portfolio_recommendations FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "public_read_approved_recommendations"
  ON public.portfolio_recommendations FOR SELECT
  USING (is_approved = true);

CREATE POLICY IF NOT EXISTS "auth_manage_recommendations"
  ON public.portfolio_recommendations FOR ALL
  USING (auth.role() = 'authenticated');

-- ── Grants ────────────────────────────────────────────────────────
GRANT INSERT ON public.contact_messages            TO anon;
GRANT SELECT, INSERT ON public.portfolio_recommendations TO anon;

GRANT SELECT, INSERT, UPDATE, DELETE
  ON public.contact_messages, public.portfolio_recommendations
  TO authenticated;

-- ── Verification ─────────────────────────────────────────────────
-- SELECT tablename, rowsecurity FROM pg_tables
--  WHERE schemaname = 'public'
--    AND tablename IN ('contact_messages','portfolio_recommendations');
-- Expected: rowsecurity = true for both rows.

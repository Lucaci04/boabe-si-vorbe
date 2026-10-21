import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Rulează doar pe server (endpoint-ul /api/reservations). Cheia anon e protejată de politicile RLS din
// supabase/migrations/0001_reservations.sql: poate doar insera, nu poate citi rezervările.
const url = import.meta.env.SUPABASE_URL;
const anonKey = import.meta.env.SUPABASE_ANON_KEY;

export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey, { auth: { persistSession: false } }) : null;

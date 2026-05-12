import { createClient } from '@supabase/supabase-js';

// 1. Define variables from your environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * STANDARD CLIENT (Client-Side & Basic Server-Side)
 * Use this for typical CRUD operations where Row Level Security (RLS) is active.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * ADMIN CLIENT (Server-Side Only)
 * Use this ONLY in API routes or Server Actions for tasks that bypass RLS.
 * WARNING: Never import this into a client-side component (Vuex/React).
 */
export const getSupabaseAdmin = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE;
  
  if (!serviceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE environment variable');
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

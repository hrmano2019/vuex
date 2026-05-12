import { getSupabaseAdmin } from '@/lib/supabaseClient';

export default async function handler(req, res) {
  const adminClient = getSupabaseAdmin();
  // Administrative logic here...
}

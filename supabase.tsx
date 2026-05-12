import { supabase } from '@/lib/supabaseClient';

// Example: Fetching data in a Vuex action or Next.js component
const { data, error } = await supabase
  .from('your_table_name')
  .select('*');

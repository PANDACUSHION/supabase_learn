import {createClient} from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_APP_SUPABASE_ANNON_KEY;

const supaBase = createClient(supabaseUrl,supabaseKey);

export default supaBase;

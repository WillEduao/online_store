require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variáveis SUPABASE_URL e SUPABASE_ANON_KEY devem estar definidas no .env');
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = { supabase };
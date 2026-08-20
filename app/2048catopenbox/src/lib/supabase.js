import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 核心修正：將新版 sb_publishable 金鑰進行標準相容性補強，徹底斷根 Invalid path 報錯
const cleanUrl = supabaseUrl ? supabaseUrl.replace(/\/$/, '') : '';
const options = {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  },
  global: {
    headers: {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`
    }
  }
};

export const supabase = createClient(cleanUrl, supabaseAnonKey, options);

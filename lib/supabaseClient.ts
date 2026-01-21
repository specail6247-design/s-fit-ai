import { createClient } from '@supabase/supabase-js';

// Helper to check if a string is a valid URL
const isValidUrl = (urlString: string) => {
  try { 
    return Boolean(new URL(urlString)); 
  } catch { 
    return false; 
  }
};

const getSupabaseConfig = () => {
  let url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  let key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Check if env vars are missing or are the placeholders
  if (!url || url === 'your_supabase_url_here' || !isValidUrl(url)) {
    console.warn('⚠️ Invalid or missing Supabase URL. Using mock connection for development.');
    url = 'https://placeholder-project.supabase.co';
  }

  if (!key || key === 'your_supabase_anon_key_here') {
    key = 'placeholder-key';
  }

  return { url, key };
};

const { url, key } = getSupabaseConfig();

export const supabase = createClient(url, key);

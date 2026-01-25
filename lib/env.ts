export function validateEnv() {
  const requiredEnv = [
    { key: 'NEXT_PUBLIC_SUPABASE_URL', value: process.env.NEXT_PUBLIC_SUPABASE_URL },
    { key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', value: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY },
    { key: 'NEXT_PUBLIC_APP_URL', value: process.env.NEXT_PUBLIC_APP_URL },
  ];

  // Server-side only checks
  if (typeof window === 'undefined') {
    requiredEnv.push(
      { key: 'REPLICATE_API_TOKEN', value: process.env.REPLICATE_API_TOKEN },
      { key: 'OPENAI_API_KEY', value: process.env.OPENAI_API_KEY },
    );
  }

  const missing = requiredEnv.filter(env => !env.value || env.value.includes('your_'));

  if (missing.length > 0) {
    const missingKeys = missing.map(env => env.key).join(', ');
    const message = `Missing or invalid environment variables: ${missingKeys}`;

    if (process.env.NODE_ENV === 'production') {
      console.error(`🚨 [ENV CHECK] ${message}`);
    } else {
      console.warn(`⚠️ [ENV CHECK] ${message}`);
    }
  }
}

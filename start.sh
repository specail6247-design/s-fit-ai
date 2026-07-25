#!/bin/bash
export NEXT_PUBLIC_SUPABASE_URL="https://mock.supabase.co"
export NEXT_PUBLIC_SUPABASE_ANON_KEY="mock-anon-key"
export REPLICATE_API_TOKEN="mock-token"
export NEXT_PUBLIC_APP_URL="http://localhost:3000"
pnpm dev > pnpm_dev.log 2>&1 &
echo $! > pnpm_dev.pid

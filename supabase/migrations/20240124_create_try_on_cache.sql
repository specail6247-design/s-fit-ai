-- Create table for storing virtual try-on results
create table if not exists try_on_cache (
  id text primary key, -- SHA256 hash of inputs
  image_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table try_on_cache enable row level security;

-- Policies
-- Allow read access to everyone
create policy "Public read access" on try_on_cache
  for select using (true);

-- Allow insert access to everyone (since we use anon key in the API route currently)
-- In production, you might want to restrict this to service_role only and update the client.
create policy "Public insert access" on try_on_cache
  for insert with check (true);

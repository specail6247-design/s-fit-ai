-- Enable the pgvector extension to work with embedding vectors
create extension if not exists vector;

-- Create the products table if it doesn't exist
create table if not exists products (
  id text primary key,
  name text,
  brand text,
  category text,
  price numeric,
  currency text,
  "imageUrl" text,
  "productUrl" text,
  sizes text[],
  colors text[],
  composition jsonb,
  physics jsonb,
  "isLuxury" boolean,
  "scrapedAt" timestamp with time zone,
  embedding vector(1536)
);

-- Add columns if they don't exist (idempotent migration for existing tables)
do $$
begin
  if not exists (select 1 from information_schema.columns where table_name = 'products' and column_name = 'composition') then
    alter table products add column composition jsonb;
  end if;

  if not exists (select 1 from information_schema.columns where table_name = 'products' and column_name = 'physics') then
    alter table products add column physics jsonb;
  end if;

  if not exists (select 1 from information_schema.columns where table_name = 'products' and column_name = 'embedding') then
    alter table products add column embedding vector(1536);
  end if;
end $$;

-- Enable Row Level Security (RLS)
alter table products enable row level security;

-- Create a policy that allows anyone to read products
drop policy if exists "Public products are viewable by everyone" on products;
create policy "Public products are viewable by everyone"
  on products for select
  using ( true );

-- Create a policy that allows service role to insert/update
drop policy if exists "Service role can manage products" on products;
create policy "Service role can manage products"
  on products for all
  using ( auth.role() = 'service_role' );

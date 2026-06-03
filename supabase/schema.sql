-- ================================================
-- aïaaïa Platform — Milestone 1 Schema
-- Run this in Supabase SQL Editor
-- ================================================

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  created_at timestamptz default now()
);

create table if not exists public.assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id)
    on delete set null,
  answers jsonb not null default '{}',
  flags jsonb not null default '{}',
  skin_type text,
  top_concerns text[] default '{}',
  sensitivity_level int,
  is_pregnant boolean default false,
  has_prescription boolean default false,
  requires_consultation boolean default false,
  climate text,
  budget_range text,
  completed_at timestamptz default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  product_code text unique,
  name text not null,
  brand text,
  form text,
  skin_types text[] default '{}',
  concerns text[] default '{}',
  active_ingredients text[] default '{}',
  conflicts_with text[] default '{}',
  pregnancy_safe text default 'Yes',
  price_ugx numeric default 0,
  stock_status text default 'In Stock',
  image_url text,
  short_description text,
  usage_instructions text,
  is_boutique boolean default false,
  boutique_category text,
  created_at timestamptz default now()
);

alter table public.users enable row level security;
alter table public.assessments enable row level security;
alter table public.products enable row level security;

create policy "products_public_read"
  on public.products for select using (true);

create policy "users_public_insert"
  on public.users for insert with check (true);

create policy "users_public_select"
  on public.users for select using (true);

create policy "assessments_public_insert"
  on public.assessments for insert with check (true);

create policy "assessments_public_select"
  on public.assessments for select using (true);

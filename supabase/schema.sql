-- Homebirth.com Database Schema
-- Run this in the Supabase SQL Editor to initialize all tables.
-- Auth is handled by Supabase Auth (auth.users table).
-- Tables use their own UUIDs as primary keys.
-- user_id columns link to auth.users when an auth account exists.

-- ============================================================
-- PARENTS
-- ============================================================
create table public.parents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  phone text,
  zip text,
  created_at timestamptz default now()
);

alter table public.parents enable row level security;

create policy "Parents can read own data"
  on public.parents for select
  using (auth.uid() = user_id);

create policy "Parents can update own data"
  on public.parents for update
  using (auth.uid() = user_id);

create policy "Parents can insert own data"
  on public.parents for insert
  with check (auth.uid() = user_id);

-- Providers can read parent info for parents who have consults with them.
-- Uses a direct user_id check on providers (no join to parents) to avoid RLS recursion.
create policy "Providers can read parents with consults"
  on public.parents for select
  using (
    exists (
      select 1 from public.consults
      where consults.parent_id = parents.id
      and consults.provider_id in (
        select id from public.providers where user_id = auth.uid()
      )
    )
  );

-- ============================================================
-- PROVIDERS
-- ============================================================
create table public.providers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete cascade,
  name text not null,
  credentials text not null default '',
  photo_url text,
  location text,
  service_radius int,
  years_experience int,
  births_attended text,
  philosophy text,
  tagline text,
  price_range text,
  fee_min int,
  fee_max int,
  response_time text,
  accepting_clients boolean default true,
  birth_settings text[] default '{}',
  languages text[] default '{}',
  insurance_accepted text[] default '{}',
  sliding_scale boolean default false,
  specialties text[] default '{}',
  scope text[] default '{}',
  transfer_plan text,
  communication_tags text[] default '{}',
  values_tags text[] default '{}',
  whats_included text[] default '{}',
  payment_options text[] default '{}',
  payment_notes text,
  accepting_due_months text[] default '{}',
  -- Mirror intake fields (matching only, never shown to parents)
  care_style text,
  communication_vibe text,
  focus_description text,
  transfer_approach text,
  preferred_contact text,
  education_style text,
  scope_comfort text[] default '{}',
  partner_involvement text,
  -- Verification
  identity_verified boolean default false,
  license_verified boolean default false,
  practice_verified boolean default false,
  -- Aggregated review data (cached from external sources)
  aggregate_rating numeric(2,1),
  review_count int default 0,
  sentiment_tags text[] default '{}',
  -- Meta
  onboarding_complete boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.providers enable row level security;

-- Anyone can read provider profiles (public directory)
create policy "Provider profiles are publicly readable"
  on public.providers for select
  using (true);

create policy "Providers can update own profile"
  on public.providers for update
  using (auth.uid() = user_id);

create policy "Providers can insert own profile"
  on public.providers for insert
  with check (auth.uid() = user_id);

-- ============================================================
-- PROVIDER EDUCATION
-- ============================================================
create table public.provider_education (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.providers(id) on delete cascade,
  institution text not null,
  degree text not null,
  year int
);

alter table public.provider_education enable row level security;

create policy "Provider education is publicly readable"
  on public.provider_education for select
  using (true);

create policy "Providers can manage own education"
  on public.provider_education for all
  using (
    exists (
      select 1 from public.providers
      where providers.id = provider_education.provider_id
      and providers.user_id = auth.uid()
    )
  );

-- ============================================================
-- PROVIDER REVIEWS (aggregated from Google/Yelp/Facebook)
-- ============================================================
create table public.provider_reviews (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.providers(id) on delete cascade,
  source text not null check (source in ('google', 'yelp', 'facebook')),
  author text,
  rating numeric(2,1),
  date text,
  text text
);

alter table public.provider_reviews enable row level security;

create policy "Provider reviews are publicly readable"
  on public.provider_reviews for select
  using (true);

-- Reviews are inserted by admin/system, not by providers directly
-- For now, seed data only. Add admin policy later.
create policy "Providers can manage own reviews"
  on public.provider_reviews for all
  using (
    exists (
      select 1 from public.providers
      where providers.id = provider_reviews.provider_id
      and providers.user_id = auth.uid()
    )
  );

-- ============================================================
-- PROVIDER RATING BREAKDOWN (per source)
-- ============================================================
create table public.provider_ratings (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.providers(id) on delete cascade,
  source text not null check (source in ('google', 'yelp', 'facebook')),
  rating numeric(2,1),
  count int
);

alter table public.provider_ratings enable row level security;

create policy "Provider ratings are publicly readable"
  on public.provider_ratings for select
  using (true);

create policy "Providers can manage own ratings"
  on public.provider_ratings for all
  using (
    exists (
      select 1 from public.providers
      where providers.id = provider_ratings.provider_id
      and providers.user_id = auth.uid()
    )
  );

-- ============================================================
-- INTAKES (parent answers)
-- ============================================================
create table public.intakes (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references public.parents(id) on delete cascade,
  answers jsonb not null default '{}',
  zip text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.intakes enable row level security;

create policy "Parents can read own intakes"
  on public.intakes for select
  using (
    exists (
      select 1 from public.parents
      where parents.id = intakes.parent_id
      and parents.user_id = auth.uid()
    )
  );

create policy "Parents can insert own intakes"
  on public.intakes for insert
  with check (
    exists (
      select 1 from public.parents
      where parents.id = parent_id
      and parents.user_id = auth.uid()
    )
  );

create policy "Parents can update own intakes"
  on public.intakes for update
  using (
    exists (
      select 1 from public.parents
      where parents.id = intakes.parent_id
      and parents.user_id = auth.uid()
    )
  );

-- Providers can read intake answers for parents who have consults with them
create policy "Providers can read intakes for their consults"
  on public.intakes for select
  using (
    exists (
      select 1 from public.consults
      where consults.parent_id = intakes.parent_id
      and consults.provider_id in (
        select id from public.providers where user_id = auth.uid()
      )
    )
  );

-- ============================================================
-- CONSULTS (the core parent ↔ provider connection)
-- ============================================================
create table public.consults (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references public.parents(id) on delete cascade,
  provider_id uuid not null references public.providers(id) on delete cascade,
  parent_status text default 'sent' check (parent_status in ('sent', 'viewed', 'responded', 'scheduled', 'completed')),
  provider_status text default 'new' check (provider_status in ('new', 'contacted', 'scheduled', 'booked', 'not-a-fit')),
  match_score int,
  match_reasons text[] default '{}',
  decline_reason text,
  decline_note text,
  scheduled_date text,
  scheduled_time text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.consults enable row level security;

-- NOTE: All RLS policies use subqueries (not JOINs) to avoid infinite recursion
-- when tables reference each other. Never JOIN to a table that has its own RLS
-- policies in a policy expression.

create policy "Parents can read own consults"
  on public.consults for select
  using (
    parent_id in (select id from public.parents where user_id = auth.uid())
  );

create policy "Parents can insert consults"
  on public.consults for insert
  with check (
    parent_id in (select id from public.parents where user_id = auth.uid())
  );

create policy "Parents can update own consults"
  on public.consults for update
  using (
    parent_id in (select id from public.parents where user_id = auth.uid())
  );

create policy "Providers can read their consults"
  on public.consults for select
  using (
    provider_id in (select id from public.providers where user_id = auth.uid())
  );

create policy "Providers can update their consults"
  on public.consults for update
  using (
    provider_id in (select id from public.providers where user_id = auth.uid())
  );

-- ============================================================
-- MESSAGES (within a consult thread)
-- ============================================================
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  consult_id uuid not null references public.consults(id) on delete cascade,
  sender text not null check (sender in ('parent', 'provider', 'system')),
  type text default 'text' check (type in ('text', 'system_event', 'availability', 'scheduled', 'intake_snippet')),
  content text,
  availability_slots jsonb,
  scheduled_date text,
  scheduled_time text,
  preference_tags text[],
  created_at timestamptz default now()
);

alter table public.messages enable row level security;

-- Messages are readable by both consult participants.
-- Uses subqueries to avoid RLS recursion (no JOINs to RLS-protected tables).
create policy "Consult participants can read messages"
  on public.messages for select
  using (
    consult_id in (
      select id from public.consults
      where parent_id in (select id from public.parents where user_id = auth.uid())
         or provider_id in (select id from public.providers where user_id = auth.uid())
    )
  );

create policy "Consult participants can insert messages"
  on public.messages for insert
  with check (
    consult_id in (
      select id from public.consults
      where parent_id in (select id from public.parents where user_id = auth.uid())
         or provider_id in (select id from public.providers where user_id = auth.uid())
    )
  );

-- ============================================================
-- WAITLIST (out-of-area signups)
-- ============================================================
create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  zip text not null,
  city text,
  state text,
  created_at timestamptz default now()
);

alter table public.waitlist enable row level security;

-- Anyone can join the waitlist (no auth required)
create policy "Anyone can join waitlist"
  on public.waitlist for insert
  with check (true);

-- ============================================================
-- INDEXES
-- ============================================================
create index idx_consults_parent on public.consults(parent_id);
create index idx_consults_provider on public.consults(provider_id);
create index idx_messages_consult on public.messages(consult_id);
create index idx_messages_created on public.messages(created_at);
create index idx_intakes_parent on public.intakes(parent_id);
create index idx_provider_reviews_provider on public.provider_reviews(provider_id);
create index idx_provider_education_provider on public.provider_education(provider_id);
create index idx_provider_ratings_provider on public.provider_ratings(provider_id);
create index idx_providers_onboarding on public.providers(onboarding_complete);
create index idx_waitlist_zip on public.waitlist(zip);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger providers_updated_at
  before update on public.providers
  for each row execute function public.handle_updated_at();

create trigger consults_updated_at
  before update on public.consults
  for each row execute function public.handle_updated_at();

create trigger intakes_updated_at
  before update on public.intakes
  for each row execute function public.handle_updated_at();

-- ============================================================
-- REALTIME (enable for live updates)
-- ============================================================
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.consults;

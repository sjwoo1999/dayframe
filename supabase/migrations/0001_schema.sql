-- Users table (mirrors auth.users via reference in app schemas if needed)
create table if not exists public.users (
	id uuid primary key,
	email text,
	name text,
	created_at timestamptz default now()
);

-- Checkins (mood)
create table if not exists public.checkins (
	id bigserial primary key,
	user_id uuid not null,
	score integer check (score between 0 and 10),
	tags text[],
	note text,
	ts timestamptz not null default now()
);
create index if not exists idx_checkins_user_ts on public.checkins (user_id, ts desc);

-- Expenses
create table if not exists public.expenses (
	id bigserial primary key,
	user_id uuid not null,
	amount integer not null check (amount >= 0),
	category text,
	note text,
	ts timestamptz not null default now()
);
create index if not exists idx_expenses_user_ts on public.expenses (user_id, ts desc);

-- Photos
create table if not exists public.photos (
	id bigserial primary key,
	user_id uuid not null,
	url text not null,
	ts timestamptz not null default now()
);
create index if not exists idx_photos_user_ts on public.photos (user_id, ts desc);

-- Locations
create table if not exists public.locations (
	id bigserial primary key,
	user_id uuid not null,
	lat double precision,
	lng double precision,
	label text,
	ts timestamptz not null default now()
);
create index if not exists idx_locations_user_ts on public.locations (user_id, ts desc);

-- Daily Cards
create table if not exists public.daily_cards (
	id bigserial primary key,
	user_id uuid not null,
	date date not null,
	score integer,
	summary text,
	top_photo_url text,
	created_at timestamptz default now()
);
create unique index if not exists idx_daily_cards_user_date on public.daily_cards (user_id, date);

-- RLS policies: enable and restrict to owner
alter table public.checkins enable row level security;
alter table public.expenses enable row level security;
alter table public.photos enable row level security;
alter table public.locations enable row level security;
alter table public.daily_cards enable row level security;

-- Helper function to check owner using auth.uid()
create or replace function public.is_owner(uid uuid) returns boolean language sql stable as $$
	select uid = auth.uid();
$$;

-- Policies (assume JWT with auth.uid())
create policy if not exists "owner_select_checkins" on public.checkins for select using (user_id = auth.uid());
create policy if not exists "owner_modify_checkins" on public.checkins for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy if not exists "owner_select_expenses" on public.expenses for select using (user_id = auth.uid());
create policy if not exists "owner_modify_expenses" on public.expenses for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy if not exists "owner_select_photos" on public.photos for select using (user_id = auth.uid());
create policy if not exists "owner_modify_photos" on public.photos for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy if not exists "owner_select_locations" on public.locations for select using (user_id = auth.uid());
create policy if not exists "owner_modify_locations" on public.locations for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy if not exists "owner_select_daily_cards" on public.daily_cards for select using (user_id = auth.uid());
create policy if not exists "owner_modify_daily_cards" on public.daily_cards for all using (user_id = auth.uid()) with check (user_id = auth.uid());

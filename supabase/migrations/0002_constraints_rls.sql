-- Add FKs and NOT NULLs where appropriate
alter table public.checkins alter column user_id set not null;
alter table public.expenses alter column user_id set not null;
alter table public.photos alter column user_id set not null;
alter table public.locations alter column user_id set not null;
alter table public.daily_cards alter column user_id set not null;
alter table public.daily_cards alter column date set not null;

-- Add foreign keys to users(id)
alter table public.checkins add constraint fk_checkins_user foreign key (user_id) references public.users(id) on delete cascade;
alter table public.expenses add constraint fk_expenses_user foreign key (user_id) references public.users(id) on delete cascade;
alter table public.photos add constraint fk_photos_user foreign key (user_id) references public.users(id) on delete cascade;
alter table public.locations add constraint fk_locations_user foreign key (user_id) references public.users(id) on delete cascade;
alter table public.daily_cards add constraint fk_cards_user foreign key (user_id) references public.users(id) on delete cascade;

-- Strengthen RLS with WITH CHECK
 drop policy if exists "owner_modify_checkins" on public.checkins;
create policy "owner_modify_checkins" on public.checkins for all using (user_id = auth.uid()) with check (user_id = auth.uid());
 drop policy if exists "owner_modify_expenses" on public.expenses;
create policy "owner_modify_expenses" on public.expenses for all using (user_id = auth.uid()) with check (user_id = auth.uid());
 drop policy if exists "owner_modify_photos" on public.photos;
create policy "owner_modify_photos" on public.photos for all using (user_id = auth.uid()) with check (user_id = auth.uid());
 drop policy if exists "owner_modify_locations" on public.locations;
create policy "owner_modify_locations" on public.locations for all using (user_id = auth.uid()) with check (user_id = auth.uid());
 drop policy if exists "owner_modify_daily_cards" on public.daily_cards;
create policy "owner_modify_daily_cards" on public.daily_cards for all using (user_id = auth.uid()) with check (user_id = auth.uid());

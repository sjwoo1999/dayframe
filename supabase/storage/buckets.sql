-- Storage bucket for photos
insert into storage.buckets (id, name, public) values ('photos', 'photos', false)
	on conflict (id) do nothing;

-- RLS-like policies for storage via storage.objects
create policy if not exists "owner_read_photos"
	on storage.objects for select
	to authenticated using (bucket_id = 'photos' and owner = auth.uid());

create policy if not exists "owner_write_photos"
	on storage.objects for insert
	to authenticated with check (bucket_id = 'photos' and owner = auth.uid());

create policy if not exists "owner_update_photos"
	on storage.objects for update
	to authenticated using (bucket_id = 'photos' and owner = auth.uid());

create policy if not exists "owner_delete_photos"
	on storage.objects for delete
	to authenticated using (bucket_id = 'photos' and owner = auth.uid());

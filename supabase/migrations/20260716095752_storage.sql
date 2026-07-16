-- ==========================================================
-- MessagingSystem
-- Migration 004
-- Storage
-- ==========================================================

-------------------------------------------------------------
-- Create Avatar Bucket
-------------------------------------------------------------

insert into storage.buckets (

    id,

    name,

    public

)

values (

    'avatars',

    'avatars',

    true

)

on conflict (id) do nothing;

-------------------------------------------------------------
-- Create Attachments Bucket
-------------------------------------------------------------

insert into storage.buckets (

    id,

    name,

    public

)

values (

    'attachments',

    'attachments',

    false

)

on conflict (id) do nothing;

-------------------------------------------------------------
-- Avatar Policies
-------------------------------------------------------------

create policy "Users upload own avatar"

on storage.objects

for insert

to authenticated

with check (

    bucket_id = 'avatars'

    and

    (storage.foldername(name))[1] = auth.uid()::text

);

create policy "Users update own avatar"

on storage.objects

for update

to authenticated

using (

    bucket_id = 'avatars'

    and

    owner = auth.uid()

);

create policy "Users delete own avatar"

on storage.objects

for delete

to authenticated

using (

    bucket_id = 'avatars'

    and

    owner = auth.uid()

);

-------------------------------------------------------------
-- Attachment Policies
-------------------------------------------------------------

create policy "Users upload attachments"

on storage.objects

for insert

to authenticated

with check (

    bucket_id = 'attachments'

    and

    (storage.foldername(name))[1] = auth.uid()::text

);

create policy "Users update attachments"

on storage.objects

for update

to authenticated

using (

    bucket_id = 'attachments'

    and

    owner = auth.uid()

);

create policy "Users delete attachments"

on storage.objects

for delete

to authenticated

using (

    bucket_id = 'attachments'

    and

    owner = auth.uid()

);

-------------------------------------------------------------
-- Read Policies
-------------------------------------------------------------

create policy "Public avatar access"

on storage.objects

for select

using (

    bucket_id = 'avatars'

);

create policy "Authenticated attachment access"

on storage.objects

for select

to authenticated

using (

    bucket_id = 'attachments'

);
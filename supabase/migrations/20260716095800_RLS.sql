-- ==========================================================
-- MessagingSystem
-- Migration 005
-- Row Level Security
-- ==========================================================

-------------------------------------------------------------
-- Enable RLS
-------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.attachments enable row level security;

-------------------------------------------------------------
-- PROFILES
-------------------------------------------------------------

create policy "Authenticated users can view profiles"
on public.profiles
for select
to authenticated
using (true);

create policy "Users insert own profile"
on public.profiles
for insert
to authenticated
with check (
    auth.uid() = id
);

create policy "Users update own profile"
on public.profiles
for update
to authenticated
using (
    auth.uid() = id
)
with check (
    auth.uid() = id
);

create policy "Users delete own profile"
on public.profiles
for delete
to authenticated
using (
    auth.uid() = id
);

-------------------------------------------------------------
-- CONVERSATIONS
-------------------------------------------------------------

create policy "Users view own conversations"
on public.conversations
for select
to authenticated
using (

    user_one = auth.uid()

    or

    user_two = auth.uid()

);

create policy "Users create conversations"
on public.conversations
for insert
to authenticated
with check (

    user_one = auth.uid()

    or

    user_two = auth.uid()

);

-------------------------------------------------------------
-- MESSAGES
-------------------------------------------------------------

create policy "Users view conversation messages"
on public.messages
for select
to authenticated
using (

exists (

select 1

from public.conversations c

where

c.id = messages.conversation_id

and

(

c.user_one = auth.uid()

or

c.user_two = auth.uid()

)

)

);

create policy "Users send messages"
on public.messages
for insert
to authenticated
with check (

sender_id = auth.uid()

and

exists (

select 1

from public.conversations c

where

c.id = conversation_id

and

(

c.user_one = auth.uid()

or

c.user_two = auth.uid()

)

)

);

create policy "Users update own messages"
on public.messages
for update
to authenticated
using (

sender_id = auth.uid()

)
with check (

sender_id = auth.uid()

);

create policy "Users delete own messages"
on public.messages
for delete
to authenticated
using (

sender_id = auth.uid()

);

-------------------------------------------------------------
-- ATTACHMENTS
-------------------------------------------------------------

create policy "Users view attachments"
on public.attachments
for select
to authenticated
using (

exists (

select 1

from public.messages m

join public.conversations c

on c.id = m.conversation_id

where

m.id = attachments.message_id

and

(

c.user_one = auth.uid()

or

c.user_two = auth.uid()

)

)

);

create policy "Users upload attachments"
on public.attachments
for insert
to authenticated
with check (

exists (

select 1

from public.messages m

where

m.id = attachments.message_id

and

m.sender_id = auth.uid()

)

);

create policy "Users delete attachments"
on public.attachments
for delete
to authenticated
using (

exists (

select 1

from public.messages m

where

m.id = attachments.message_id

and

m.sender_id = auth.uid()

)

);
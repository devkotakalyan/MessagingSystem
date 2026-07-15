-- =========================================================
-- NovaChat Supabase schema
-- Run this in the Supabase SQL editor (or via `supabase db push`)
-- =========================================================

-- ---------- PROFILES ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  avatar_url text,
  bio text,
  is_online boolean default false,
  last_seen timestamptz default now(),
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by any authenticated user"
  on public.profiles for select
  to authenticated
  using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id);

-- Auto-create a profile row whenever a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------- CONVERSATIONS ----------
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  is_group boolean not null default false,
  name text,
  created_by uuid references public.profiles (id),
  created_at timestamptz default now()
);

create table if not exists public.conversation_participants (
  conversation_id uuid references public.conversations (id) on delete cascade,
  user_id uuid references public.profiles (id) on delete cascade,
  joined_at timestamptz default now(),
  primary key (conversation_id, user_id)
);

alter table public.conversations enable row level security;
alter table public.conversation_participants enable row level security;

create policy "Participants can view their conversations"
  on public.conversations for select
  to authenticated
  using (
    exists (
      select 1 from public.conversation_participants cp
      where cp.conversation_id = id and cp.user_id = auth.uid()
    )
  );

create policy "Authenticated users can create conversations"
  on public.conversations for insert
  to authenticated
  with check (created_by = auth.uid());

create policy "Participants can view participant rows"
  on public.conversation_participants for select
  to authenticated
  using (
    exists (
      select 1 from public.conversation_participants cp
      where cp.conversation_id = conversation_participants.conversation_id
        and cp.user_id = auth.uid()
    )
  );

create policy "Authenticated users can add participants"
  on public.conversation_participants for insert
  to authenticated
  with check (true);

-- ---------- MESSAGES ----------
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references public.conversations (id) on delete cascade,
  sender_id uuid references public.profiles (id),
  content text not null,
  read_at timestamptz,
  created_at timestamptz default now()
);

alter table public.messages enable row level security;

create policy "Participants can read messages"
  on public.messages for select
  to authenticated
  using (
    exists (
      select 1 from public.conversation_participants cp
      where cp.conversation_id = messages.conversation_id and cp.user_id = auth.uid()
    )
  );

create policy "Participants can send messages"
  on public.messages for insert
  to authenticated
  with check (
    sender_id = auth.uid()
    and exists (
      select 1 from public.conversation_participants cp
      where cp.conversation_id = messages.conversation_id and cp.user_id = auth.uid()
    )
  );

create policy "Participants can mark messages read"
  on public.messages for update
  to authenticated
  using (
    exists (
      select 1 from public.conversation_participants cp
      where cp.conversation_id = messages.conversation_id and cp.user_id = auth.uid()
    )
  );

-- Enable realtime for messages
alter publication supabase_realtime add table public.messages;

-- ---------- HELPER RPC ----------
-- Finds an existing 1:1 (non-group) conversation between two users, if any.
create or replace function public.get_direct_conversation(user_a uuid, user_b uuid)
returns uuid
language sql
security definer
as $$
  select c.id
  from public.conversations c
  join public.conversation_participants p1 on p1.conversation_id = c.id and p1.user_id = user_a
  join public.conversation_participants p2 on p2.conversation_id = c.id and p2.user_id = user_b
  where c.is_group = false
  limit 1;
$$;

-- ---------- STORAGE ----------
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

create policy "Avatar images are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "Users can upload their own avatar"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

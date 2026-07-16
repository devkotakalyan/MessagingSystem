-- ==========================================================
-- MessagingSystem
-- Migration 001
-- Initial Schema
-- ==========================================================

create extension if not exists pgcrypto;

-------------------------------------------------------------
-- PROFILES
-------------------------------------------------------------

create table public.profiles (

    id uuid primary key
        references auth.users(id)
        on delete cascade,

    username varchar(30) not null unique,

    display_name varchar(100) not null,

    avatar_url text,

    bio text,

    is_online boolean
        default false,

    last_seen timestamptz,

    created_at timestamptz
        default now(),

    updated_at timestamptz
        default now(),

    constraint username_length
    check (
        length(username) between 3 and 30
    )

);

-------------------------------------------------------------
-- CONVERSATIONS
-------------------------------------------------------------

create table public.conversations (

    id uuid primary key
        default gen_random_uuid(),

    user_one uuid
        not null
        references public.profiles(id)
        on delete cascade,

    user_two uuid
        not null
        references public.profiles(id)
        on delete cascade,

    created_at timestamptz
        default now(),

    constraint different_users
    check (user_one <> user_two)

);

-------------------------------------------------------------
-- MESSAGES
-------------------------------------------------------------

create table public.messages (

    id uuid primary key
        default gen_random_uuid(),

    conversation_id uuid
        not null
        references public.conversations(id)
        on delete cascade,

    sender_id uuid
        not null
        references public.profiles(id)
        on delete cascade,

    content text,

    message_type varchar(20)
        not null
        default 'text',

    is_read boolean
        default false,

    read_at timestamptz,

    created_at timestamptz
        default now(),

    constraint valid_message_type
    check (

        message_type in (

            'text',

            'image',

            'video',

            'audio',

            'document'

        )

    )

);

-------------------------------------------------------------
-- ATTACHMENTS
-------------------------------------------------------------

create table public.attachments (

    id uuid primary key
        default gen_random_uuid(),

    message_id uuid
        not null
        references public.messages(id)
        on delete cascade,

    file_name text
        not null,

    file_path text
        not null,

    mime_type text,

    file_size bigint,

    created_at timestamptz
        default now()

);

-------------------------------------------------------------
-- COMMENTS
-------------------------------------------------------------

comment on table public.profiles
is 'Stores user profiles';

comment on table public.conversations
is 'One-to-one conversations';

comment on table public.messages
is 'Chat messages';

comment on table public.attachments
is 'Files attached to chat messages';
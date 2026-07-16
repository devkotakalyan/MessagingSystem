-- ==========================================================
-- MessagingSystem
-- Migration 002
-- Database Indexes
-- ==========================================================

-------------------------------------------------------------
-- Profiles
-------------------------------------------------------------

create index idx_profiles_username
on public.profiles(username);

create index idx_profiles_online
on public.profiles(is_online);

-------------------------------------------------------------
-- Conversations
-------------------------------------------------------------

create unique index idx_unique_conversation
on public.conversations(

    least(user_one, user_two),

    greatest(user_one, user_two)

);

create index idx_conversations_user_one
on public.conversations(user_one);

create index idx_conversations_user_two
on public.conversations(user_two);

-------------------------------------------------------------
-- Messages
-------------------------------------------------------------

create index idx_messages_conversation
on public.messages(

    conversation_id,

    created_at desc

);

create index idx_messages_sender
on public.messages(sender_id);

create index idx_messages_read
on public.messages(is_read);

create index idx_messages_created
on public.messages(created_at desc);

-------------------------------------------------------------
-- Attachments
-------------------------------------------------------------

create index idx_attachments_message
on public.attachments(message_id);
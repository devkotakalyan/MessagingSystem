-- ==========================================================
-- MessagingSystem
-- Migration 006
-- Realtime
-- ==========================================================

-------------------------------------------------------------
-- Enable Realtime
-------------------------------------------------------------

alter publication supabase_realtime

add table public.messages;

alter publication supabase_realtime

add table public.conversations;

alter publication supabase_realtime

add table public.profiles;

-------------------------------------------------------------
-- Replica Identity
-------------------------------------------------------------

alter table public.messages

replica identity full;

alter table public.conversations

replica identity full;

alter table public.profiles

replica identity full;
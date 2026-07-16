-- ==========================================================
-- MessagingSystem
-- Migration 003
-- Functions & Triggers
-- ==========================================================

-------------------------------------------------------------
-- Update updated_at automatically
-------------------------------------------------------------

create or replace function public.update_updated_at()
returns trigger
language plpgsql
set search_path = public
as
$$
begin
    new.updated_at = now();
    return new;
end;
$$;

-------------------------------------------------------------
-- Trigger for profiles
-------------------------------------------------------------

drop trigger if exists trg_profiles_updated_at
on public.profiles;

create trigger trg_profiles_updated_at

before update

on public.profiles

for each row

execute function public.update_updated_at();

-------------------------------------------------------------
-- Automatically create profile
-------------------------------------------------------------

create or replace function public.handle_new_user()

returns trigger

language plpgsql

security definer

set search_path = public

as
$$
begin

    insert into public.profiles(

        id,

        username,

        display_name

    )

    values(

        new.id,

        split_part(new.email,'@',1),

        split_part(new.email,'@',1)

    )

    on conflict(id)

    do nothing;

    return new;

end;
$$;

-------------------------------------------------------------
-- Trigger
-------------------------------------------------------------

drop trigger if exists on_auth_user_created

on auth.users;

create trigger on_auth_user_created

after insert

on auth.users

for each row

execute function public.handle_new_user();

-------------------------------------------------------------
-- Get or Create Conversation
-------------------------------------------------------------

create or replace function public.get_or_create_conversation(

    p_user_one uuid,

    p_user_two uuid

)

returns uuid

language plpgsql

security definer

set search_path = public

as
$$

declare

    conversation uuid;

begin

    select id

    into conversation

    from public.conversations

    where

    least(user_one,user_two)=least(p_user_one,p_user_two)

    and

    greatest(user_one,user_two)=greatest(p_user_one,p_user_two);

    if conversation is not null then

        return conversation;

    end if;

    insert into public.conversations(

        user_one,

        user_two

    )

    values(

        least(p_user_one,p_user_two),

        greatest(p_user_one,p_user_two)

    )

    returning id

    into conversation;

    return conversation;

end;

$$;

-------------------------------------------------------------
-- Revoke Public Execute
-------------------------------------------------------------

revoke execute

on function public.update_updated_at()

from public;

revoke execute

on function public.handle_new_user()

from public;

revoke execute

on function public.get_or_create_conversation(uuid,uuid)

from public;
import { supabase } from "./supabase";

/** Fetch all conversations the current user participates in, with the other participant(s) + last message. */
export async function getConversations(userId) {
  const { data, error } = await supabase
    .from("conversation_participants")
    .select(
      `
      conversation_id,
      conversations (
        id,
        is_group,
        name,
        created_at,
        conversation_participants ( user_id, profiles ( id, full_name, avatar_url, is_online, last_seen ) ),
        messages ( id, content, sender_id, created_at )
      )
    `
    )
    .eq("user_id", userId)
    .order("conversation_id", { ascending: false });

  if (error) throw error;

  return (data ?? [])
    .map((row) => row.conversations)
    .filter(Boolean)
    .sort((a, b) => {
      const aLast = a.messages?.at(-1)?.created_at ?? a.created_at;
      const bLast = b.messages?.at(-1)?.created_at ?? b.created_at;
      return new Date(bLast) - new Date(aLast);
    });
}

/** Find or create a 1:1 conversation between two users. */
export async function getOrCreateDirectConversation(userId, otherUserId) {
  const { data: existing, error: existingError } = await supabase.rpc(
    "get_direct_conversation",
    { user_a: userId, user_b: otherUserId }
  );
  if (existingError) throw existingError;
  if (existing) return existing;

  const { data: conversation, error: convError } = await supabase
    .from("conversations")
    .insert({ is_group: false, created_by: userId })
    .select()
    .single();
  if (convError) throw convError;

  const { error: participantsError } = await supabase
    .from("conversation_participants")
    .insert([
      { conversation_id: conversation.id, user_id: userId },
      { conversation_id: conversation.id, user_id: otherUserId },
    ]);
  if (participantsError) throw participantsError;

  return conversation.id;
}

export async function createGroupConversation(name, creatorId, memberIds) {
  const { data: conversation, error } = await supabase
    .from("conversations")
    .insert({ is_group: true, name, created_by: creatorId })
    .select()
    .single();
  if (error) throw error;

  const participants = [creatorId, ...memberIds].map((user_id) => ({
    conversation_id: conversation.id,
    user_id,
  }));

  const { error: participantsError } = await supabase
    .from("conversation_participants")
    .insert(participants);
  if (participantsError) throw participantsError;

  return conversation;
}

export async function getMessages(conversationId, limit = 50) {
  const { data, error } = await supabase
    .from("messages")
    .select("*, profiles ( id, full_name, avatar_url )")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })
    .limit(limit);
  if (error) throw error;
  return data;
}

export async function sendMessage({ conversationId, senderId, content }) {
  const { data, error } = await supabase
    .from("messages")
    .insert({ conversation_id: conversationId, sender_id: senderId, content })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function markMessagesRead(conversationId, userId) {
  const { error } = await supabase
    .from("messages")
    .update({ read_at: new Date().toISOString() })
    .eq("conversation_id", conversationId)
    .neq("sender_id", userId)
    .is("read_at", null);
  if (error) throw error;
}

/** Subscribe to new messages in a conversation. Returns an unsubscribe function. */
export function subscribeToMessages(conversationId, onInsert) {
  const channel = supabase
    .channel(`messages:${conversationId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `conversation_id=eq.${conversationId}`,
      },
      (payload) => onInsert(payload.new)
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}

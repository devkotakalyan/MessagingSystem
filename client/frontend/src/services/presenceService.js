import { supabase } from "./supabase";

/**
 * Joins a presence channel scoped to a conversation. Tracks the current user
 * and reports the full set of online participants + typing state back via callbacks.
 */
export function joinConversationPresence({
  conversationId,
  userId,
  fullName,
  onPresenceChange,
  onTypingChange,
}) {
  const channel = supabase.channel(`presence:${conversationId}`, {
    config: { presence: { key: userId } },
  });

  channel
    .on("presence", { event: "sync" }, () => {
      const state = channel.presenceState();
      onPresenceChange?.(state);
    })
    .on("broadcast", { event: "typing" }, ({ payload }) => {
      onTypingChange?.(payload);
    })
    .subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await channel.track({ user_id: userId, full_name: fullName, online_at: new Date().toISOString() });
      }
    });

  function setTyping(isTyping) {
    channel.send({
      type: "broadcast",
      event: "typing",
      payload: { user_id: userId, full_name: fullName, isTyping },
    });
  }

  function leave() {
    supabase.removeChannel(channel);
  }

  return { setTyping, leave };
}

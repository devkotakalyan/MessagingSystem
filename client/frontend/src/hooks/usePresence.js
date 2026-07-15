import { useEffect, useRef, useState } from "react";
import { joinConversationPresence } from "../services/presenceService";

const TYPING_TIMEOUT_MS = 3000;

export function usePresence(conversationId, user) {
  const [onlineUserIds, setOnlineUserIds] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});
  const channelRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (!conversationId || !user) return;

    const { setTyping, leave } = joinConversationPresence({
      conversationId,
      userId: user.id,
      fullName: user.user_metadata?.full_name ?? user.email,
      onPresenceChange: (state) => setOnlineUserIds(Object.keys(state)),
      onTypingChange: ({ user_id, full_name, isTyping }) => {
        if (user_id === user.id) return;
        setTypingUsers((prev) => {
          const next = { ...prev };
          if (isTyping) next[user_id] = full_name;
          else delete next[user_id];
          return next;
        });
      },
    });

    channelRef.current = { setTyping };

    return () => {
      leave();
      channelRef.current = null;
    };
  }, [conversationId, user]);

  function notifyTyping() {
    channelRef.current?.setTyping(true);
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      channelRef.current?.setTyping(false);
    }, TYPING_TIMEOUT_MS);
  }

  return { onlineUserIds, typingUsers, notifyTyping };
}

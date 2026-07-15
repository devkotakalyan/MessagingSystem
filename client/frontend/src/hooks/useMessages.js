import { useEffect, useState } from "react";
import { getMessages, subscribeToMessages } from "../services/chatService";

export function useMessages(conversationId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!conversationId) return;
    let isMounted = true;

    Promise.resolve().then(() => isMounted && setLoading(true));
    getMessages(conversationId)
      .then((data) => {
        if (isMounted) setMessages(data);
      })
      .finally(() => isMounted && setLoading(false));

    const unsubscribe = subscribeToMessages(conversationId, (newMessage) => {
      setMessages((prev) =>
        prev.some((m) => m.id === newMessage.id) ? prev : [...prev, newMessage]
      );
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [conversationId]);

  return { messages, loading, setMessages };
}

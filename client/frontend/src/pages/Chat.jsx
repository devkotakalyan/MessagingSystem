import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Sidebar from "../components/chat/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";
import { getConversations } from "../services/chatService";
import { useEffect } from "react";

export default function Chat() {
  const { user } = useAuth();
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [activeConversation, setActiveConversation] = useState(null);

  useEffect(() => {
    if (!activeConversationId) {
      Promise.resolve().then(() => setActiveConversation(null));
      return;
    }
    getConversations(user.id).then((all) => {
      setActiveConversation(all.find((c) => c.id === activeConversationId) ?? null);
    });
  }, [activeConversationId, user.id]);

  return (
    <div className="flex h-full">
      <Sidebar
        activeConversationId={activeConversationId}
        onSelectConversation={setActiveConversationId}
      />
      <ChatWindow conversation={activeConversation} />
    </div>
  );
}

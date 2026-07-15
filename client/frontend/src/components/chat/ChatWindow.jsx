import { useEffect, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useMessages } from "../../hooks/useMessages";
import { usePresence } from "../../hooks/usePresence";
import { sendMessage, markMessagesRead } from "../../services/chatService";
import { formatConversationName, formatLastSeen } from "../../utils/formatTime";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";
import UserAvatar from "./UserAvatar";

export default function ChatWindow({ conversation }) {
  const { user } = useAuth();
  const { messages, loading } = useMessages(conversation?.id);
  const { onlineUserIds, typingUsers, notifyTyping } = usePresence(conversation?.id, user);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (conversation?.id) markMessagesRead(conversation.id, user.id);
  }, [conversation?.id, user.id, messages.length]);

  if (!conversation) {
    return (
      <div className="flex flex-1 items-center justify-center text-slate-500">
        <p>Select a conversation to start chatting.</p>
      </div>
    );
  }

  const other = conversation.conversation_participants?.find((p) => p.user_id !== user.id);
  const isOnline = other && onlineUserIds.includes(other.user_id);

  async function handleSend(content) {
    await sendMessage({ conversationId: conversation.id, senderId: user.id, content });
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center gap-3 border-b border-slate-800 px-5 py-3.5">
        <UserAvatar
          name={formatConversationName(conversation, user.id)}
          src={other?.profiles?.avatar_url}
          online={conversation.is_group ? undefined : isOnline}
        />
        <div>
          <p className="text-sm font-semibold">{formatConversationName(conversation, user.id)}</p>
          <p className="text-xs text-slate-400">
            {conversation.is_group
              ? `${conversation.conversation_participants?.length ?? 0} members`
              : isOnline
              ? "Online"
              : `Last seen ${formatLastSeen(other?.profiles?.last_seen)}`}
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
        {loading && <p className="text-center text-sm text-slate-500">Loading messages...</p>}
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} isOwn={message.sender_id === user.id} />
        ))}
        <TypingIndicator names={Object.values(typingUsers)} />
        <div ref={bottomRef} />
      </div>

      <MessageInput onSend={handleSend} onTyping={notifyTyping} />
    </div>
  );
}

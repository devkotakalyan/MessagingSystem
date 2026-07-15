import { useEffect, useState } from "react";
import clsx from "clsx";
import { FiSearch, FiLogOut, FiSettings } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { getConversations } from "../../services/chatService";
import { formatConversationName, formatMessageTime } from "../../utils/formatTime";
import UserAvatar from "./UserAvatar";

export default function Sidebar({ activeConversationId, onSelectConversation, onlineUserIds = [] }) {
  const { user, profile, logout } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getConversations(user.id)
      .then(setConversations)
      .finally(() => setLoading(false));
  }, [user]);

  const filtered = conversations.filter((c) =>
    formatConversationName(c, user.id).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <aside className="flex h-full w-80 flex-col border-r border-slate-800 bg-slate-900/40">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-4">
        <div className="flex items-center gap-2">
          <UserAvatar name={profile?.full_name} src={profile?.avatar_url} size={36} online />
          <div>
            <p className="text-sm font-semibold leading-tight">{profile?.full_name || "You"}</p>
            <p className="text-xs text-emerald-400">Online</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white">
            <FiSettings size={16} />
          </button>
          <button
            onClick={logout}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <FiLogOut size={16} />
          </button>
        </div>
      </div>

      <div className="px-4 py-3">
        <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
          <FiSearch className="text-slate-500" size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search conversations"
            className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading && <p className="px-4 py-3 text-sm text-slate-500">Loading chats...</p>}
        {!loading && filtered.length === 0 && (
          <p className="px-4 py-3 text-sm text-slate-500">No conversations yet.</p>
        )}
        {filtered.map((conversation) => {
          const other = conversation.conversation_participants?.find(
            (p) => p.user_id !== user.id
          );
          const isOnline = other && onlineUserIds.includes(other.user_id);
          const lastMessage = conversation.messages?.at(-1);

          return (
            <button
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              className={clsx(
                "flex w-full items-center gap-3 border-b border-slate-800/60 px-4 py-3 text-left transition hover:bg-slate-800/50",
                activeConversationId === conversation.id && "bg-slate-800/70"
              )}
            >
              <UserAvatar
                name={formatConversationName(conversation, user.id)}
                src={other?.profiles?.avatar_url}
                online={conversation.is_group ? undefined : isOnline}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-medium text-white">
                    {formatConversationName(conversation, user.id)}
                  </p>
                  {lastMessage && (
                    <span className="shrink-0 text-xs text-slate-500">
                      {formatMessageTime(lastMessage.created_at)}
                    </span>
                  )}
                </div>
                <p className="truncate text-xs text-slate-400">
                  {lastMessage?.content || "Say hello 👋"}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
